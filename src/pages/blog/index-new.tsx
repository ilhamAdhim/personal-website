import { motion } from "framer-motion";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import { BookOpen, FileText, Sparkles } from "lucide-react";

import MetaData from "components/Metadata";
import { BlogCardNew } from "components/new/blog-card-new";
import { Spotlight } from "components/ui/spotlight";

const BlogNew = ({ posts }: any) => {
  const sortByDate = posts.sort(
    (a: any, b: any) =>
      +new Date(b.frontMatter.date) - +new Date(a.frontMatter.date)
  );

  const stats = {
    total: posts.length,
    published: posts.length,
  };

  return (
    <>
      <MetaData
        title="Ilham Adhim | Blog"
        description="Ilham Adhim writes articles to document his learning on Front-End Technologies. Feel free to visit his website"
      />
      
      <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-300">Writing</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl">
              Some writings to document my thoughts and my learning journey in
              Front-End Development
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-teal-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10">
                  <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Total Articles</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Published</p>
                  <p className="text-3xl font-bold text-white">{stats.published}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortByDate.map((post: any, index: number) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} passHref>
                <a>
                  <BlogCardNew
                    title={post.frontMatter.title}
                    description={post.frontMatter.description}
                    date={post.frontMatter.date}
                    thumbnailUrl={post.frontMatter.thumbnailUrl}
                    tags={post.frontMatter.tags}
                    timeEstimation={post.frontMatter.timeEstimation}
                    index={index}
                  />
                </a>
              </Link>
            ))}
          </motion.div>

          {posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-neutral-400 text-lg">
                No blog posts yet. Stay tuned!
              </p>
            </motion.div>
          )}
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
    </>
  );
};

export default BlogNew;

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

