import { GNode } from "./GNode";
import { GModelOptions, GNodeType } from "../types";

// Model typically holds data from loaders (e.g., glTF)
class GModel extends GNode<GModelOptions> {
    constructor(options: GModelOptions = {}) {
        super(GNodeType.Model, options);
    }
}

export { GModel }


