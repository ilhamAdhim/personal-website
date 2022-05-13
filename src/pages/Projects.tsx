import {
  Box,
  SimpleGrid,
  Text,
  chakra,
  useColorModeValue,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import DottedBox from "components/SVGVectors/DottedBox";
import repositoriesList from "components/repos-list";
import RepositoryCard from "components/RepositoryCard";

interface IDataProjectsProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  techStack: string[];
  url: string;
  live: string;
  inProgress: boolean;
}

const ProjectList = () => {
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsSmallViewport(isSmallScreen);
  }, []);

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
          columns={[1, 2, 3]}
          spacing={6}
          mt={8}
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
