import * as React from "react";
import {
  chakra,
  Box,
  Image,
  useColorModeValue,
  VStack,
  Text,
  AspectRatio,
  HStack,
  Tag,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Center,
  Flex,
  Tooltip,
  Link,
  Button,
} from "@chakra-ui/react";
import { FiCheckCircle, FiEye, FiGithub } from "react-icons/fi";
import LazyImage from "./LazyImage";

interface RepositoryCardProps {
  title: string;
  description: string;
  cover: string;
  techStack: string[];
  url: string;
  live: string;
}

const RepositoryCard = (props: RepositoryCardProps) => {
  const { title, cover, techStack, url, live, description } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  return (
    <Box
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
        _hover={{
          shadow: "lg",
          textDecoration: "none",
        }}
        overflow="hidden"
        align="start"
        spacing={0}
      >
        <Box position="relative" w="100%" onClick={handleClick}>
          <AspectRatio
            ratio={1.85 / 1}
            w="100%"
            borderBottomWidth="1px"
            borderColor={useColorModeValue("gray.100", "gray.700")}
          >
            <LazyImage src={cover} />
          </AspectRatio>
        </Box>

        <VStack
          py={2}
          px={[2, 4]}
          spacing={1}
          align="start"
          w="100%"
          p="4"
          h={["unset", "230", "230", "230", "unset"]}
        >
          <Flex justifyContent="space-between" width="100%">
            <Tooltip hasArrow label="Github link" placement="top">
              <Link href={url}>
                <HStack>
                  <Icon as={FiCheckCircle} />
                  <chakra.span fontSize="sm" noOfLines={1} fontWeight="600">
                    {title}
                  </chakra.span>
                </HStack>
              </Link>
            </Tooltip>
            {/* <Flex alignItems="center" gap="2">
              <Icon as={AiOutlineStar} boxSize="0.9em" mt="1px" />
              <Box as="span" ml="1" fontSize="sm">
                {stargazers_count}
              </Box>
            </Flex> */}
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Box w="100%">
              <Flex gap="1" mb="4" wrap={"wrap"}>
                {techStack!.map((tech, index) => (
                  <Tag key={index} size="sm" colorScheme="cyan">
                    <Text fontSize={["0.85rem", "1em"]}>{tech}</Text>
                  </Tag>
                ))}
              </Flex>
              <Text align="justify" fontSize={".9em"}>
                {description}{" "}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pt="4">
            <Tooltip hasArrow label="Preview Demo">
              <Link href={live} isExternal>
                <Button>
                  <FiEye />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip hasArrow label="Preview Source Code">
              <Link href={url} isExternal>
                <Button>
                  <FiGithub />
                </Button>
              </Link>
            </Tooltip>
          </Flex>
        </VStack>
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
