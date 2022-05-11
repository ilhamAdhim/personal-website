import { chakra, Divider, Flex, Link, Text } from "@chakra-ui/react";
import SocialList from "components/PortfolioSection/SocialList";

const Footer = () => {
  return (
    <chakra.div mt="20" mb="8">
      <Divider />
      <Flex as="footer" width="full" justify="center" gap="4" mt="5">
        <SocialList />
      </Flex>
      <Text align="center" mt="6">
        <Link
          href="https://www.github.com/ilhamadhim"
          isExternal
          rel="noopener noreferrer"
        >
          ©️ Muhammad Ilham Adhim
        </Link>
        {" - "} {new Date().getFullYear()}
      </Text>
    </chakra.div>
  );
};

export default Footer;
