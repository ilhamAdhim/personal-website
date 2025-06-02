/* eslint-disable react/no-array-index-key */

import {
  Box,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  SlideFade,
  Text,
  VStack,
} from "@chakra-ui/react";
import useSmallViewport from "hooks/useViewport";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

type TestimonialType = {
  name: string;
  role: string;
  text: string;
};

interface TestimonialProps {
  testimonial: TestimonialType[][];
}

const TestimonialsSection = ({ testimonial }: TestimonialProps) => {
  const { isSmallViewport } = useSmallViewport();
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );

  const handleChange = (nextIdx: number, direction: "left" | "right") => {
    setSlideDirection(direction);
    setShow(false);
    setTimeout(() => {
      setCurrent(nextIdx);
      setShow(true);
    }, 200);
  };

  const handlePrev = () =>
    handleChange(current === 0 ? testimonial.length - 1 : current - 1, "right");
  const handleNext = () =>
    handleChange(current === testimonial.length - 1 ? 0 : current + 1, "left");

  return (
    <VStack spacing={6} align="stretch">
      <SlideFade
        in={show}
        key={current}
        offsetX={slideDirection === "left" ? -100 : 100}
      >
        {Array.isArray(testimonial[current]) && (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
            {testimonial[current].map((item: TestimonialType, idx: number) => (
              <Flex
                direction="column"
                justify="space-between"
                key={idx}
                p={6}
                borderWidth={1}
                borderRadius="md"
                boxShadow="md"
                position="relative"
                overflow="hidden"
              >
                {/* Quote icon */}
                <Box
                  position="absolute"
                  bottom={4}
                  right={4}
                  opacity={0.08}
                  fontSize="6xl"
                  zIndex={0}
                  pointerEvents="none"
                  color="gray.400"
                >
                  <FaQuoteRight />
                </Box>
                <Text fontSize="lg" mb={2}>
                  "{item.text}"
                </Text>
                <Box>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text color="gray.500">{item.role}</Text>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        )}
      </SlideFade>

      {!isSmallViewport && (
        <HStack justify="center">
          <IconButton
            aria-label="Previous"
            icon={<FaChevronLeft />}
            onClick={handlePrev}
            variant="outline"
            isDisabled={!show}
          />
          <Text>
            {current + 1} / {testimonial.length}
          </Text>
          <IconButton
            aria-label="Next"
            icon={<FaChevronRight />}
            onClick={handleNext}
            variant="outline"
            isDisabled={!show}
          />
        </HStack>
      )}
    </VStack>
  );
};

export default TestimonialsSection;
