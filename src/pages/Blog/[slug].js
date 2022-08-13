import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const components = { Button, SyntaxHighlighter };

const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  const router = useRouter();
  return (
    <Box w="full" p="5" mx="auto">
      <Box display="flex">
        <Button my="12" onClick={() => router.back()}>
          <FaArrowLeft />
        </Button>
        <Heading
          m="auto"
          fontSize={"2xl"}
          color={useColorModeValue("gray.700", "white")}
          textAlign="center"
        >
          {title}
        </Heading>
      </Box>

      <MDXRemote {...mdxSource} components={components} />
    </Box>
  );
};

const getStaticPaths = async () => {
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

const getStaticProps = async ({ params: { slug } }) => {
  console.log("ini slug" + slug);
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
