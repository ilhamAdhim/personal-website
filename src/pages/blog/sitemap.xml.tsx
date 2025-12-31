import type { GetServerSideProps } from "next";

import { generateXML } from "helpers/generateXML";

export default function SitemapBlogs() {
  return null;
}

const generateSitemap = async () => {
  const baseUrl = process.env.BASE_URL ?? "https://ilhamadhim.my.id";
  try {
    const res = await fetch(`${baseUrl}/api/articles`);
    const data = await res.json();
    return generateXML({
      type: "urlset",
      content: data,
    });
  } catch {
    return generateXML({
      type: "urlset",
      content: [],
    });
  }
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
