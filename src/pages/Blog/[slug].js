import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Box, Button, Divider, Flex, Heading, Text, useColorMode, useColorModeValue, Link, Alert } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const SyntaxHighlighterWithVariant = ({children}) => {
  const { colorMode } = useColorMode();

  return (
    <>
    {colorMode === 'dark' 
    ? <SyntaxHighlighter showLineNumbers language="javascript" style={dark} children={children} /> 
    : <SyntaxHighlighter showLineNumbers language="javascript" children={children} /> }
    </>
  )
}

const components = { Button, SyntaxHighlighterWithVariant, Box, Flex, Text, Alert, Link };

const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  const router = useRouter();
  return (
    <Box w={["90%", "60%"]} mx="auto">
      <Flex flexDir="column" gap={2} my={2}>
        <Heading
          fontSize={"2xl"}
          color={useColorModeValue("gray.700", "white")}
        >
          {title}
        </Heading>
        <Text>{date}</Text>
      </Flex>
      <Divider my={4} />

      <MDXRemote {...mdxSource} components={components} />
    </Box>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src/posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
      id : uuidv4()
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
