import type { TextProps } from "@chakra-ui/react";
import {
  Box,
  Container,
  Image,
  Skeleton,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        />
      </svg>
    </Box>
  );
}

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

const SkillSection = () => {
  return (
    <Container maxW="full" px={{ base: 6, md: 3 }} py={28} id="nextpart">
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Box mr={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          <Image
            boxShadow="lg"
            w="100%"
            h="100%"
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
          {/* <Link href="#" fontSize="sm" color="blue.400">
            See how people are using our components →
          </Link> */}
        </Stack>
      </Stack>
    </Container>
  );
};

export default SkillSection;
