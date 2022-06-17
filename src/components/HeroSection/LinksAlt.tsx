import { Box, Flex, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { FaFileArchive, FaGithub, FaLinkedin } from "react-icons/fa";

function LinksAlt() {
  const colorLinkHero = useColorModeValue("gray.600", "gray.400");

  return (
    <Flex gap="4" justifyContent={["center", "flex-start"]}>
      {/* Currently disable resume button */}
      <Box color={colorLinkHero} _hover={{ cursor: "pointer" }}>
        <Link
          isExternal
          href="https://www.canva.com/design/DAErADbC6-A/mTwUTvggI0Vqzi_8ApN2lA/view?utm_content=DAErADbC6-A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
        >
          <>
            <Icon as={FaFileArchive} h="4" w="4" ml="1" mr="1" />
            Resume
          </>
        </Link>
      </Box>
      <Box color={colorLinkHero} _hover={{ cursor: "pointer" }}>
        <Link
          isExternal
          href="https://www.linkedin.com/in/muhammad-ilham-adhim/"
        >
          <>
            <Icon as={FaLinkedin} h="4" w="4" ml="1" mr="1" />
            Linkedin
          </>
        </Link>
      </Box>
      <Box color={colorLinkHero} _hover={{ cursor: "pointer" }}>
        <Link isExternal href="https://www.github.com/ilhamadhim">
          <>
            <Icon as={FaGithub} h="4" w="4" ml="1" mr="1" />
            Github
          </>
        </Link>
      </Box>
    </Flex>
  );
}

export default LinksAlt;
