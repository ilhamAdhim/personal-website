import Head from "next/head";

import { textBuilder } from "utils/stringUtils";

interface MetaDataProps {
  isArticle?: boolean;
  displayedTitle?: string;
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  imageUrl?: string;
}

const settings = {
  title: "Ilham Adhim | Front-End Developer",
  description:
    "Muhammad Ilham Adhim is a Front-End Developer from Indonesia with React as his main tech stack. He has various experience on both academic backgrounds and projects done. Check more...",
  keywords:
    "Front End Developer, FE Developer, Indonesia, Next JS, React JS, Typescript, Shadcn UI",
  url: process.env.NEXT_PUBLIC_BASE_URL,
};

export default function MetaData(props: MetaDataProps) {
  const {
    isArticle,
    displayedTitle,
    title = settings.title,
    description = settings.description,
    keywords = settings.keywords,
    url = settings.url,
    imageUrl = "",
  } = props;

  const prefixTitle = "";
  const suffixTitle = "";

  const builtTitle = `${textBuilder([prefixTitle, title])} ${suffixTitle}`;
  const metaImage = imageUrl === "" ? `${settings.url}/favicon.ico` : imageUrl;

  const jsonLDRenderer = () => {
    let schemaType = "";
    if (isArticle) schemaType = "Blogs";
    else schemaType = "Personal Website";

    return (
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": schemaType,
            name: builtTitle,
            about: description,
            url,
          }),
        }}
      />
    );
  };

  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>
        {displayedTitle ? `${displayedTitle} ${suffixTitle}` : builtTitle}
      </title>
      <meta name="title" content={builtTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:site_name" content="ilhamadhim" />

      <meta property="og:title" content={builtTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content="website" />

      {jsonLDRenderer()}
    </Head>
  );
}
