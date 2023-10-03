import { Box, Button, Flex, Text, chakra } from "@chakra-ui/react";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

import HeadingAccent from "components/HeadingAccent";
import HeroSection from "components/HeroSection";
import MotionBox from "components/motion/Box";
import ProjectList from "components/ProjectSection/ProjectList";
import useSmallViewport from "hooks/useViewport";
import type { IDataProjectsProps } from "types/ProjectProps";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["landingPage"])),
      language: locale,
    },
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { isSmallViewport } = useSmallViewport();

  const { t } = useTranslation("landingPage");

  const [featuredProjects, setFeaturedProjects] = useState<
    IDataProjectsProps[]
  >([]);

  useEffect(() => {
    const translated = props._nextI18Next.initialI18nStore;
    setFeaturedProjects(
      translated[props.language as keyof typeof translated].landingPage
        .FeaturedProjects.projects
    );
  }, []);

  return (
    <>
      <NextSeo
        title="Home"
        description="Muhammad Ilham Adhim is a Front-End Developer from Indonesia. He Uses React, Typescript, and Next JS as main tech stack. Read more..."
      />
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
        <HeadingAccent
          text={t("FeaturedProjects.title")}
          withUnderline={false}
        />
        <Text color="gray.500">{t("FeaturedProjects.subTitle")}.</Text>
        <ProjectList dataProjects={featuredProjects} />
        <Flex justifyContent="center">
          <Link href="/Projects" passHref>
            <Button mt="12">
              {t("CTA")}
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
