import {
  SiChakraui,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";

import type { ITechStackProps } from "types/TechStackListProps";

export const techStack: ITechStackProps[] = [
  {
    id: 1,
    icon: <SiChakraui />,
    color: "cyan",
    link: "https://chakra-ui.com/",
    description: "Chakra UI has been my go-to UI library for a while now.",
    descWithLink: "It's well-documented",
    nextDesc:
      "and i can build an app faster without any hassle. Plus, there are lots of open-source components are available out there.",
  },

  {
    id: 2,
    icon: <SiJavascript />,
    color: "#F0DB4F",
    link: "https://github.com/ilhamAdhim/restopedia",
    description:
      "JS Basics are essential for learning and implementing React. To enforce that idea, I developed",
    descWithLink: "PWA + SPA web app with vanilla JS.",
    nextDesc:
      "With these hassle, i can appreciate more of library and frameworks existence.",
  },
  {
    id: 3,
    icon: <SiWebpack />,
    color: "#1C78C0",
    link: "https://webpack.js.org/",
    description: "",
    descWithLink: "Webpack",
    nextDesc:
      "is a module bundler that i used for Module Analyzer and code splitting. Plus, we can differentiate production and development mode.",
  },
  {
    id: 4,
    icon: <SiSass />,
    color: "pink",
    link: "https://sass-lang.com/documentation",
    description: "While CSS is easy to use.",
    descWithLink: "Sass",
    nextDesc:
      "can do a lot better compared to normal CSS. Some features i've been using are global variables, mixins, and functions",
  },
];

const favTechStack: ITechStackProps[] = [
  {
    id: 1,
    icon: <SiReact />,
    color: "cyan",
    link: "https://reactjs.org/docs/hooks-intro.html",
    description:
      "I started learning React in 2019. It enabled me to create a SPA (Single Page Application) with high interactivity. When",
    descWithLink: "React Hooks",
    nextDesc: "comes out, i like it due to its simplicity.",
  },
  {
    id: 2,
    icon: <SiNextdotjs />,
    color: "teal",
    link: "https://nextjs.org/docs/getting-started",
    description: "After getting React basics, learning",
    descWithLink: "Next JS",
    nextDesc:
      "was seamless to me. SEO optimized, dynamic paths, and high customability are features I love at this moment.",
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
  },
  {
    id: 4,
    icon: <SiSupabase />,
    color: "teal.300",
    link: "https://supabase.com/",
    description:
      "A Backend as a Service tools that i use for fullstack application.",
    descWithLink: "Supabase",
    nextDesc:
      "helps with easy OAuth, logs, and built-in support of making CRUD operations, calling RPCs and setting up CRON too. ",
  },
  {
    id: 5,
    icon: <SiTailwindcss />,
    color: "#007acc",
    link: "https://tailwindcss.com/docs/installation",
    description: "For design that needs to be high customized and flexibility",
    descWithLink: "Tailwind CSS",
    nextDesc:
      "is a no-brainer option. Combined it with ShadCN, to makes it even more robust.",
  },
];

export default favTechStack;
