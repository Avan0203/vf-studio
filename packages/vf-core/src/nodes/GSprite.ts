import { GNode } from "./GNode";
import { GNodeType, GSpriteOptions } from "../types";

class GSprite extends GNode<GSpriteOptions> {
    constructor(options: GSpriteOptions = {}) {
        super(GNodeType.Sprite, options);
    }
}

export { GSprite }


