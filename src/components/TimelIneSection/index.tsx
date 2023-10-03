import { Box, Heading, Text, VStack, chakra } from "@chakra-ui/react";

import type { ITimelineProps } from "types/ExperienceProps";

import TimelineItem from "./TimelineItem";

const TimelineSection = ({
  title,
  pointCollection,
  ...props
}: ITimelineProps) => {
  return (
    <Box>
      <VStack textAlign="start" align="start" mb={5}>
        <Box>
          <Heading
            my={5}
            data-aos="fade-up"
            fontSize="2xl"
            fontWeight="600"
            textAlign={["center", "justify"]}
          >
            {title}
          </Heading>
          <Text mb="4" align={["justify"]}>
            {props?.subTitle}
          </Text>
          <Box>
            {pointCollection?.map((point, index) => (
              <Box
                key={point.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <TimelineItem
                  icon={point.icon}
                  subDesc={point.subDesc}
                  pointTitle={point.pointTitle}
                >
                  <chakra.div mt="2">
                    {point.description?.map((item) => (
                      <chakra.li mt={["5", "2"]} key={item.id}>
                        {" "}
                        {item.job}
                      </chakra.li>
                    ))}
                  </chakra.div>
                </TimelineItem>
              </Box>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default TimelineSection;
