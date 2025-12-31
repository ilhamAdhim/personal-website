import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import type { IDataProjectsProps } from "types/ProjectProps";

type ProjectCardNewProps = {
  project: IDataProjectsProps;
  index: number;
};

export function ProjectCardNew({ project, index }: ProjectCardNewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden group border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-teal-500/50 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          {project.cover && (
            <Image
              src={project.cover}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
          {project.inProgress && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500/90 text-black">In Progress</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack?.slice(0, 3).map((tech) => (
              <Badge
                key={tech.id}
                variant="secondary"
                className="bg-teal-500/10 text-teal-400 border-teal-500/20"
              >
                {tech.name}
              </Badge>
            ))}
            {project.techStack && project.techStack.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-neutral-800 text-neutral-400"
              >
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex gap-2">
          {project.live && (
            <Link href={project.live} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                variant="outline"
                className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </Link>
          )}
          {project.url && (
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                variant="ghost"
                className="text-neutral-400 hover:text-white"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

