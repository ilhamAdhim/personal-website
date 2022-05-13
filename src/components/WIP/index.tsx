import { Box, Button, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import Link from "next/link";

import MotionBox from "components/motion/Box";
import useSmallViewport from "hooks/useViewport";

const WIPComponent = () => {
  const { isSmallViewport } = useSmallViewport();

  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" justifyContent="center">
      <Box mt={20} w="80%" m="auto">
        <MotionBox
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          width={["100%", "70%", "60%", "60%"]}
          margin="0 auto"
        >
          <Image src="/wip.svg" alt="Error 404 not found Illustration" />
        </MotionBox>
      </Box>
      <Box mt={14}>
        <Text fontSize="xl" textAlign="center">
          So eager aren't we ?
        </Text>
        <Text fontSize="md" opacity="0.6" textAlign="center" mt={[2, 0]}>
          {isSmallViewport
            ? "🚧 Work in Progress 🚧"
            : "🚧 The work you wanted to see is still in progress 🚧"}
        </Text>

        <Box textAlign="center" mt={12}>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              Cool ! Let&apos;s Head Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default WIPComponent;
