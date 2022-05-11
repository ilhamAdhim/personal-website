import { chakra, Box, Flex, Text } from "@chakra-ui/react";
import HeroSection from "components/HeroSection";
import MotionBox from "components/motion/Box";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Box
        display={{ md: "flex" }}
        alignItems="center"
        minHeight="70vh"
        gap={8}
        mb={8}
        w="full"
      >
        <Box>
          <HeroSection />
          <Flex justifyContent="center" marginTop={"8em"}>
            <MotionBox
              animate={{
                y: 10,
              }}
              transition={{
                from: 0,
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Link href="#woi">
                <Text
                  fontSize="2em"
                  fontWeight="bold"
                  _hover={{
                    color: `teal.500`,
                  }}
                >
                  <FaArrowDown />
                </Text>
              </Link>
            </MotionBox>
          </Flex>
        </Box>
      </Box>

      <chakra.div id="woi">Ini woi</chakra.div>

      <chakra.div h="70vh">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        asperiores doloribus quae nam corrupti voluptates iusto cumque vel!
        Blanditiis pariatur porro ducimus provident numquam magnam nulla ab quae
        velit atque.
      </chakra.div>
    </>
  );
};

export default Home;
