import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Button, Container } from "@chakra-ui/react";

const components = { Button, SyntaxHighlighter };

const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </Container>
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
