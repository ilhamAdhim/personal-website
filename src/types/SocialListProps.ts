import type { PlacementWithLogical } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface ISocialIconsProps {
  id: number;
  icon?: ReactNode;
  name?: string;
  url?: string;
  description?: string;
  email?: string;
  type: string;
}

export interface ITooltipPlacementProps {
  placementCaption?: PlacementWithLogical;
}
