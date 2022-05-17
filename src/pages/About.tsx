import {
  Box,
  Flex,
  Link,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import PortfolioAbout from "components/PortfolioSection";
import DottedBox from "components/SVGVectors/DottedBox";
import TimelineSection from "components/TimelIneSection";
import workExperience from "data/experienceList";
import useSmallViewport from "hooks/useViewport";
import type { IExperienceProps } from "types/ExperienceProps";

const AboutPage = () => {
  const { isSmallViewport } = useSmallViewport();
  const colorHighlightLink = useColorModeValue("teal.600", "cyan");
  const [dataWorkExp, setDataWorkExp] = useState<IExperienceProps[]>([]);

  useEffect(() => {
    setDataWorkExp(workExperience);
  }, []);

  const colorName = useColorModeValue("teal.600", "teal.400");

  return (
    <>
      <NextSeo
        title="About"
        description="Muhammad Ilham Adhim is a Front-End Developer from Indonesia with React as his main tech stack. He has various experience on both academic backgrounds and projects done. Check more..."
      />
      <Box w="full" p="5" mx="auto">
        <Flex
          gap={["10", "20"]}
          flexDirection={["column", "column", "row-reverse"]}
          justifyContent="space-evenly"
        >
          <Box
            data-aos="flip-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            <PortfolioAbout />
            <DottedBox />
          </Box>
          <Box>
            <Text as="h1" fontSize="4xl" data-aos="fade-up">
              About
            </Text>
            <Text
              as="h2"
              fontSize="xl"
              color={colorName}
              data-aos="fade-up"
              data-aos-delay={isSmallViewport ? "0" : "100"}
            >
              Muhammad Ilham Adhim
            </Text>

            <Box mt="4">
              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "200"}
              >
                {`Currently, i'm a final year student majoring in Information
                Technology at State Polytechnic of Malang (Polinema). And doing my Front-End Engineering Bootcamp in `}
                <chakra.span
                  fontWeight="bold"
                  className="link-external"
                  _after={{
                    padding: 0,
                    margin: 0,
                    borderBottom: "3px solid",
                    borderBottomColor: colorHighlightLink,
                  }}
                  _hover={{
                    border: "none",
                  }}
                  borderBottom="3px dashed"
                  borderBottomColor={colorHighlightLink}
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
              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "300"}
              >
                Lots of modern technologies are being pumped out these days, and
                Front-End Technology is no exception. The urge to learn and try
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
              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "400"}
              >
                In this website, i'll actively adding collection to my handful
                projects and writing blogs. With writing, I'll be able to
                document my journey of exploration, experiences, as well as
                learnings. Besides, I'd like to share my findings and
                exploration on IT-related stuffs along the way.
              </Text>
              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "500"}
              >
                I'm open to working on paid project too if there is an
                opportunity. Feel free to reach out 👌
              </Text>

              <Box mt="4">
                <TimelineSection
                  title="Experience"
                  pointCollection={dataWorkExp}
                />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AboutPage;
