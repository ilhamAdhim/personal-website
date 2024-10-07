/* eslint-disable react/no-array-index-key */
import {
  Box,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";

interface BlogPostProps {
  title: string;
  date: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  timeEstimation: string;
}

const BlogPost = ({
  title,
  date,
  description,
  thumbnailUrl,
  tags,
  timeEstimation,
}: BlogPostProps) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.05)",
        transition: "all .2s ease-in-out",
      }}
      cursor="pointer"
      maxW="445px"
      w="full"
      p={6}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow="2xl"
      rounded="md"
      overflow="hidden"
    >
      <Box minH="210px" bg="gray.100" mt={-6} mx={-6} mb={6} pos="relative">
        <Image
          src={thumbnailUrl}
          objectFit="cover" // Ensures image covers the entire area
          layout="fill"
          alt="Thumbnail Blog"
        />
      </Box>
      <Stack>
        <Flex gap="1em">
          {tags.map((item, id) => (
            <Tag key={id} size="sm" colorScheme="cyan">
              <Text fontSize={["0.85rem", "1em"]}>{item}</Text>
            </Tag>
          ))}
        </Flex>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize="xl"
          fontFamily="body"
        >
          {title}
        </Heading>
        <Text fontSize={14} color="gray.500" textOverflow="clip">
          {description}
        </Text>
      </Stack>
      <Stack mt={6} direction="row" spacing={4} align="center">
        {/* <Avatar src="/images/my-profile.jpg" /> */}
        <Stack direction="column" spacing={0} fontSize="sm">
          {/* <Text fontWeight={600}> ilhamadhim </Text> */}
          <Text color="gray.500">
            {date} · {timeEstimation} read
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};
export default BlogPost;
