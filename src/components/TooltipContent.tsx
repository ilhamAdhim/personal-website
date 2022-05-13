import { Text, chakra } from "@chakra-ui/react";

import type { ISocialIconsProps } from "types/SocialListProps";

const TooltipContentSocial = ({ email, name, ...param }: ISocialIconsProps) => {
  return (
    <chakra.span>{"email" in param ? ` ${email}` : ` ${name}`}</chakra.span>
  );
};

const TooltipContent = ({ description, ...param }: ISocialIconsProps) => {
  return (
    <chakra.div
      _hover={{
        display: "block",
      }}
    >
      <Text as="div" align="center">
        {description}
        <Text as="span" align="justify" color="teal" textDecor="underline">
          <TooltipContentSocial {...param} />
        </Text>
      </Text>
    </chakra.div>
  );
};

export default TooltipContent;

// const TooltipContentTechStack = (param: IPopoverTechStackProps) => {
//   return <Box> Test </Box>;
// };
