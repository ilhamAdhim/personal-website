import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Skeleton,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { PropsWithChildren } from "react";
import { FaBolt } from "react-icons/fa";

import DottedBox from "components/SVGVectors/DottedBox";
import WavingHand from "components/WavingHand";

import LinksAlt from "./LinksAlt";

const HeroSection = () => {
  const { t } = useTranslation("landingPage");

  return (
    <Box mt="20" width={["full", "80%"]}>
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Stack direction="column" spacing={6} justifyContent="center">
          <chakra.h2
            fontSize={["2em", "3em"]}
            lineHeight={1}
            fontWeight="bold"
            textAlign={["center", "left"]}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            {t("greet")}
            <WavingHand />
            <br />
            <chakra.div mt="8" data-aos="fade-right" data-aos-delay="2000">
              {t("subject")}
              <chakra.span color={useColorModeValue("teal.600", "teal.400")}>
                {` Ilham Adhim`}
              </chakra.span>
            </chakra.div>
          </chakra.h2>
          <Text
            width="100%"
            p={["4", "0"]}
            fontSize="1.2rem"
            color="gray.500"
            lineHeight="1.375"
            fontWeight="400"
            textAlign="justify"
            data-aos="fade-right"
            data-aos-delay="2000"
          >
            {t("selfIntroduction")}
          </Text>
          <Flex
            justifyContent={["center", "flex-start"]}
            gap={4}
            data-aos="flip-right"
            data-aos-delay="3000"
            data-aos-duration="2000"
          >
            <Link href="/projects" passHref>
              <Button
                color="white"
                variant="solid"
                size="lg"
                rounded="md"
                lineHeight={1}
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{
                  bgGradient: "linear(to-l, #2563eb, #0ea5e9)",
                }}
              >
                <chakra.span fontSize={[".8em", "unset"]}>
                  {t("buttons.primary")}
                </chakra.span>
                <Icon as={FaBolt} h={4} w={4} ml={1} />
              </Button>
            </Link>
            <Button
              p={4}
              border="1px solid"
              rounded="md"
              boxShadow="md"
              size="lg"
            >
              <Link href="/About" passHref>
                <chakra.span fontSize={[".8em", "unset"]}>
                  {t("buttons.secondary")}
                </chakra.span>
              </Link>
            </Button>
          </Flex>
          <LinksAlt />
        </Stack>

        <DottedBox />
      </Stack>
    </Box>
  );
};

export default HeroSection;

const Content = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

export function HeroAltSection() {
  return (
    <Container maxW="full" px={{ base: 6, md: 3 }} py={28}>
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Box mr={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          <Image
            w="100%"
            h="100%"
            boxShadow="lg"
            minW={{ base: "auto", md: "30rem" }}
            maxH="20rem"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
        <Stack direction="column" spacing={6} justifyContent="center">
          <chakra.h1
            fontSize="5xl"
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
          >
            On a mission to empower Front end developers
          </chakra.h1>
          <Box>
            <Content>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
              quisquam aperiam maiores corporis adipisci libero! Deserunt autem
              neque quos ipsa possimus corrupti veritatis eveniet, consequatur
              repellendus animi exercitationem fuga cum.
            </Content>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
