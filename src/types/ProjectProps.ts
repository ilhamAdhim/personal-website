export interface IDataProjectsProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  techStack: ITechProjectProps[];
  url: string;
  live: string;
  inProgress?: boolean;
}

export interface ITechProjectProps {
  id: string;
  name: string;
}
