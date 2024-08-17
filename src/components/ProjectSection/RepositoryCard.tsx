import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  Text,
  Tooltip,
  VStack,
  chakra,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEye, FiGithub } from "react-icons/fi";

import LazyImage from "components/LazyImage";
import type { IDataProjectsProps } from "types/ProjectProps";

const RepositoryCard = (props: IDataProjectsProps) => {
  const { title, cover, techStack, url, live, description } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  return (
    <Box
      rounded="xl"
      minH={30}
      boxShadow={useColorModeValue("1px 1px 5px gray", "1px 1px 5px skyblue")}
      _hover={{
        transform: "scale(1.05)",
        transition: "all .2s ease-in-out",
      }}
    >
      <VStack
        rounded="xl"
        borderWidth="1px"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.100", "gray.700")}
        overflow="hidden"
        align="start"
        spacing={0}
      >
        <Box position="relative" w="100%" onClick={handleClick}>
          <AspectRatio
            w="100%"
            ratio={1.85 / 1}
            borderBottomWidth="1px"
            style={{
              cursor: "pointer",
            }}
            borderColor={useColorModeValue("gray.100", "gray.700")}
          >
            <LazyImage src={cover} />
          </AspectRatio>
        </Box>

        <Flex
          p="4"
          w="100%"
          flexDir="column"
          px={[2, 4]}
          justify="space-between"
          h={["unset", "230", "230", "230", "unset"]}
          minH={["unset", "230", "230", "230", "250"]}
        >
          <Flex justifyContent="space-between" width="100%">
            <Tooltip hasArrow label="Go to Github" placement="top">
              <Link href={url}>
                <HStack>
                  <div> 🚀 </div>
                  <chakra.span fontSize="sm" noOfLines={1} fontWeight="600">
                    {title}
                  </chakra.span>
                </HStack>
              </Link>
            </Tooltip>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Box w="100%">
              <Flex gap="1" mb="4" wrap="wrap">
                {techStack.map((item) => (
                  <Tag key={item.id} size="sm" colorScheme="cyan">
                    <Text fontSize={["0.85rem", "1em"]}>{item.name}</Text>
                  </Tag>
                ))}
              </Flex>
              <Text align="justify" fontSize=".9em" noOfLines={[0, 2, 4]}>
                {description}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pt="4">
            <Tooltip hasArrow label="Preview Demo" placement="right">
              <Link href={live} isExternal>
                <Button>
                  <FiEye />
                </Button>
              </Link>
            </Tooltip>
            {url !== "#" && (
              <Tooltip hasArrow label="Preview Source Code" placement="left">
                <Link href={url} isExternal>
                  <Button>
                    <FiGithub />
                  </Button>
                </Link>
              </Tooltip>
            )}
          </Flex>
        </Flex>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered allowPinchZoom>
        <ModalOverlay />
        <ModalContent bg="none" maxW="28rem" w="auto">
          <ModalBody p={0} rounded="lg" overflow="hidden" bg="none">
            <Center>
              <Image src={cover} rounded="lg" alt="Repo image" />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RepositoryCard;
