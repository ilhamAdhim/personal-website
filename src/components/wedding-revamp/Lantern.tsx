import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { prefersReducedMotion, tilt } from "./motion";

// The page's one 3D moment: a gold Rub el Hizb (8-point star) that turns with
// scroll and leans toward the pointer / phone tilt. Client-only.

/** 16-point outline of two overlapping squares, with a round window */
function starShape(R: number, holeR: number) {
  const r = R * (Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8));
  const shape = new THREE.Shape();
  for (let i = 0; i < 16; i += 1) {
    const a = (i * Math.PI) / 8 + Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    const x = Math.cos(a) * rad;
    const y = Math.sin(a) * rad;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  if (holeR > 0) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, holeR, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return shape;
}

type Props = {
  /** 0..1, driven by scroll from the parent section */
  spin: { value: number };
  className?: string;
};

const Lantern = ({ spin, className = "" }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return undefined;
    }

    const reduced = prefersReducedMotion();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(
      32,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    );
    camera.position.z = 4.8;

    const gold = new THREE.MeshPhysicalMaterial({
      color: 0xe8c47e,
      metalness: 1,
      roughness: 0.2,
      clearcoat: 0.5,
      clearcoatRoughness: 0.18,
    });

    const extrude = (shape: THREE.Shape, depth: number) => {
      const g = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.035,
        bevelSize: 0.03,
        bevelSegments: 4,
        curveSegments: 64,
      });
      g.center();
      return g;
    };

    const outerGeo = extrude(starShape(1, 0.42), 0.12);

    const group = new THREE.Group();
    const outer = new THREE.Mesh(outerGeo, gold);
    group.add(outer);
    scene.add(group);

    const key = new THREE.DirectionalLight(0xfff4e0, 2.2);
    key.position.set(2, 3, 4);
    scene.add(key);

    let frame = 0;
    let running = false;
    let elapsed = 0;
    let last = performance.now();
    const lean = { x: 0, y: 0 };

    const render = () => {
      const now = performance.now();
      elapsed += Math.min((now - last) / 1000, 0.05);
      last = now;
      lean.x += (tilt.x - lean.x) * 0.05;
      lean.y += (tilt.y - lean.y) * 0.05;

      // Turn in its own plane so the star face stays readable; sway gently
      group.rotation.z = -spin.value * Math.PI * 2 - elapsed * 0.12;
      group.rotation.y = Math.sin(elapsed * 0.5) * 0.35 + lean.x * 0.5;
      group.rotation.x = lean.y * 0.35 + Math.sin(elapsed * 0.4) * 0.08;
      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      frame = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        loop();
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(mount);
    if (reduced) render();

    const ro = new ResizeObserver(() => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      if (!running) render();
    });
    ro.observe(mount);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
      outerGeo.dispose();
      gold.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [spin]);

  if (failed) return null; // no WebGL: the names stand on their own
  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default Lantern;
