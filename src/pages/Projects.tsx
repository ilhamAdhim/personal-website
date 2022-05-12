import {
  Box,
  SimpleGrid,
  Text,
  chakra,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import repositoriesList from "components/repos-list";
import RepositoryCard from "components/RepositoryCard";
import DottedBox from "components/SVGVectors/DottedBox";

interface IDataProjectsProps {
  id: number;
  title: string;
  description: string;
  cover: string;
  techStack: string[];
  url: string;
  live: string;
  inProgress: boolean;
}

const ProjectList = () => {
  const [isSmallViewport] = useMediaQuery("(max-width: 768px)");
  const [dataProjects, setDataProjects] = useState<IDataProjectsProps[]>([]);

  useEffect(() => {
    setDataProjects(repositoriesList());
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
          Showcase of projects i've done as
          <chakra.span
            p="1"
            bgColor={useColorModeValue("teal.200", "transparent")}
            color={useColorModeValue("black.200", "teal.400")}
          >
            {` Frontend Developer 🧑‍💻`}
          </chakra.span>
        </Text>

        <DottedBox />

        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={6}
          mt={8}
          data-aos="fade-down"
          data-aos-delay={500}
        >
          {dataProjects.map((repo) => (
            <chakra.div
              key={repo.id}
              data-aos="fade-down"
              data-aos-delay={isSmallViewport ? 0 : repo.id * 150}
            >
              <RepositoryCard
                id={repo.id}
                title={repo.title}
                description={repo.description}
                cover={repo.cover}
                techStack={repo.techStack}
                url={repo.url}
                live={repo.live}
              />
            </chakra.div>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProjectList;
