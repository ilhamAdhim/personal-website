import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "components/ui/card";
import { Badge } from "components/ui/badge";

type BlogCardNewProps = {
  title: string;
  description: string;
  date: string;
  thumbnailUrl: string;
  tags: string[];
  timeEstimation: string;
  index: number;
};

export function BlogCardNew({
  title,
  description,
  date,
  thumbnailUrl,
  tags,
  timeEstimation,
  index,
}: BlogCardNewProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden group border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-teal-500/50 transition-all duration-300 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
          
          {/* Tags overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tags?.slice(0, 2).map((tag, idx) => (
              <Badge
                key={idx}
                className="bg-teal-500/90 text-black text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{timeEstimation}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-teal-400 transition-colors">
            {title}
          </h3>
          
          <p className="text-neutral-400 text-sm line-clamp-3">
            {description}
          </p>

          <div className="mt-4 flex items-center text-teal-400 text-sm font-medium group-hover:gap-2 transition-all">
            Read More
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="ml-1"
            >
              →
            </motion.span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

