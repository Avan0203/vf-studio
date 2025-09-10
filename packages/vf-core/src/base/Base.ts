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
        return this
    }
    
    clone(): IBase {
        return new (this.constructor as { new(...args: any[]):any })().copy(this);
    }
}

export { Base }
