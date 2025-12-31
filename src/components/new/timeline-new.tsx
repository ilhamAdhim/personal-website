import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { IExperienceProps } from "types/ExperienceProps";

type TimelineNewProps = {
  experiences: IExperienceProps[];
};

export function TimelineNew({ experiences }: TimelineNewProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500" />

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } flex-col gap-8`}
          >
            {/* Content */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 hover:border-teal-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-400 text-sm font-medium">{exp.subDesc}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{exp.pointTitle}</h3>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  {exp.description.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>{item.job}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-black shadow-lg shadow-teal-500/50" />

            {/* Spacer for the other side */}
            <div className="hidden md:block w-5/12" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

