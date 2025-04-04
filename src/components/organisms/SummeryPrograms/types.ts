import { ReactNode } from "react";

export interface ProgramTag {
    icon: JSX.Element | ReactNode |null;
    text: string;
    className: string;
}

export interface ProgramType {
    ageGroup: string;
    backgroundClass: string;
    textColorClass: string;
    schedule: string[];
    gameInfo: string;
    tag: ProgramTag;
    imageSrc: string;
}