import { Box, useColorModeValue } from "@chakra-ui/react";
import MotionBox from "components/motion/Box";

function DottedBox() {
  return (
    <Box
      ml={{ base: 0, md: 5 }}
      display={["none", "block"]}
      zIndex="-10"
      position="relative"
    >
      <MotionBox
        animate={{ x: 10 }}
        transition={{
          from: 0,
          duration: 2,
          ease: "easeIn",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Box
          position="absolute"
          left="-45px"
          top="-30px"
          height="full"
          maxW="700px"
          zIndex={-1}
        >
          <svg
            color={useColorModeValue(
              "rgba(55,65,81, 0.1)",
              "rgba(55,65,81, 0.7)"
            )}
            width="350"
            height="420"
            fill="none"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="404"
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            ></rect>
          </svg>
        </Box>
      </MotionBox>
    </Box>
  );
}

export default DottedBox;
