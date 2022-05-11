import * as React from "react";
import {
  chakra,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Box,
  Link,
  Icon,
  Image,
  Skeleton,
  Flex,
} from "@chakra-ui/react";
import { MdBolt } from "react-icons/md";
import WavingHand from "./WavingHand";
import MotionBox from "components/motion/Box";

const HeroSection = () => {
  return (
    <Box mt={"20"} width={["full", "80%"]}>
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Stack direction="column" spacing={6} justifyContent="center">
          <chakra.h2
            fontSize={["2xl", "5xl"]}
            lineHeight={1}
            fontWeight="bold"
            textAlign={["center", "left"]}
          >
            Hey !
            <WavingHand />
            <br />
            <chakra.div mt="8">
              I'm <chakra.span color="teal">Ilham Adhim</chakra.span>
            </chakra.div>
          </chakra.h2>
          <Text
            width="90%"
            fontSize="1.2rem"
            color="gray.500"
            lineHeight="1.375"
            fontWeight="400"
            textAlign={["center", "left"]}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            eveniet sunt officia maiores, laborum cumque provident maxime
            laudantium, placeat aliquam voluptates vel! Nostrum consectetur
            deleniti dicta facilis. Officia, hic necessitatibus.
          </Text>
          <Flex justifyContent={["center", "flex-start"]} gap={4}>
            <Button
              color="white"
              variant="solid"
              size="lg"
              rounded="md"
              //   mb={{ base: 2, sm: 0 }}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{ bgGradient: "linear(to-l, #0ea5e9,#2563eb)" }}
            >
              <Link href="/Projects">
                <chakra.span> See my Projects </chakra.span>
              </Link>
              <Icon as={MdBolt} h={4} w={4} ml={1} />
            </Button>
            <Box
              border="1px solid"
              borderColor="gray.300"
              p={3}
              lineHeight={1.18}
              rounded="md"
              boxShadow="md"
              as={Link}
              zIndex={5}
            >
              Who Am I
            </Box>
          </Flex>
        </Stack>
        <Box
          ml={{ base: 0, md: 5 }}
          display={["none", "block"]}
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
            {/* <BlocksBox /> */}
            <DottedBox />
          </MotionBox>
        </Box>
      </Stack>
    </Box>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
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
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

function BlocksBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        width="350"
        fill={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        height="420"
        viewBox="0 0 36 36"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>blocks-group-line</title>
        <path d="M33.53,18.76,26.6,15.57V6.43A1,1,0,0,0,26,5.53l-7.5-3.45a1,1,0,0,0-.84,0l-7.5,3.45a1,1,0,0,0-.58.91v9.14L2.68,18.76a1,1,0,0,0-.58.91v9.78h0a1,1,0,0,0,.58.91l7.5,3.45a1,1,0,0,0,.84,0l7.08-3.26,7.08,3.26a1,1,0,0,0,.84,0l7.5-3.45a1,1,0,0,0,.58-.91h0V19.67A1,1,0,0,0,33.53,18.76Zm-2.81.91L25.61,22,20.5,19.67l5.11-2.35ZM18.1,4.08l5.11,2.35L18.1,8.78,13,6.43ZM10.6,17.31l5.11,2.35L10.6,22,5.49,19.67Zm6.5,11.49-6.5,3-6.5-3V21.23L10.18,24A1,1,0,0,0,11,24l6.08-2.8ZM11.6,15.57h0V8l6.08,2.8a1,1,0,0,0,.84,0L24.6,8v7.58h0l-6.5,3ZM32.11,28.81l-6.5,3-6.51-3V21.22L25.19,24A1,1,0,0,0,26,24l6.08-2.8Z"></path>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          fill-opacity="0"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        />
      </svg>
    </Box>
  );
}

export default HeroSection;
