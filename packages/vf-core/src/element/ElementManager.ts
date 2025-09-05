/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-04 10:32:12
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 14:53:56
 * @FilePath: \vf-studio\packages\vf-core\src\element\ElementManager.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { IElement, ElementClass } from "../types";
import { ElementID } from "./ElementID";


class ElementManager {
    private elements: Map<number, IElement>
    private elementClasses: WeakMap<ElementClass<IElement>, Set<ElementID>>
    constructor() {
        this.elements = new Map();
        this.elementClasses = new WeakMap();
    }

    addElement(element: IElement) {
        this.elements.set(element.id.valueOf(), element);
        const cls = element.constructor as ElementClass<IElement>;
        if (!this.elementClasses.has(cls)) {
            this.elementClasses.set(cls, new Set());
        }
        this.elementClasses.get(cls)!.add(element.id);
    }

    getElementById(id: ElementID): IElement | null {
        return this.elements.get(id.valueOf()) || null;
    }

    deleteElementById(id: ElementID) {
        this.elements.delete(id.valueOf());
    }

    getElementsByIds(ids: ElementID[]): Array<IElement> {
        const result = []
        for (const child of ids) {
            const childElement = this.getElementById(child);
            childElement && result.push(childElement);
        }
        return result;
    }

    traverse(id: ElementID, callback: (element: IElement) => void) {
        const element = this.getElementById(id);
        if (element) {
            callback(element);
            for (const child of element.getChildren()) {
                this.traverse(child.id, callback);
            }
        }
    }

    getAllElements(id: ElementID): IElement[] {
        let result: IElement[] = [];
        this.traverse(id, (element) => {
            result.push(element);
        })
        result = result.slice(1)
        return result;
    }

    getElementsByClass<T extends IElement>(cls: ElementClass<T>): T[] {
        const result: T[] = [];
        const ids = this.elementClasses.get(cls);
        if (ids) {
            for (const id of ids) {
                const element = this.getElementById(id);
                if (element) {
                    result.push(element as T);
                }
            }
        }
        return result;
    }
}

export { ElementManager } 