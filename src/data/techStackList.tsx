import {
  SiChakraui,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSass,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";

import type { ITechStackProps } from "types/TechStackListProps";

const techStack: ITechStackProps[] = [
  {
    id: 1,
    icon: <SiNextdotjs />,
    color: "teal",
    link: "https://nextjs.org/docs/getting-started",
    description: "After getting React basics, learning",
    descWithLink: "Next JS",
    nextDesc:
      "were seamless to me. Seo optimized, dynamic paths, and high customability are features I love at this moment.",
    type: "tech",
  },
  {
    id: 2,
    icon: <SiReact />,
    color: "cyan",
    link: "https://reactjs.org/docs/hooks-intro.html",
    description:
      "I started learning React in 2019. It enabled me to create a SPA with high interactivity. When",
    descWithLink: "React Hooks",
    nextDesc: "comes out, i like it due to its simplicity.",
    type: "tech",
  },
  {
    id: 3,
    icon: <SiTypescript />,
    color: "#007acc",
    link: "https://www.typescriptlang.org/docs/",
    description:
      "Detect error earlier and fix it right away. For me, the usage of",
    descWithLink: "Typescript",
    nextDesc: "is worth its boilerplate problem. Definitely love it.",
    type: "tech",
  },
  {
    id: 4,
    icon: <SiChakraui />,
    color: "cyan",
    link: "https://chakra-ui.com/",
    description: "Chakra UI has been my go-to UI library for a while now.",
    descWithLink: "It's well-documented",
    nextDesc:
      "and i can build an app faster without any hassle. Plus, there are lots of open-source components are available too out there.",
    type: "tech",
  },
  {
    id: 5,
    icon: <SiWebpack />,
    color: "#1C78C0",
    link: "https://webpack.js.org/",
    description: "",
    descWithLink: "Webpack",
    nextDesc:
      "is module bundler that i used for Module Analyzer and code splitting. Plus, we can differentiate production and development mode.",
    type: "tech",
  },
  {
    id: 6,
    icon: <SiSass />,
    color: "pink",
    link: "https://sass-lang.com/documentation",
    description: "Easier-to-read CSS.",
    descWithLink: "Sass",
    nextDesc:
      "can hold global variables, mixins, and functions. Which are normal CSS are not fully capable of.",
    type: "tech",
  },

  {
    id: 7,
    icon: <SiJavascript />,
    color: "#F0DB4F",
    link: "https://github.com/ilhamAdhim/restopedia",
    description:
      "JS Basics are essential for learning and implementing React. To enforce that idea, I developed",
    descWithLink: "PWA + SPA web app with vanilla JS",
    nextDesc:
      "and it is possible. With these hassle, i can appreciate more of library and frameworks existence.",
    type: "tech",
  },
];

export default techStack;
