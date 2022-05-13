import { NextSeo } from "next-seo";

import WIPComponent from "components/WIP";

const BlogPage = () => {
  return (
    <>
      <NextSeo
        title="Blog"
        description="Ilham Adhim writes articles to document his learning on Frontend Technologies. Feel fre to visit his website"
      />
      <WIPComponent />
    </>
  );
};

export default BlogPage;
