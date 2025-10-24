/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-03 17:24:23
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 09:30:13
 * @FilePath: \vf-studio\packages\vf-core\src\element\GraphicElement.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Element } from './Element';
import { GGroup } from '../nodes';

/**
 * 脏标记枚举 - 使用位运算
 */
export enum DirtyFlags {
    NONE = 0,
    GEOMETRY = 1 << 0,  // 几何参数变化
    STYLE = 1 << 1,     // 样式变化  
    TRANSFORM = 1 << 2  // 变换矩阵变化
}

class GraphicElement extends Element {
    protected visible = true;
    private gnode: GGroup = new GGroup();
    private _dirtyFlags = DirtyFlags.NONE;

    constructor(document: any) {
        super(document);
        this._setupTransformListeners();
    }

    /**
     * 设置变换监听器
     */
    private _setupTransformListeners(): void {
        // 监听rotation变化（Euler有onChange）
        this.gnode.rotation.onChange(() => {
            this.markTransformDirty();
        });

        // 监听quaternion变化
        this.gnode.quaternion.onChange(() => {
            this.markTransformDirty();
        });

        // 注意：position和scale是Vector3，没有onChange机制
        // 需要在外部手动调用markTransformDirty()或使用Proxy包装
    }

    setVisible(visible: boolean) {
        this.visible = visible;
    }
    
    isVisible(): boolean {
        return this.visible;
    }

    isGraphical(): boolean {
        return true;
    }

    getGNode(): GGroup {
        return this.gnode;
    }

    /**
     * 转换为RenderNode
     * 子类需要实现具体的转换逻辑
     */
    toRenderNode(): GGroup {
        // 如果变换脏，更新矩阵
        if (this.hasDirty(DirtyFlags.TRANSFORM)) {
            this.gnode.updateMatrix();
            this.clearDirty(DirtyFlags.TRANSFORM);
        }
        
        // 如果几何脏，需要重新编译几何体（子类实现）
        if (this.hasDirty(DirtyFlags.GEOMETRY)) {
            this.compileGeometry();
            this.clearDirty(DirtyFlags.GEOMETRY);
        }
        
        // 如果样式脏，需要更新样式（子类实现）
        if (this.hasDirty(DirtyFlags.STYLE)) {
            this.updateStyle();
            this.clearDirty(DirtyFlags.STYLE);
        }
        
        return this.gnode;
    }

    /**
     * 编译几何体 - 子类需要实现
     */
    protected compileGeometry(): void {
        // 子类实现具体的几何体编译逻辑
    }

    /**
     * 更新样式 - 子类需要实现
     */
    protected updateStyle(): void {
        // 子类实现具体的样式更新逻辑
    }

    /**
     * 标记脏状态
     * @param flags 脏标记（支持位运算组合）
     */
    markDirty(flags: DirtyFlags): void {
        this._dirtyFlags |= flags;
        this.needsUpdate = true;
    }

    /**
     * 清除脏标记
     * @param flags 要清除的脏标记
     */
    clearDirty(flags: DirtyFlags = DirtyFlags.NONE): void {
        if (flags === DirtyFlags.NONE) {
            this._dirtyFlags = DirtyFlags.NONE;
        } else {
            this._dirtyFlags &= ~flags;
        }
        // 如果所有脏标记都被清除，也清除needsUpdate
        if (this._dirtyFlags === DirtyFlags.NONE) {
            this.needsUpdate = false;
        }
    }

    /**
     * 检查是否有指定的脏标记
     * @param flags 要检查的脏标记
     */
    hasDirty(flags: DirtyFlags): boolean {
        return (this._dirtyFlags & flags) !== 0;
    }

    /**
     * 获取当前脏标记
     */
    getDirtyFlags(): DirtyFlags {
        return this._dirtyFlags;
    }


    /**
     * 便捷方法：标记几何脏
     */
    markGeometryDirty(): void {
        this.markDirty(DirtyFlags.GEOMETRY);
    }

    /**
     * 便捷方法：标记样式脏
     */
    markStyleDirty(): void {
        this.markDirty(DirtyFlags.STYLE);
    }

    /**
     * 便捷方法：标记变换脏
     */
    markTransformDirty(): void {
        this.markDirty(DirtyFlags.TRANSFORM);
    }
}

export { GraphicElement }