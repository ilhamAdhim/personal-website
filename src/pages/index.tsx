import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Text,
  chakra,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

import HeadingAccent from "components/HeadingAccent";
import HeroSection from "components/HeroSection";
import MotionBox from "components/motion/Box";
import ProjectList from "components/ProjectSection/ProjectList";
import SkillSection from "components/SkillSection";
import repositoriesList from "data/repositoryList";
import type { IDataProjectsProps } from "types/ProjectProps";

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState<
    IDataProjectsProps[]
  >([]);

  useEffect(() => {
    setFeaturedProjects(repositoriesList.slice(0, 3));
  }, []);

  return (
    <>
      <NextSeo
        title="Home"
        description="Muhammad Ilham Adhim is a Frontend Developer from Indonesia. He Uses React, Typescript, and Next JS as main tech stack. Read more..."
      />
      <Box
        mb={8}
        gap={8}
        w="full"
        display={{ md: "flex" }}
        alignItems="center"
        minHeight="70vh"
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
                <chakra.div
                  fontSize="2em"
                  fontWeight="bold"
                  _hover={{
                    color: `teal.500`,
                  }}
                >
                  <FaArrowDown />
                </chakra.div>
              </Link>
            </MotionBox>
          </Flex>
        </Box>
      </Box>

      <Box>
        <SkillSection />
      </Box>

      <Box>
        <HeadingAccent text="Featured Projects" />
        <Text color="gray.500">Some projects i developed recently.</Text>
        <ProjectList dataProjects={featuredProjects} />
        <Flex justifyContent="center">
          <Button mt="12" as={ChakraLink} href="/Projects">
            See More . . .
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
