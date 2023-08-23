import { Box, SimpleGrid, Text, chakra } from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import { NextSeo } from "next-seo";
import Link from "next/link";
import path from "path";

import BlogPost from "components/BlogPost";
import { DottedBox } from "components/SkillSection";

const BlogPage = ({ posts }: any) => {
  const sortByDate = posts.sort(
    (a: any, b: any) =>
      +new Date(b.frontMatter.date) - +new Date(a.frontMatter.date)
  );

  return (
    <>
      <NextSeo
        title="Blog"
        description="Ilham Adhim writes articles to document his learning on Front-End Technologies. Feel free to visit his website"
      />
      <Box w="full" p="5" mx="auto">
        {/* <WIPComponent /> */}
        <chakra.h1 fontSize="4xl" fontWeight="bold" data-aos="fade-down">
          Blogs
        </chakra.h1>
        <Text fontSize="xl" data-aos="fade-down" data-aos-delay={200}>
          Some writings to document my thoughts and my learning journey in
          Front-End Development
        </Text>

        <DottedBox />

        <SimpleGrid
          mt={8}
          spacing={6}
          columns={[1, 2, 3]}
          data-aos="fade-down"
          data-aos-delay={500}
        >
          {sortByDate.map((post: any) => (
            <Link href={`/Blog/${post.slug}`} key={post.id} passHref>
              <a>
                <BlogPost
                  title={post.frontMatter.title}
                  description={post.frontMatter.description}
                  date={post.frontMatter.date}
                  thumbnailUrl={post.frontMatter.thumbnailUrl}
                  tags={post.frontMatter.tags}
                  timeEstimation={post.frontMatter.timeEstimation}
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
