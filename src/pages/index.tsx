import Link from "next/link";
import HeadingAccent from "components/HeadingAccent";
import HeroSection from "components/HeroSection";
import MotionBox from "components/motion/Box";
import ProjectList from "components/ProjectSection/ProjectList";
import repositoriesList from "data/repositoryList";
import useSmallViewport from "hooks/useViewport";

import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import type { IDataProjectsProps } from "types/ProjectProps";
import { Box, Button, Flex, Text, chakra } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }: any) {
  return {
    props: { ...(await serverSideTranslations(locale, ["default"])) },
  };
}

const Home = ({ locale }: any) => {
  const { isSmallViewport } = useSmallViewport();
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
        description="Muhammad Ilham Adhim is a Front-End Developer from Indonesia. He Uses React, Typescript, and Next JS as main tech stack. Read more..."
      />
      <h2>{locale}</h2>
      <Box mb={8} display={{ md: "flex" }} alignItems="center" minHeight="70vh">
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

      <Box
        id="nextpart"
        pt={["24", "0"]}
        mx={isSmallViewport ? 6 : 0}
        textAlign={isSmallViewport ? "center" : "justify"}
      >
        <HeadingAccent text="Featured Projects" withUnderline={false} />
        <Text color="gray.500">Some projects I developed recently.</Text>
        <ProjectList dataProjects={featuredProjects} />
        <Flex justifyContent="center">
          <Link href="/Projects" passHref>
            <Button mt="12">
              See More
              <chakra.span ml="2">
                <FaArrowRight />
              </chakra.span>
            </Button>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
