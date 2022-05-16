import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";

export function DottedBox() {
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

// const SkillSectionAlt = () => {
//   return (
//     <Container maxW="full" px={{ base: 6, md: 3 }} py={28} id="nextpart">
//       <Flex
//         mt="2"
//         gap="2"
//         pos="relative"
//         justifyContent="space-evenly"
//         direction={["column", "row"]}
//       >
//         <DottedBox />

//         <Flex direction="column" gap="4">
//           <Image
//             boxShadow="lg"
//             w="100%"
//             h="100%"
//             minW={{ base: "auto", md: "30rem" }}
//             maxH="20rem"
//             objectFit="cover"
//             src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
//             rounded="md"
//             fallback={<Skeleton />}
//           />
//           <Image
//             boxShadow="lg"
//             w="100%"
//             h="100%"
//             minW={{ base: "auto", md: "30rem" }}
//             maxH="20rem"
//             objectFit="cover"
//             src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
//             rounded="md"
//             fallback={<Skeleton />}
//           />
//         </Flex>

//         <Box>
//           <TimelineSection
//             title="My Frontend Development Tools"
//             subTitle="With fast-paced updates from technology. I found myself comfortable with"
//             pointCollection={workExperience}
//           />
//         </Box>
//       </Flex>
//     </Container>
//   );
// };

const SkillSection = () => {
  return (
    <Container maxW="full" px={{ base: 6, md: 3 }} py={28}>
      <Flex
        mt="2"
        gap="2"
        pos="relative"
        justifyContent="space-evenly"
        direction={["column", "row"]}
      >
        <Box>apa</Box>
        <Box>lala</Box>
        <Flex direction="column" gap="4">
          <Box />
          <Box>lorem</Box>
        </Flex>
        <DottedBox />
      </Flex>
    </Container>
  );
};

export default SkillSection;
