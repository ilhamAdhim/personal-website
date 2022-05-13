import {
  Box,
  SimpleGrid,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import RepositoryCard from "components/RepositoryCard";
import DottedBox from "components/SVGVectors/DottedBox";
import repositoriesList from "data/repositoryList";
import useSmallViewport from "hooks/useViewport";
import type { IDataProjectsProps } from "types/ProjectProps";

const ProjectList = () => {
  const { isSmallViewport } = useSmallViewport();

  const [dataProjects, setDataProjects] = useState<IDataProjectsProps[]>([]);

  useEffect(() => {
    setDataProjects(repositoriesList);
  }, []);

  return (
    <>
      <NextSeo
        title="Projects"
        description="Here are my projects collection that i've done as Frontend Developer. I'm using React, NextJS, ChakraUI, TypeScript and more."
      />
      <Box w="full" p="5" mx="auto">
        <chakra.h1 fontSize="4xl" fontWeight="bold" data-aos="fade-down">
          Projects
        </chakra.h1>
        <Text fontSize="xl" data-aos="fade-down" data-aos-delay={200}>
          Showcase of projects i've done on
          <chakra.span
            p="1"
            bgColor={useColorModeValue("teal.200", "transparent")}
            color={useColorModeValue("black.200", "teal.400")}
          >
            {` Frontend Development 🧑‍💻`}
          </chakra.span>
        </Text>

        <DottedBox />

        <SimpleGrid
          mt={8}
          spacing={6}
          columns={[1, 2, 3]}
          data-aos="fade-down"
          data-aos-delay={500}
        >
          {dataProjects.map((repo, index) => (
            <chakra.div
              key={repo.id}
              data-aos="fade-down"
              data-aos-delay={isSmallViewport ? 0 : index * 150}
            >
              <RepositoryCard
                id={repo.id}
                url={repo.url}
                live={repo.live}
                title={repo.title}
                cover={repo.cover}
                techStack={repo.techStack}
                description={repo.description}
              />
            </chakra.div>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProjectList;
