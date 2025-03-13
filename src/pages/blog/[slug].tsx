/* eslint-disable import/no-named-as-default */
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
import type { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import path from "path";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import Metadata from "components/Metadata";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"), {
  ssr: false,
});

const SyntaxHighlighterWithVariant = ({ children }: { children: string }) => {
  const { colorMode } = useColorMode();

  return (
    <SyntaxHighlighter
      showLineNumbers
      language="javascript"
      {...(colorMode === "dark" ? { style: dark } : {})}
      children={children}
    />
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
    metaKeywords: string[];
  };
  mdxSource: MDXRemoteSerializeResult;
}

const PostPage = ({
  frontMatter: { title, date, description, metaDescription, metaKeywords },
  mdxSource,
}: PostPageProps) => {
  let finalMetaDescription = "";
  if (!metaDescription.includes("Article by Ilham Adhim"))
    finalMetaDescription = metaDescription;
  else finalMetaDescription = `${description} ${metaDescription}`;

  // Ensure metaKeywords is a string
  const keywords = Array.isArray(metaKeywords)
    ? metaKeywords.join(",")
    : metaKeywords;

  return (
    <>
      <Metadata
        isArticle
        keywords={keywords}
        title={title}
        description={finalMetaDescription}
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
