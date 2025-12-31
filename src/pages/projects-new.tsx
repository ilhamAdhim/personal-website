import { motion } from "framer-motion";
import type { InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { Code2, Layers, Sparkles } from "lucide-react";

import MetaData from "components/Metadata";
import { ProjectCardNew } from "components/new/project-card-new";
import { Spotlight } from "components/ui/spotlight";
import type { IDataProjectsProps } from "types/ProjectProps";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["projects"])),
      language: locale,
    },
  };
}

const ProjectsNew: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { t } = useTranslation("projects");
  const [dataProjects, setDataProjects] = useState<IDataProjectsProps[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "inProgress">("all");

  useEffect(() => {
    const translated = props._nextI18Next.initialI18nStore;
    setDataProjects(
      translated[props.language as keyof typeof translated].projects.data
    );
  }, [props._nextI18Next.initialI18nStore, props.language]);

  const filteredProjects = dataProjects.filter((project) => {
    if (filter === "completed") return !project.inProgress;
    if (filter === "inProgress") return project.inProgress;
    return true;
  });

  const stats = {
    total: dataProjects.length,
    completed: dataProjects.filter((p) => !p.inProgress).length,
    inProgress: dataProjects.filter((p) => p.inProgress).length,
  };

  return (
    <>
      <MetaData
        title="Ilham Adhim | Projects"
        description="Here are my projects collection that i've done as Front-End Developer. I'm using React, NextJS, ChakraUI, TypeScript and more."
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
              <span className="text-sm text-teal-300">Portfolio</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl">
              {t("subTitle")}
              <span className="text-teal-400"> Front-End Development 🧑‍💻</span>
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-teal-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10">
                  <Layers className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Total Projects</p>
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
                  <Code2 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{stats.completed}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
          >
            {[
              { key: "all", label: "All Projects" },
              { key: "completed", label: "Completed" },
              { key: "inProgress", label: "In Progress" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  filter === tab.key
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCardNew
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-neutral-400 text-lg">
                No projects found in this category.
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

export default ProjectsNew;

