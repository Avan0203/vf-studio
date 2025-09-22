import { GNode } from "./GNode";
import { GNodeType } from "../types";

class GMesh<T extends object = any> extends GNode<T> {
    constructor(options: T = {} as T) {
        super(GNodeType.Mesh, options);
    }
}

export { GMesh }


