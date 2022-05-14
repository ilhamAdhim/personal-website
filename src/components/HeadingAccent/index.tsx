import { chakra, Text, useColorModeValue } from "@chakra-ui/react";

interface IHeaderAccentProps {
  text: string;
}

const HeadingAccent: React.FC<IHeaderAccentProps> = ({ text, ...props }) => {
  return (
    <chakra.div>
      <Text
        color={useColorModeValue("teal.600", "teal.400")}
        fontSize="3xl"
        fontWeight="bold"
      >
        {text}
      </Text>
    </chakra.div>
  );
};

export default HeadingAccent;
