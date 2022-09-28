import type { JSXElementConstructor, ReactElement } from "react";

export interface IJobDescProps {
  id: string;
  job: string;
}

export interface IExperienceProps {
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  id: string;
  subDesc: string;
  description: IJobDescProps[];
  pointTitle: string;
}

export interface ITimelineProps {
  title: string;
  subTitle?: string;
  pointCollection: IExperienceProps[];
}
