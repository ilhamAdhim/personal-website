import { useRef } from "react";

import type { MapImage } from "data/weddingConfig";

import { useLang } from "./i18n";
import s from "./wr.module.css";

// The thumbnail shows this share of the screenshot's width, centred on the pin
const CROP = 0.55;

/** A ring on the venue so the eye finds it before it reads a single street name */
const Pin = ({ pin }: { pin: MapImage["pin"] }) => (
  <span
    aria-hidden="true"
    className={s.mapPin}
    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
  />
);

/**
 * A map screenshot made easy to read: the card shows the part around the
 * venue with the pin ringed; tapping opens the whole screenshot at full size,
 * already scrolled to the pin, so the roads leading there can be followed.
 */
/** Dashed blue rings on the places guests can use as reference */
const Landmarks = ({ landmarks }: { landmarks: MapImage["landmarks"] }) => (
  <>
    {landmarks?.map((l) => (
      <span
        key={l.name}
        aria-hidden="true"
        className={s.mapLandmark}
        style={{ left: `${l.x}%`, top: `${l.y}%` }}
      />
    ))}
  </>
);

const MapFigure = ({ image }: { image: MapImage }) => {
  const { t } = useLang();
  // left edge of the window, as a share of the image, kept inside the image
  const left = Math.min(Math.max(image.pin.x / 100 - CROP / 2, 0), 1 - CROP);
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const open = () => {
    dialog.current?.showModal();
    // the full screenshot is wider than a phone, so bring the pin into view
    const el = scroller.current;
    if (!el) return;
    const left = (image.width * image.pin.x) / 100 - el.clientWidth / 2;
    const top = (image.height * image.pin.y) / 100 - el.clientHeight / 3;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      el.scrollTo({ left, top, behavior: "instant" });
      return;
    }
    // start a screen's width off, then glide onto the venue
    el.scrollTo({ left: left + 220, top: top + 140, behavior: "instant" });
    requestAnimationFrame(() => {
      el.scrollTo({ left, top, behavior: "smooth" });
    });
  };

  return (
    <figure className="mt-6!">
      <button
        type="button"
        onClick={open}
        aria-label={t.mapZoom}
        className={s.mapThumb}
      >
        {/* a 16:10 window onto the screenshot, zoomed in on the pin */}
        <span className="relative block w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
          <span
            className="absolute top-0 block"
            style={{
              width: `${100 / CROP}%`,
              left: `${-(left / CROP) * 100}%`,
              aspectRatio: `${image.width} / ${image.height}`,
            }}
          >
            <img
              src={image.src}
              alt={t.mapAlt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="block w-full! h-full! max-w-none!"
            />
            <Landmarks landmarks={image.landmarks} />
            <Pin pin={image.pin} />
          </span>
        </span>
      </button>
      <figcaption className={`${s.body} ${s.soft} mt-2! text-[0.8rem]!`}>
        {t.mapZoom}
      </figcaption>

      <dialog
        ref={dialog}
        className={s.mapDialog}
        aria-label={t.mapAlt}
        onClick={(e) => {
          // a tap on the dark backdrop closes it
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div ref={scroller} className={s.mapScroll} data-lenis-prevent="">
          <div className="relative" style={{ width: image.width }}>
            <img
              src={image.src}
              alt={t.mapAlt}
              width={image.width}
              height={image.height}
              className="block max-w-none!"
            />
            <Landmarks landmarks={image.landmarks} />
            <Pin pin={image.pin} />
          </div>
        </div>
        <ul className={s.mapLegend}>
          <li>
            <span className={s.mapKeyVenue} aria-hidden="true" />
            {t.mapVenue}
          </li>
          {image.landmarks?.map((l) => (
            <li key={l.name}>
              <span className={s.mapKeyLandmark} aria-hidden="true" />
              {l.name}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={s.mapClose}
          onClick={() => dialog.current?.close()}
        >
          {t.close}
        </button>
      </dialog>
    </figure>
  );
};

export default MapFigure;
