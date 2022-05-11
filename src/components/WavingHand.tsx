import MotionBox from "components/motion/Box";

const WavingHand = () => (
  <MotionBox
    mb="-20px"
    mr="-45px"
    pb="20px"
    pr="45px"
    zIndex="-1"
    display="inline-block"
    animate={{ rotate: 20 }}
    transition={{
      from: 0,
      duration: 0.5,
      ease: "easeInOut",
      type: "tween",
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    👋
  </MotionBox>
);

export default WavingHand;
