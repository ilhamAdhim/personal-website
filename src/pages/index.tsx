import { Box, Flex, Text, chakra } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

import HeroSection from "components/HeroSection";
import MotionBox from "components/motion/Box";
import SkillSection from "components/SkillSection";

const Home = () => {
  return (
    <>
      <NextSeo
        title="Home"
        description="Frontend Developer from Indonesia. Uses React, Typescript, and Next JS as my main tech stack. Read more..."
      />
      <Box
        display={{ md: "flex" }}
        alignItems="center"
        minHeight="70vh"
        gap={8}
        mb={8}
        w="full"
      >
        <Box>
          <HeroSection />
          <Flex justifyContent="center" marginTop={["3em", "8em"]}>
            <MotionBox
              animate={{
                y: 10,
              }}
              transition={{
                from: 0,
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Link href="#nextpart" passHref>
                <Text
                  fontSize="2em"
                  fontWeight="bold"
                  _hover={{
                    color: `teal.500`,
                  }}
                >
                  <FaArrowDown />
                </Text>
              </Link>
            </MotionBox>
          </Flex>
        </Box>
      </Box>

      <chakra.div>
        <SkillSection />
      </chakra.div>

      <chakra.div h="70vh">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        asperiores doloribus quae nam corrupti voluptates iusto cumque vel!
        Blanditiis pariatur porro ducimus provident numquam magnam nulla ab quae
        velit atque.
      </chakra.div>
    </>
  );
};

export default Home;
