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

import techStack from "data/techStackList";

const TechStackList = () => {
  const [dataTechStack, setDataTechStack] = useState([]);
  const colorLink = useColorModeValue("teal", "teal.200");

  useEffect(() => {
    setDataTechStack(techStack);
  }, []);

  return (
    <Flex
      mt="4"
      gap="4"
      w="100%"
      justify="center"
      alignItems="center"
      flexWrap={["wrap", "nowrap"]}
    >
      {dataTechStack?.map((item) => (
        <Popover key={item.id} trigger="hover">
          <PopoverTrigger>
            <chakra.a
              fontSize="2em"
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
      ))}
    </Flex>
  );
};

export default TechStackList;
