import type { LinkProps } from "@chakra-ui/react";
import { Box, Heading, Link, SlideFade, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { FaTools } from "react-icons/fa";
// Here we have used react-icons package for the icons
import { FiBarChart2, FiHome, FiPackage, FiUsers } from "react-icons/fi";

import type { ITimelineProps } from "types/TimelineProps";

import TimelineItem from "./TimelineItem";

interface ExternalLinkProps extends LinkProps {
  url: string;
  linkProps?: LinkProps;
  text: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  url,
  linkProps,
  text,
  ...props
}: ExternalLinkProps) => {
  return (
    <NextLink href={url} passHref>
      <Link {...linkProps} {...props}>
        {text}
      </Link>
    </NextLink>
  );
};

interface Props {
  children: ReactNode;
}

export const PageSlideFade = ({ children }: Props) => {
  return <SlideFade in>{children}</SlideFade>;
};

const TimelineSection = ({ title }: ITimelineProps) => {
  const linkColor = "blue.400";
  const linkHoverColor = "blue.600";

  return (
    <Box>
      <PageSlideFade>
        <VStack textAlign="start" align="start" mb={5}>
          <Box>
            <Heading fontSize="2xl" fontWeight="600" my={5}>
              {title}
            </Heading>
            <Box>
              <TimelineItem icon={FaTools}>
                Learnt
                <ExternalLink
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  url="https://www.typescriptlang.org"
                  text="Typescript"
                  target="_blank"
                />
                and
                <ExternalLink
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  url="https://nextjs.org"
                  text="Next.js"
                  target="_blank"
                />
              </TimelineItem>
              <TimelineItem icon={FiUsers}>loremm</TimelineItem>
              <TimelineItem icon={FiPackage}>
                Published 3 posts on my portfolio website
                <ExternalLink
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  url="https://mahmad.me/blog"
                  text="Blog"
                  target="_blank"
                />
              </TimelineItem>
              <TimelineItem icon={FiPackage}>
                Published or contributed to
                <ExternalLink
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  url="https://mahmad.me/open-source"
                  text="20+ open-source repositories"
                  target="_blank"
                />
              </TimelineItem>
              <TimelineItem icon={FiBarChart2}>
                Collected 34k+ posts views and 1.5k+ total reactions on
                <ExternalLink
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  url="https://dev.to/m_ahmad"
                  text="Dev.to"
                  target="_blank"
                />
              </TimelineItem>
              <TimelineItem icon={FiHome} skipTrail>
                Rebuilt my portfolio website with React, ChakraUI and
                Framer-motion,
                <ExternalLink
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  url="https://github.com/MA-Ahmad/myPortfolio"
                  text="source on Github"
                  target="_blank"
                />
                .
              </TimelineItem>
            </Box>
          </Box>
        </VStack>
      </PageSlideFade>
    </Box>
  );
};

export default TimelineSection;
