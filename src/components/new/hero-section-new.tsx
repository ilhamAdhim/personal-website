import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ArrowRight, Github, Linkedin, Sparkles } from "lucide-react";
import { Button } from "components/ui/button";
import { Spotlight } from "components/ui/spotlight";
import { TextGenerateEffect } from "components/ui/text-generate-effect";
import { Highlight } from "components/ui/hero-highlight";

export function HeroSectionNew() {
  const { t } = useTranslation("landingPage");

  return (
    <div className="min-h-[90vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-300">
              {t("greet")} 👋
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            {t("subject")}{" "}
            <br className="md:hidden" />
            <Highlight className="text-black dark:text-white">
              Ilham Adhim
            </Highlight>
          </h1>

          <div className="mt-8 max-w-2xl mx-auto">
            <TextGenerateEffect
              words={t("selfIntroduction")}
              className="text-base md:text-lg text-neutral-300"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold px-8 group"
              >
                {t("buttons.primary")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-teal-500/50 text-teal-300 hover:bg-teal-500/10 px-8"
              >
                {t("buttons.secondary")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-12 flex gap-6 justify-center"
          >
            <Link
              href="https://github.com/ilhamadhim"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Github className="w-6 h-6 text-neutral-400" />
              </motion.div>
            </Link>
            <Link
              href="https://linkedin.com/in/ilhamadhim"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Linkedin className="w-6 h-6 text-neutral-400" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <Link href="#featured-projects">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block cursor-pointer"
              >
                <div className="w-6 h-10 border-2 border-teal-500 rounded-full flex items-start justify-center p-2">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-teal-500 rounded-full"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}

