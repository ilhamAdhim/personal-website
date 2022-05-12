import { chakra, Text } from "@chakra-ui/react";
import { ISocialIconsProps } from "types/SocialListProps";

const TooltipContent = (param: ISocialIconsProps) => {
  return (
    <chakra.div
      _hover={{
        display: "block",
      }}
    >
      <Text as="div" align="center">
        {param.description}
        <Text as="span" align="justify" color="teal" textDecor={"underline"}>
          {/* {param.type === "social" ? ( */}
          <TooltipContentSocial {...param} />
          {/* ) } */}
        </Text>
      </Text>
    </chakra.div>
  );
};

export default TooltipContent;

// const TooltipContentTechStack = (param: IPopoverTechStackProps) => {
//   return <Box> Test </Box>;
// };

const TooltipContentSocial = (param: ISocialIconsProps) => {
  return (
    <>
      {""} {param.hasOwnProperty("email") ? param?.email : param?.name}
    </>
  );
};
