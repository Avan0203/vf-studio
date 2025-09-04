import { IElement } from "../types";
import { ElementID } from "./ElementID";


class ElementManager {
    private elements: Map<number, IElement>
    constructor() {
        this.elements = new Map();
    }

    addElement(element: IElement) {
        this.elements.set(element.id.valueOf(), element);
    }

    getElementById(id: ElementID): IElement | null {
        return this.elements.get(id.valueOf()) || null;
    }

    deleteElementById(id: ElementID) {
        this.elements.delete(id.valueOf());
    }

    getElementParent(id: ElementID): IElement | null {
        const element = this.getElementById(id);
        if (element) {
            return this.getElementById(element._parent);
        }
        return null;
    }

    getElementChildren(id: ElementID): Array<IElement> {
        const element = this.getElementById(id);
        const result = []
        if (element) {
            for (const child of element._children) {
                const childElement = this.getElementById(child);
                if (childElement) {
                    result.push(childElement);
                }
            }
        }
        return result;
    }

    traverse(id: ElementID, callback: (element: IElement) => void) {
        const element = this.getElementById(id);
        if (element) {
            callback(element);
            for (const child of element._children) {
                this.traverse(child, callback);
            }
        }
    }

    getAllElements(id: ElementID): IElement[] {
        const result: IElement[] = [];
        this.traverse(id, (element) => {
            result.push(element);
        })
        return result;
    }
}

export { ElementManager } 