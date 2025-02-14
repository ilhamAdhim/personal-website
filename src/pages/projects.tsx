import { Box, Text, chakra, useColorModeValue } from "@chakra-ui/react";
import type { InferGetStaticPropsType, NextPage } from "next";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import MetaData from "components/Metadata";
import ProjectList from "components/ProjectSection/ProjectList";
import DottedBox from "components/SVGVectors/DottedBox";
import type { IDataProjectsProps } from "types/ProjectProps";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["projects"])),
      language: locale,
    },
  };
}

const ProjectPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { t } = useTranslation("projects");
  const [dataProjects, setDataProjects] = useState<IDataProjectsProps[]>([]);

  useEffect(() => {
    const translated = props._nextI18Next.initialI18nStore;
    setDataProjects(
      translated[props.language as keyof typeof translated].projects.data
    );
  }, []);

  return (
    <>
      <MetaData
        title="Ilham Adhim | Projects"
        description="Here are my projects collection that i've done as Front-End Developer. I'm using React, NextJS, ChakraUI, TypeScript and more."
      />
      <Box w="full" p="5" mx="auto">
        <chakra.h1 fontSize="4xl" fontWeight="bold" data-aos="fade-down">
          Projects
        </chakra.h1>
        <Text fontSize="xl" data-aos="fade-down" data-aos-delay={200}>
          {t("subTitle")}
          <chakra.span
            p="1"
            bgColor={useColorModeValue("teal.200", "transparent")}
            color={useColorModeValue("black.200", "teal.400")}
          >
            {i18n?.language === "en" ? `Front-End Development ` : `Front-End`}🧑‍💻
          </chakra.span>
        </Text>

        <DottedBox />

        <ProjectList dataProjects={dataProjects} />
      </Box>
    </>
  );
};

export default ProjectPage;
