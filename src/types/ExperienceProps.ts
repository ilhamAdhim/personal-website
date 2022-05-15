import type { ReactElement } from "react";

export interface IJobDescProps {
  id: string;
  job: string;
}

export interface IExperienceProps {
  id: string;
  subDesc: string;
  description: IJobDescProps[];
  icon: ReactElement;
  pointTitle: string;
}

export interface ITimelineProps {
  title: string;
  subTitle?: string;
  pointCollection: IExperienceProps[];
}
