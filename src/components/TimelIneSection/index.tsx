import { Box, Heading, SlideFade, VStack, chakra } from "@chakra-ui/react";
import type { ReactNode } from "react";

// Here we have used react-icons package for the icons
import type { ITimelineProps } from "types/ExperienceProps";

import TimelineItem from "./TimelineItem";

interface Props {
  children: ReactNode;
}

export const PageSlideFade = ({ children }: Props) => {
  return <SlideFade in>{children}</SlideFade>;
};

const TimelineSection = ({ title, pointCollection }: ITimelineProps) => {
  return (
    <Box>
      <PageSlideFade>
        <VStack textAlign="start" align="start" mb={5}>
          <Box>
            <Heading fontSize="2xl" fontWeight="600" my={5}>
              {title}
            </Heading>
            <Box>
              {pointCollection?.map((point) => (
                <TimelineItem
                  key={point.id}
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
              ))}
            </Box>
          </Box>
        </VStack>
      </PageSlideFade>
    </Box>
  );
};

export default TimelineSection;
