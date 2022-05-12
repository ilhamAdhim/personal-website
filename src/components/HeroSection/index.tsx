import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaBolt } from "react-icons/fa";

import DottedBox from "components/SVGVectors/DottedBox";
import WavingHand from "components/WavingHand";

import LinksAlt from "./LinksAlt";

const HeroSection = () => {
  return (
    <Box mt="20" width={["full", "80%"]}>
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Stack direction="column" spacing={6} justifyContent="center">
          <chakra.h2
            fontSize={["2em", "3em"]}
            lineHeight={1}
            fontWeight="bold"
            textAlign={["center", "left"]}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            Hey!
            <WavingHand />
            <br />
            <chakra.div mt="8" data-aos="fade-down" data-aos-delay="2000">
              I'm
              <chakra.span color={useColorModeValue("teal.600", "teal.400")}>
                Ilham Adhim
              </chakra.span>
            </chakra.div>
          </chakra.h2>
          <Text
            width="100%"
            p={["4", "0"]}
            fontSize="1.2rem"
            color="gray.500"
            lineHeight="1.375"
            fontWeight="400"
            textAlign="justify"
            data-aos="fade-up"
            data-aos-delay="2000"
          >
            Frontend Developer who likes to build web app through clean UI and
            optimized performance. I uses React ecosystem to build things.
            Long-life learner and loves to collaborate with others.
          </Text>
          <Flex
            justifyContent={["center", "flex-start"]}
            gap={4}
            data-aos="flip-right"
            data-aos-delay="3000"
            data-aos-duration="2000"
          >
            <Link href="/Projects" passHref>
              <Button
                color="white"
                variant="solid"
                size="lg"
                rounded="md"
                lineHeight={1}
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{
                  bgGradient: "linear(to-l, #2563eb, #0ea5e9)",
                }}
              >
                <chakra.span fontSize={[".8em", "unset"]}>
                  See my Projects
                </chakra.span>
                <Icon as={FaBolt} h={4} w={4} ml={1} />
              </Button>
            </Link>
            <Button
              p={4}
              border="1px solid"
              rounded="md"
              boxShadow="md"
              size="lg"
            >
              <Link href="/About" passHref>
                <chakra.span fontSize={[".8em", "unset"]}>About me</chakra.span>
              </Link>
            </Button>
          </Flex>
          <LinksAlt />
        </Stack>

        <DottedBox />
      </Stack>
    </Box>
  );
};

export default HeroSection;
