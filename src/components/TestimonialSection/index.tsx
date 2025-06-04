/* eslint-disable react/no-array-index-key */

import {
  Box,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Slide,
  Text,
  VStack,
} from "@chakra-ui/react";
import useSmallViewport from "hooks/useViewport";
import { useEffect, useState } from "react";
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

  // For mobile, flatten the testimonials so that one card is shown per slide
  const flattened = isSmallViewport ? testimonial.flat() : [];
  const itemCount = isSmallViewport ? flattened.length : testimonial.length;

  const handleChange = (nextIdx: number) => {
    setShow(false);
    setTimeout(() => {
      setCurrent(nextIdx);
      setShow(true);
    }, 200);
  };

  const handlePrev = () => {
    setSlideDirection("left");
    handleChange(current === 0 ? itemCount - 1 : current - 1);
  };

  const handleNext = () => {
    setSlideDirection("right");
    handleChange(current === itemCount - 1 ? 0 : current + 1);
  };

  // Auto-slide for both desktop and mobile with different intervals.
  useEffect(() => {
    let autoSlide: ReturnType<typeof setInterval>;
    if (isSmallViewport) {
      autoSlide = setInterval(() => {
        if (show) {
          handleNext();
        }
      }, 8000);
    } else {
      autoSlide = setInterval(() => {
        if (show) {
          handleNext();
        }
      }, 6000);
    }
    return () => clearInterval(autoSlide);
  }, [show, current, isSmallViewport, itemCount]);

  const slideStyle: React.CSSProperties = {
    position: "relative",
    transition: "all .5s ease-out",
  };

  return (
    <VStack spacing={6} align="stretch">
      {isSmallViewport ? (
        <Box position="relative" overflow="hidden" width="100%">
          <Slide in direction={slideDirection} key={current} style={slideStyle}>
            <Flex
              minH={250}
              p={6}
              direction="column"
              justify="space-between"
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
                "{flattened[current]?.text}"
              </Text>
              <Box>
                <Text fontWeight="bold">{flattened[current]?.name}</Text>
                <Text color="gray.500">{flattened[current]?.role}</Text>
              </Box>
            </Flex>
          </Slide>
        </Box>
      ) : (
        <Box position="relative" overflow="hidden" width="100%">
          <Slide in direction={slideDirection} key={current} style={slideStyle}>
            {Array.isArray(testimonial[current]) && (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
                {testimonial[current].map(
                  (item: TestimonialType, idx: number) => (
                    <Flex
                      minH={250}
                      p={6}
                      direction="column"
                      justify="space-between"
                      key={idx}
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
                  )
                )}
              </SimpleGrid>
            )}
          </Slide>
        </Box>
      )}

      <HStack justify="center">
        <IconButton
          aria-label="Previous"
          icon={<FaChevronLeft />}
          onClick={handlePrev}
          variant="outline"
          isDisabled={!show}
        />
        <Text>
          {current + 1} / {itemCount}
        </Text>
        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={handleNext}
          variant="outline"
          isDisabled={!show}
        />
      </HStack>
    </VStack>
  );
};

export default TestimonialsSection;
