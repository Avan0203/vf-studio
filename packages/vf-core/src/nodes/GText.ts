import { GNode } from "./GNode";
import { GNodeType, GTextOptions } from "../types";

class GText extends GNode<GTextOptions> {
    constructor(options: GTextOptions = {}) {
        super(GNodeType.Text, options);
    }
}

export { GText }


