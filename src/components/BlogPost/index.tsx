import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

interface BlogPostProps {
  title: string;
  date: string;
  description: string;
  thumbnailUrl: string;
  tags: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  description,
  thumbnailUrl,
  tags,
}) => {
  return (
    <Center py={6}>
      <Box
        _hover={{
          transform: "scale(1.05)",
          transition: "all .2s ease-in-out",
        }}
        cursor="pointer"
        maxW={"445px"}
        w={"full"}
        p={6}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={thumbnailUrl} layout={"fill"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"} textOverflow="clip">
            {description}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}> ilhamadhim </Text>
            <Text color={"gray.500"}>{date}· 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
export default BlogPost;
