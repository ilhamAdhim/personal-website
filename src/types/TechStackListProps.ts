import type { ReactNode } from "react";

export interface ITechStackProps {
  id: number;
  icon: ReactNode;
  color: string;
  description: string;
  descWithLink: string;
  nextDesc: string;
  link: string;
  hideInSmallView?: boolean;
}
