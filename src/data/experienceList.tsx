import { FaTools } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

import type { IExperienceProps } from "types/ExperienceProps";

const workExperience: IExperienceProps[] = [
  {
    id: "exp-1",
    pointTitle: "Front-End Engineer",
    subDesc: "Prosa AI | Sept '22 - Present",
    description: [
      {
        id: "exp-1-1",
        job: "Developing front-end web site architecture",
      },
      {
        id: "exp-1-2",
        job: "Developing/extending front-end components",
      },
      {
        id: "exp-1-3",
        job: "Designing user interactions on web pages.",
      },
      {
        id: "exp-1-4",
        job: "Ensuring responsiveness and scalability of applications",
      },
    ],
    icon: <FiPackage />,
  },
  {
    id: "exp-2",
    pointTitle: "Freelance External Code Reviewer",
    subDesc: "Dicoding Indonesia | Jun '22 - Present",
    description: [
      {
        id: "exp-2-1",
        job: "Reviewing student's submission in Front-End Learning Path",
      },
      {
        id: "exp-2-2",
        job: "Giving feedbacks and advices on how students can improve more on their codes",
      },
    ],
    icon: <FiPackage />,
  },
  {
    id: "exp-3",
    pointTitle: "Studi Independen Front-End Engineer Bootcamp ",
    subDesc: "Ruangguru | Feb '22 - Jul '22 ",
    description: [
      {
        id: "exp-3-1",
        job: "Used Jira for project communication",
      },
      {
        id: "exp-3-2",
        job: "Optimized Git workflow and Github Actions for CI/CD",
      },
      {
        id: "exp-3-3",
        job: "Developed Web application with React JS, Next JS, Zustand, and Chakra UI",
      },
    ],
    icon: <FaTools />,
  },
  {
    id: "exp-4",
    pointTitle: "Studi Independen Machine Learning & Front-End Developer",
    subDesc: "Dicoding | Aug '21 - Jan '22 ",
    description: [
      {
        id: "exp-4-1",
        job: "Built Progressive Web App with Vanilla JS and Webpack",
      },
      {
        id: "exp-4-2",
        job: "Ensured the quality of the code with ESLint and Prettier",
      },
      {
        id: "exp-4-3",
        job: "Ensured the website's performance with Metric Web Vitals and E2E Testing with Puppeteer",
      },
      {
        id: "exp-4-4",
        job: "Integrated Machine Learning Algorithms to projects with Python, Keras, and Tensorflow",
      },
    ],
    icon: <FiPackage />,
  },
  {
    id: "exp-5",
    pointTitle: "React JS Developer Intern",
    subDesc: "PT. Sekawan Media | Jul '21 - Oct '21 ",
    description: [
      {
        id: "exp-5-1",
        job: "Integrated API from Backend",
      },
      {
        id: "exp-5-2",
        job: "Tested web application with Cypress E2E Testing Library",
      },
      {
        id: "exp-5-3",
        job: "Worked collaboratively with other team members to build SaaS web application | SIPAS Web App",
      },
    ],
    icon: <FiPackage />,
  },

  // {
  //   id: "exp-5",
  //   pointTitle: "Front-End Developer Freelance",
  //   subDesc: "Self-Employed | Apr '21 - Present",
  //   description: [
  //     {
  //       id: "exp-5-1",
  //       job: "Build web app adjusted with client's requirement",
  //     },
  //     {
  //       id: "exp-5-2",
  //       job: "Up to now, i mainly using Chakra UI, Next JS, and Laravel for my freelance projects ",
  //     },
  //   ],
  //   icon: <FiBarChart2 />,
  // },
];

export default workExperience;
