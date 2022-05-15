import { Text, useColorModeValue } from "@chakra-ui/react";

interface IHeaderAccentProps {
  text: string;
  withUnderline?: boolean;
}

const HeadingAccent = ({ text, ...props }: IHeaderAccentProps) => {
  const color = useColorModeValue("teal.600", "teal.400");
  const bgColor = useColorModeValue("teal.200", "teal.600");
  return (
    <Text
      as="span"
      fontSize="3xl"
      fontWeight="bold"
      position="relative"
      color={color}
      _after={
        props?.withUnderline
          ? {
              content: "''",
              width: "full",
              height: "25%",
              position: "absolute",
              bottom: 1,
              left: props?.withUnderline ? 0 : 2,
              bg: bgColor,
              zIndex: -1,
            }
          : {}
      }
    >
      {` ${text}`}
    </Text>
  );
};

export default HeadingAccent;
