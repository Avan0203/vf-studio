/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:20:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-04 16:47:25
 * @FilePath: \vf-studio\packages\vf-core\src\utils\ElementID.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

const _usedIds = new Map<number, ElementID>();
const _recycledIds: ElementID[] = [];

class ElementID {
    public static readonly INVALID: ElementID = new ElementID(-1);
    private static index = 0;
    private _id: number;
    public static generate(): ElementID {
        if (_recycledIds.length > 0) {
            return _recycledIds.pop()!;
        } else {
            return new ElementID(ElementID.index++);
        }
    }

    private constructor(id: number) {
        this._id = id;
        _usedIds.set(this._id, this);
    }

    /**
     * 释放一个ID，将其放回回收池
     * @param id 要释放的ID
     */
    public release(): boolean {
        // 检查ID是否在使用中
        if (_usedIds.has(this._id)) {
            _usedIds.delete(this._id);
            // 将ID添加到回收池
            _recycledIds.push(this);
            return true;
        }
        // ID不在使用中，返回false表示释放失败
        return false;
    }

    /**
     * 检查ID是否有效
     * @param id 要检查的ID
     * @returns 如果ID有效则返回true，否则返回false
     */
    public isValid(): boolean {
        return this._id !== ElementID.INVALID._id;
    }

    /**
     * 获取ID的数值表示
     * @returns ID的数值表示
     */
    public valueOf(): number {
        return this._id;
    }
}

export { ElementID }
