import { PlacementWithLogical } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface ISocialIconsProps {
    icon?: ReactNode;
    name?: string;
    url?: string;
    description?: string;
    email?: string;
    type : string
  }

  export interface ITooltipPlacementProps {
    placementCaption?: PlacementWithLogical;
  }

  