/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-22 11:11:31
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 16:23:08
 * @FilePath: \vf-studio\packages\vf-core\src\document\ChangeCache.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { CacheType, IElement } from "../types";

class ChangeCache {
    private cache: { [key in CacheType]: Set<number> };
    constructor() {
        this.cache = {
            [CacheType.ADD]: new Set(),
            [CacheType.REMOVE]: new Set(),
            [CacheType.UPDATE]: new Set(),
        }
    }

    clear() {
        Object.values(this.cache).forEach(set => set.clear());
    }

    addCache(type: CacheType, elements: IElement[]) {
        const { add, remove, update } = this.getCache();

        if (type === CacheType.REMOVE) {
            elements.forEach((element) => {
                const id = element.id.valueOf();
                add.delete(id);
                update.delete(id);
                remove.add(id);
            })
        } else if (type === CacheType.UPDATE) {
            elements.forEach((element) => {
                const id = element.id.valueOf();
                if (remove.has(id)) {
                    return
                }
                add.delete(id);
                update.add(id);
            })
        } else if (type === CacheType.ADD) {
            elements.forEach((element) => {
                const id = element.id.valueOf();
                if (update.has(id) || remove.has(id)) {
                    return
                }
                add.add(id);
            })
        }

    }

    getCache() {
        return {
            add: this.cache[CacheType.ADD],
            remove: this.cache[CacheType.REMOVE],
            update: this.cache[CacheType.UPDATE],
        }
    }
}

export { ChangeCache }