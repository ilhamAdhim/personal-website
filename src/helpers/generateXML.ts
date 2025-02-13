/* eslint-disable sonarjs/no-nested-template-literals */
export interface XMLContent {
  loc: string;
  lastmod?: string;
  image?: {
    imageLoc: string;
    imageTitle: string;
  };
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

interface XMLParams {
  type: "sitemapindex" | "urlset";
  content: XMLContent[];
  useImageExtensions?: boolean;
}

export function generateXML({ type, content, useImageExtensions }: XMLParams) {
  const xmlContent = content.map(
    (item) => `${type === "sitemapindex" ? "<sitemap>" : "<url>"}
    <loc>${item.loc}</loc>
    ${
      item.image
        ? `<image:image>
            <image:loc>${item.image.imageLoc}</image:loc>
            <image:title>${item.image.imageTitle}</image:title>
          </image:image>`
        : ""
    }
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ""}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ""}
    ${item.priority ? `<priority>${item.priority}</priority>` : ""}
  ${type === "sitemapindex" ? "</sitemap>" : "</url>"}`
  );

  const sitemapIndexContent = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ${
    useImageExtensions
      ? 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
      : ""
  }>
  ${xmlContent.join("")}
</sitemapindex>`;

  const urlsetContent = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ${
    useImageExtensions
      ? 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
      : ""
  }>
    ${xmlContent.join("")}
    </urlset>`;

  const xmlWrapper =
    type === "sitemapindex" ? sitemapIndexContent : urlsetContent;

  return `<?xml version="1.0" encoding="UTF-8"?>
  ${xmlWrapper}`;
}
