import {
  Box,
  Flex,
  Link,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";

import MetaData from "components/Metadata";
import PortfolioAbout from "components/PortfolioSection";
import DottedBox from "components/SVGVectors/DottedBox";
import TimelineSection from "components/TimelIneSection";
import useSmallViewport from "hooks/useViewport";
import type { IExperienceProps } from "types/ExperienceProps";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["about"])),
      language: locale,
    },
  };
}

const AboutPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { t } = useTranslation("about");

  const { isSmallViewport } = useSmallViewport();
  const colorHighlightLink = useColorModeValue("teal.600", "cyan");
  const [dataWorkExp, setDataWorkExp] = useState<IExperienceProps[]>([]);

  useEffect(() => {
    const translated = props._nextI18Next.initialI18nStore;

    setDataWorkExp(
      translated[props.language as keyof typeof translated].about.data.map(
        (item: IExperienceProps) => {
          return {
            ...item,
            icon: <FiPackage />,
          };
        }
      )
    );
  }, []);

  const colorName = useColorModeValue("teal.600", "teal.400");

  return (
    <>
      <MetaData
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
          // w={["full", "full", "2/3"]}
          // data-aos="flip-up"
          // data-aos-duration="1000"
          // data-aos-easing="ease-in-out"
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
              data-aos="fade-up"
              data-aos-delay={isSmallViewport ? "0" : "100"}
            >
              <chakra.span color={colorName}>Muhammad Ilham Adhim</chakra.span>
            </Text>

            <Box mt="4">
              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "200"}
              >
                {t("firstParagraph")}
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
                  >
                    {` Front-End Developer ${
                      props.language === "en" ? "in" : "di"
                    } PT. Erajaya Swasembada`}
                  </Link>
                </chakra.span>
              </Text>
              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "300"}
              >
                {t("secondParagraph")}
              </Text>

              <Text
                mt="10"
                align="justify"
                data-aos="fade-up"
                data-aos-delay={isSmallViewport ? "0" : "400"}
              >
                {t("thirdParagraph")}
              </Text>

              <Box mt="4">
                <TimelineSection
                  title={t("experienceTitle")}
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
