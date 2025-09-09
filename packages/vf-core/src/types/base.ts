import { ObjectID } from "../base";

interface IBase {
    readonly id: ObjectID;
    name: string;
    readonly type: string;
    copy(source: this): this;
    clone(): IBase;
}

export { IBase, ObjectID }