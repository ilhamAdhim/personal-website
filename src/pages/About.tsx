import { Box, Flex, Text } from "@chakra-ui/react";
import PortfolioAbout from "components/PortfolioSection";
import DottedBox from "components/SVGVectors/DottedBox";
import TimelineSection from "components/TimelIneSection";
import WIPComponent from "components/WIP";

const AboutPage = () => {
  return (
    <Box w="full" p="5" mx="auto">
      <Flex
        gap="4"
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

          <Box mt="10">
            Hello! I'm Ilham Adhim.
            {/* {`I started learning web development in May 2020,
            which is the start of the pandemic. I have nothing much to do so I
            decided to learn web development from a udemy course, then started
            watching a bunch of youtube videos to explore more about web
            development especially frontend development.`} */}
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            ipsum, dicta sapiente minus ipsam facilis id, error deleniti quas
            nam, fuga quia voluptates repudiandae libero dolor labore pariatur
            ducimus a.
            {/* {`There are a lot of things and technologies to learn in frontend
            development and I am motivated to learn as much as possible. I enjoy
            learning something new and getting feedback to make myself better
            and improve.`} */}
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            impedit aliquid quis blanditiis sed, deleniti cupiditate nulla dicta
            odio assumenda fugiat fuga, excepturi obcaecati incidunt doloremque
            magni asperiores accusamus natus?
            {/* {`In this website I will be writing some blogs and showcase my
            projects. I believe that writing what I have learned is the best way
            to remember things, and I can share my knowledge along the way. So
            do contact me and I will be very happy to help`}! */}
          </Box>
          {/* <WIPComponent /> */}
          <TimelineSection title="Projects Done" />
          <TimelineSection title="Academic Background" />
          <TimelineSection title="Others" />
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutPage;
