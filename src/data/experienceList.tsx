import { FaTools } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

import type { IExperienceProps } from "types/ExperienceProps";

const workExperience: IExperienceProps[] = [
  {
    id: "exp-1",
    pointTitle: "Studi Independen Front-End Engineer Bootcamp ",
    subDesc: "Ruangguru | Feb '22 - Present ",
    description: [
      {
        id: "exp-1-1",
        job: "Uses Jira for project communication",
      },
      {
        id: "exp-1-2",
        job: "Optimize Git workflow and Github Actions for CI/CD",
      },
      {
        id: "exp-1-3",
        job: "Develop Web application with React JS, Next JS, Zustand, and Chakra UI",
      },
    ],
    icon: <FaTools />,
  },
  {
    id: "exp-2",
    pointTitle: "Studi Independen Machine Learning & Frontend Developer",
    subDesc: "Dicoding | Aug '21 - Jan '22 ",
    description: [
      {
        id: "exp-2-1",
        job: "Built Progressive Web App with Vanilla JS and Webpack",
      },
      {
        id: "exp-2-2",
        job: "Ensure the quality of the code with ESLint and Prettier",
      },
      {
        id: "exp-2-3",
        job: "Ensure the website's performance with Metric Web Vitals and E2E Testing with Puppeteer",
      },
      {
        id: "exp-2-4",
        job: "Integrate Machine Learning Algorithms to projects with Python, Keras, and Tensorflow",
      },
    ],
    icon: <FiPackage />,
  },
  {
    id: "exp-3",
    pointTitle: "React JS Developer Intern",
    subDesc: "PT. Sekawan Media | Jul '21 - Oct '21 ",
    description: [
      {
        id: "exp-3-1",
        job: "Integrate API from Backend",
      },
      {
        id: "exp-3-2",
        job: "Test web application with Cypress E2E Testing Library",
      },
      {
        id: "exp-3-3",
        job: "Work collaboratively with other team members to build SaaS web application | SIPAS Web App",
      },
    ],
    icon: <FiPackage />,
  },
  // {
  //   id: "exp-4",
  //   pointTitle: "Front-End Developer Freelance",
  //   subDesc: "Self-Employed | Apr '21 - Present",
  //   description: [
  //     {
  //       id: "exp-4-1",
  //       job: "Build web app adjusted with client's requirement",
  //     },
  //     {
  //       id: "exp-4-2",
  //       job: "Up to now, i mainly using Chakra UI, Next JS, and Laravel for my freelance projects ",
  //     },
  //   ],
  //   icon: <FiBarChart2 />,
  // },
];

export default workExperience;
