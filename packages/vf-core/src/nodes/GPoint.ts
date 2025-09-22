import { GNode } from "./GNode";
import { GNodeType, GPointOptions } from "../types";

class GPoint extends GNode<GPointOptions> {
    constructor(options: GPointOptions = {}) {
        super(GNodeType.Point, options);
    }
}

export { GPoint }


