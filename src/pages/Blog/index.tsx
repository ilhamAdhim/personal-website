import { NextSeo } from "next-seo";

import WIPComponent from "components/WIP";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import BlogPost from "components/BlogPost";
import { Box, SimpleGrid } from "@chakra-ui/react";

const BlogPage = ({ posts }: any) => {
  console.log(posts, "ini posts");
  return (
    <>
      <NextSeo
        title="Blog"
        description="Ilham Adhim writes articles to document his learning on Front-End Technologies. Feel fre to visit his website"
      />
      {/* <WIPComponent /> */}
      <Box mt="5">
        <SimpleGrid
          px={4}
          mt={8}
          spacing={6}
          columns={[1, 2, 3]}
          data-aos="fade-down"
          data-aos-delay={500}
        >
          {posts.map((post: any, index: number) => (
            <Link href={"/Blog/" + post.slug} key={index} passHref>
              <a>
                <BlogPost
                  title={post.frontMatter.title}
                  description={post.frontMatter.description}
                  date={post.frontMatter.date}
                  thumbnailUrl={post.frontMatter.thumbnailUrl}
                  tags={post.frontMatter.tags}
                />
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("src/posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("src/posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};
