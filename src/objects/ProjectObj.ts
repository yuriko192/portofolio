import {ClientObj} from "./ClientObj";

export class ProjectObj {
    image: string;
    title: string;
    desc: string;
    details: ProjectDetailObj;

    constructor() {
        this.details = new ProjectDetailObj();
    }
}

export class ProjectDetailObj {
    desc: string;
    frameworks: Array<string>;
    images: Array<string>;
    client: ClientObj;

    constructor() {
        this.frameworks = [];
        this.images = [];
        this.client = new ClientObj();
    }

}
