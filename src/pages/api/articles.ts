import fs from "fs";
import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import type { XMLContent } from "helpers/generateXML";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<XMLContent[] | { error: string }> // Type the response
) {
  const baseUrl = process.env.BASE_URL ?? "https://ilhamadhim.my.id";

  try {
    const files = fs.readdirSync(path.join(process.cwd(), "src", "posts"));

    const paths = files.map((filename) => ({
      slug: filename.replace(".mdx", ""),
      id: uuidv4(),
    }));

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

    return res.status(200).json(list);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Failed to read data" });
  }
}
