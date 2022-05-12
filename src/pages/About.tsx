import {
  Box,
  Flex,
  Link,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import PortfolioAbout from "components/PortfolioSection";
import DottedBox from "components/SVGVectors/DottedBox";
import TimelineSection from "components/TimelIneSection";

const AboutPage = () => {
  const colorName = useColorModeValue("teal.600", "teal.400");
  return (
    <>
      <NextSeo
        title="About"
        description="Ilham Adhim is a Frontend Developer from Indonesia with React as his main tech stack. He has various experience on both academic backgrounds and projects done. Check more..."
      />
      <Box w="full" p="5" mx="auto">
        <Flex
          gap={["10", "20"]}
          flexDirection={["column", "column", "row-reverse"]}
          justifyContent="space-evenly"
        >
          <Box>
            <PortfolioAbout />
            <DottedBox />
          </Box>
          <Box>
            <Text as="h1" fontSize="4xl">
              About
            </Text>
            <Text as="h2" fontSize="xl" color={colorName}>
              Muhammad Ilham Adhim
            </Text>

            <Box mt="4">
              {/* {`I started learning web development in May 2020,
            which is the start of the pandemic. I have nothing much to do so I
            decided to learn web development from a udemy course, then started
            watching a bunch of youtube videos to explore more about web
            development especially frontend development.`} */}
              <Text mt="10" align="justify">
                {`Currently, i'm a final year student majoring in Information
                Technology at State Polytechnic of Malang (Polinema). And having
                a good time doing my Frontend Engineering Bootcamp in `}
                <chakra.span
                  fontWeight="bold"
                  className="link-external"
                  _after={{
                    borderBottom: "1px solid cyan",
                  }}
                  borderBottom="1px dashed cyan"
                >
                  <Link
                    isExternal
                    _hover={{
                      textDecoration: "none",
                    }}
                    href="https://kampusmerdeka.kemdikbud.go.id/program/studi-independen/browse/d3ff9ffd-0c26-4515-a13b-20bd6609229b/920c3018-41d2-11ec-a047-5674369c12f7"
                  >
                    {` MSIB Kampus Merdeka by Ruangguru`}
                  </Link>
                </chakra.span>
              </Text>
              <Text mt="10" align="justify">
                Lots of modern technologies are being pumped out these days, and
                Frontend Technology is no exception. The urge to learn and try
                these trending technologies is huge. Even so, after having some
                trials on various IT field, I had my focus on learning Front-End
                Development on 2020 and have been learning it ever since.
              </Text>
              {/* <Text mt="10" align="justify">
                Mainly, i utilizes Next, React, Chakra UI for building web
                applications. I also get the grasp of E2E Testing with Cypress
                to ensure the app built has integrated smoothly and ready to be
                used by the client.
              </Text> */}
              <Text mt="10" align="justify">
                In this website, i'll be active on adding collection to my
                handful projects and writing blogs . With writing, I'll be able
                to document my journey of exploration, experiences, as well as
                learnings. Besides, I'd like to share my findings and
                exploration on IT-related stuffs or anything else. This way, i
                can share my insights along the way.
              </Text>
              <Text mt="10" align="justify">
                I'm open to working on paid project too if there is an
                opportunity. Feel free to reach out 👌
              </Text>
            </Box>
            {/* <WIPComponent /> */}
            <TimelineSection title="Work Experience" />
            <TimelineSection title="Academic Background" />
            <TimelineSection title="Others" />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AboutPage;
