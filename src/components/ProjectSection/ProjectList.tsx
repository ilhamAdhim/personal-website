import { SimpleGrid, chakra } from "@chakra-ui/react";

import RepositoryCard from "components/ProjectSection/RepositoryCard";
import useSmallViewport from "hooks/useViewport";
import type {
  IDataProjectsProps,
  IProjectCollectionProps,
} from "types/ProjectProps";

const ProjectList: React.FC<IProjectCollectionProps> = ({
  dataProjects,
}: IProjectCollectionProps) => {
  const { isSmallViewport } = useSmallViewport();

  return (
    <SimpleGrid
      mt={8}
      spacing={6}
      columns={[1, 1, 2, 2, 3]}
      data-aos="fade-down"
      data-aos-delay={500}
    >
      {dataProjects?.map((repo: IDataProjectsProps, index: number) => (
        <chakra.div
          key={repo.id}
          data-aos="fade-down"
          data-aos-delay={isSmallViewport ? 0 : index * 50}
        >
          <RepositoryCard {...repo} />
        </chakra.div>
      ))}
    </SimpleGrid>
  );
};

export default ProjectList;
