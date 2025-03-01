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
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import path from "path";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { v4 as uuidv4 } from "uuid";
import { GetStaticPaths, GetStaticProps } from "next";

import Metadata from "components/Metadata";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"), {
  ssr: false,
});

const SyntaxHighlighterWithVariant = ({ children }: { children: string }) => {
  const { colorMode } = useColorMode();

  return (
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

interface PostPageProps {
  frontMatter: {
    title: string;
    date: string;
    description: string;
    metaDescription: string;
    tags: string[];
  };
  mdxSource: MDXRemoteSerializeResult;
}

const PostPage = ({
  frontMatter: { title, date, description, metaDescription, tags },
  mdxSource,
}: PostPageProps) => {
  return (
    <>
      <Metadata
        isArticle
        keywords={tags.join(",")}
        title={title}
        description={`${description} ${metaDescription}`}
      />
      <Box suppressHydrationWarning w={["90%", "60%"]} mx="auto">
        <Flex flexDir="column" gap={2} my={2}>
          <Heading
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
          >
            {title}
          </Heading>
          <Text>{date}</Text>
        </Flex>
        <Divider my={4} />
        <MDXRemote {...mdxSource} components={components} />
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src/posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
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

export default PostPage;
