/* eslint-disable react/no-children-prop */
import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import path from "path";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { v4 as uuidv4 } from "uuid";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"), {
  ssr: false,
});

const SyntaxHighlighterWithVariant = ({ children }: any) => {
  const { colorMode } = useColorMode();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {colorMode === "dark" ? (
        <SyntaxHighlighter
          showLineNumbers
          language="javascript"
          style={dark}
          children={children}
        />
      ) : (
        <SyntaxHighlighter
          showLineNumbers
          language="javascript"
          children={children}
        />
      )}
    </>
  );
};

const components = {
  Button,
  SyntaxHighlighterWithVariant,
  Box,
  Flex,
  Text,
  Alert,
  Link,
};

const PostPage = ({ frontMatter: { title, date }, mdxSource }: any) => {
  return (
    <Box suppressHydrationWarning w={["90%", "60%"]} mx="auto">
      <Flex flexDir="column" gap={2} my={2}>
        <Heading fontSize="2xl" color={useColorModeValue("gray.700", "white")}>
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
      id: uuidv4(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/posts", `${slug}.mdx`),
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
