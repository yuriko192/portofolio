export interface subJobType {
    spans: string;
    desc: string;
    originalDesc:string;
    icon: string;
}


export interface ProjectObj {
    image: string;
    title: string;
    desc: string;
    details: ProjectDetailObj;
}

export interface ProjectDetailObj {
    desc: string;
    frameworks: Array<string>;
    images: Array<string>;
    client: ClientObj;

}

export interface ClientObj {
    name: string;
    image: string;
}

export interface scrambledTextAnimationObj{
    interval: any;
    idx: number;
}