export interface subJobType {
    spans: string;
    desc: string;
    originalDesc:string;
    icon: string;
}


export interface ShowcaseObj {
    image: string;
    title: string;
    desc: string;
    details: ShowcaseDetailObj;
}

export interface ShowcaseDetailObj {
    desc: string;
    showcase: URLObj;
    frameworks: Array<string>;
    images: Array<string>;
    client: ClientObj;
}

export interface URLObj {
    title: string;
    url: string;
}

export interface ClientObj {
    name: string;
    image: string;
}

export interface scrambledTextAnimationObj{
    interval: any;
    idx: number;
}