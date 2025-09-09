import { IBase } from "../types";
import { ObjectID } from "./ObjectID";

class Base implements IBase {
    id = ObjectID.generate();
    name = '';
    readonly type: string;
    constructor() {
        this.type = (new.target as { new(...args: any[]): any; name: string }).name;
    }

    copy(source: this): this {
        throw new Error('copy not implemented');
    }
    clone(): IBase {
        throw new Error('clone not implemented');
    }
}

export { Base }
