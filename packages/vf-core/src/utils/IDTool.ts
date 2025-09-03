/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:20:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-03 17:05:08
 * @FilePath: \vf-studio\packages\vf-core\src\utils\IDTool.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
const _usedIds = new Set<number>();
const _recycledIds: number[] = [];

export class IDTool {
    public static INVALID = -1;
    private static _nextId = 0;

    static get(): number {
        let id = IDTool.INVALID;
        if (_recycledIds.length > 0) {
            id = _recycledIds.pop()!;
        } else {
            id = IDTool._nextId++;
        }

        _usedIds.add(id);
        return id;
    }

    /**
     * 释放一个ID，将其放回回收池
     * @param id 要释放的ID
     */
    release(id: number): boolean {
        // 检查ID是否在使用中
        if (_usedIds.has(id)) {
            _usedIds.delete(id);
            // 将ID添加到回收池
            _recycledIds.push(id);
            return true;
        }
        // ID不在使用中，返回false表示释放失败
        return false;
    }

}