import { Box, Text, chakra, useColorModeValue } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import ProjectList from "components/ProjectSection/ProjectList";
import DottedBox from "components/SVGVectors/DottedBox";
import repositoriesList from "data/repositoryList";
import type { IDataProjectsProps } from "types/ProjectProps";

const ProjectPage = () => {
  const [dataProjects, setDataProjects] = useState<IDataProjectsProps[]>([]);

  useEffect(() => {
    setDataProjects(repositoriesList);
  }, []);

  return (
    <>
      <NextSeo
        title="Projects"
        description="Here are my projects collection that i've done as Front-End Developer. I'm using React, NextJS, ChakraUI, TypeScript and more."
      />
      <Box w="full" p="5" mx="auto">
        <chakra.h1 fontSize="4xl" fontWeight="bold" data-aos="fade-down">
          Projects
        </chakra.h1>
        <Text fontSize="xl" data-aos="fade-down" data-aos-delay={200}>
          Showcase of projects i've done on{" "}
          <chakra.span
            p="1"
            bgColor={useColorModeValue("teal.200", "transparent")}
            color={useColorModeValue("black.200", "teal.400")}
          >
            Front-End Development 🧑‍💻
          </chakra.span>
        </Text>

        <DottedBox />

        <ProjectList dataProjects={dataProjects} />
      </Box>
    </>
  );
};

export default ProjectPage;
