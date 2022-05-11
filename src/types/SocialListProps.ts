import { PlacementWithLogical } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface ISocialIconsProps {
    icon: ReactNode;
    name: string;
    url?: string;
    description: string;
    email?: string;
  }

  export interface ITooltipSocialContentProps {
    name: string;
    url?: string;
    description: string;
    icon: ReactNode;
    email?: string;
  }

  export interface ITooltipPlacementProps {
    placementCaption?: PlacementWithLogical;
  }

  