import type { GetServerSideProps } from "next";

import { generateXML } from "helpers/generateXML";

export default function Sitemap() {
  return null;
}

const generateSitemap = () => {
  const currentDateTime = new Date().toISOString();
  const baseUrl = process.env.BASE_URL ?? "https://ilhamadhim.my.id";

  const list = [
    `${baseUrl}`,
    `${baseUrl}/projects`,
    `${baseUrl}/about`,
    `${baseUrl}/blog`,
  ];

  return generateXML({
    type: "urlset",
    content: list.map((item) => ({ loc: item, lastmod: currentDateTime })),
  });
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap());
  res.end();

  return {
    props: {},
  };
};
