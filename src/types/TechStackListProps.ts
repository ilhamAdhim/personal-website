import { ReactNode } from "react";

export interface IPopoverTechStackProps {
    description?: string
    type : string
    overview? : string
}

export interface ITechStackProps  {
    icon: ReactNode;
    color: string;
    description: string;
    type : string
    descWithLink : string
    nextDesc : string
    link: string
  }
  