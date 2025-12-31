import { motion } from "framer-motion";
import type { InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import MetaData from "components/Metadata";
import { HeroSectionNew } from "components/new/hero-section-new";
import { ProjectCardNew } from "components/new/project-card-new";
import { Button } from "components/ui/button";
import type { IDataProjectsProps } from "types/ProjectProps";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["landingPage"])),
      language: locale,
    },
  };
}

const HomeNew: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { t } = useTranslation("landingPage");
  const [featuredProjects, setFeaturedProjects] = useState<
    IDataProjectsProps[]
  >([]);

  useEffect(() => {
    const translated = props._nextI18Next.initialI18nStore;
    setFeaturedProjects(
      translated[props.language as keyof typeof translated].landingPage
        .FeaturedProjects.projects
    );
  }, [props._nextI18Next.initialI18nStore, props.language]);

  return (
    <>
      <MetaData
        title="Ilham Adhim | Home"
        description="Muhammad Ilham Adhim is a Front-End Developer from Indonesia. He Uses React, Typescript, and Next JS as main tech stack. Read more..."
      />
      
      {/* Hero Section */}
      <HeroSectionNew />

      {/* Featured Projects Section */}
      <section
        id="featured-projects"
        className="w-full py-20 bg-black relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {t("FeaturedProjects.title")}
              </span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {t("FeaturedProjects.subTitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCardNew
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold px-8 group"
              >
                {t("CTA")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />
      </section>

      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none -z-10" />
    </>
  );
};

export default HomeNew;

