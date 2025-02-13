import fs from "fs";
import matter from "gray-matter";
import type { GetServerSideProps } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import type { XMLContent } from "helpers/generateXML";
import { generateXML } from "helpers/generateXML";

export default function SitemapBlogs() {
  return null;
}

const generateSitemap = async () => {
  const baseUrl = process.env.BASE_URL ?? "https://ilhamadhim.my.id";

  const files = fs.readdirSync(path.join("src/posts"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
    id: uuidv4(),
  }));

  console.log("filename", paths);

  const list: XMLContent[] =
    paths.map((article) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("src/posts", `${article.slug}.mdx`),
        "utf-8"
      );

      const { data } = matter(markdownWithMeta);

      return {
        loc: `${baseUrl}/blog/${article.slug}`,
        lastmod: new Date(data.date).toISOString(),
        changefreq: "daily",
      };
    }) || [];

  return generateXML({
    type: "urlset",
    content: list,
  });
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = await generateSitemap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
