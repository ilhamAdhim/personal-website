// @ts-nocheck

import {
  Flex,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import favTechStack, { techStack } from "data/techStackList";
import useSmallViewport from "hooks/useViewport";

interface ITechStackList {
  category: "fav" | "other";
}

const TechStackList = ({ category }: ITechStackList) => {
  const { isSmallViewport } = useSmallViewport();
  const [dataTechStack, setDataTechStack] = useState([]);

  const colorLink = useColorModeValue("teal", "teal.200");

  useEffect(() => {
    if (isSmallViewport)
      setDataTechStack(
        (category === "fav" ? favTechStack : techStack).slice(0, 5)
      );
    else setDataTechStack(category === "fav" ? favTechStack : techStack);
  }, [isSmallViewport]);

  return (
    <Flex
      mt="4"
      gap="4"
      // w="100%"
      justify="center"
      alignItems="center"
      // flexWrap={["wrap", "nowrap"]}
    >
      {dataTechStack?.map((item) => (
        <chakra.div
          key={item.id}
          data-aos={isSmallViewport ? "fade-left" : ""}
          data-aos-delay={isSmallViewport ? 1000 + item.id * 150 : 0}
        >
          <Popover trigger="hover">
            <PopoverTrigger>
              <chakra.a
                fontSize="1.5em"
                _hover={{
                  color: item.color,
                }}
              >
                {item.icon}
              </chakra.a>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Text align="justify" fontSize=".8em">
                  <chakra.span>{item.description}</chakra.span>
                  <chakra.span padding="2" color={colorLink}>
                    <Link isExternal href={item?.link}>
                      {item?.descWithLink}
                    </Link>
                  </chakra.span>
                  <chakra.span>{item?.nextDesc}</chakra.span>
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </chakra.div>
      ))}
    </Flex>
  );
};

export default TechStackList;
