import { motion } from "framer-motion";
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { FiPackage } from "react-icons/fi";

import MetaData from "components/Metadata";
import { TimelineNew } from "components/new/timeline-new";
import { Spotlight } from "components/ui/spotlight";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import type { IExperienceProps } from "types/ExperienceProps";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["about"])),
      language: locale,
    },
  };
}

const AboutNew: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { t } = useTranslation("about");
  const [dataWorkExp, setDataWorkExp] = useState<IExperienceProps[]>([]);

  useEffect(() => {
    const translated = props._nextI18Next.initialI18nStore;

    setDataWorkExp(
      translated[props.language as keyof typeof translated].about.data.map(
        (item: IExperienceProps) => {
          return {
            ...item,
            icon: <FiPackage />,
          };
        }
      )
    );
  }, [props._nextI18Next.initialI18nStore, props.language]);

  return (
    <>
      <MetaData
        title="Ilham Adhim | About"
        description="Muhammad Ilham Adhim is a Front-End Developer from Indonesia with React as his main tech stack. He has various experience on both academic backgrounds and projects done. Check more..."
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
              <span className="text-sm text-teal-300">About Me</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Muhammad Ilham Adhim
              </span>
            </h1>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          >
            {/* Profile Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-1 p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-teal-500/50 transition-all"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg shadow-teal-500/50">
                <Image
                  src="/images/my-profile.jpg"
                  alt="Ilham Adhim"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Ilham Adhim
              </h3>
              <p className="text-teal-400 text-center mb-6">
                Front-End Developer
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span className="text-sm">Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Mail className="w-4 h-4 text-teal-400" />
                  <span className="text-sm">ilhamadhim@example.com</span>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Link
                  href="https://github.com/ilhamadhim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  href="https://linkedin.com/in/ilhamadhim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* About Content */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  About Me
                </h2>
                <div className="space-y-4 text-neutral-300 leading-relaxed">
                  <p>{t("firstParagraph")}</p>
                  <p>
                    <span className="text-teal-400 font-semibold">
                      Front-End Developer {props.language === "en" ? "at" : "di"}{" "}
                      PT. Erajaya Swasembada
                    </span>
                  </p>
                  <p>{t("secondParagraph")}</p>
                  <p>{t("thirdParagraph")}</p>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "JavaScript",
                    "Node.js",
                    "Git",
                    "Chakra UI",
                    "Shadcn UI",
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-2"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {t("experienceTitle")}
              </span>
            </h2>
            <TimelineNew experiences={dataWorkExp} />
          </motion.div>
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
    </>
  );
};

export default AboutNew;

