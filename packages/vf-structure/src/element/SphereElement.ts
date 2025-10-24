/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-16 10:59:31
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-16 11:28:36
 * @FilePath: \vf-studio\packages\vf-structure\src\element\SphereElement.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GraphicElement, DirtyFlags, GMesh } from "@vf/core";
import { SphereParams, VirtualSphere } from "../virtual";
import { SurfaceTessellator } from "../tessellation/SurfaceTessellator";
import { SphereSurface } from "@vf/math";
import { Vector3 } from "@vf/math";

class SphereElement extends GraphicElement {
    private virtual = new VirtualSphere({ radius: 5 }); // 设置默认半径
    private tessellator = new SurfaceTessellator();
    private meshNode: GMesh | null = null;

    setParameters(params: Partial<SphereParams>): void {
        this.virtual.setParameters(params);
        // 几何参数变化，标记几何脏
        this.markGeometryDirty();
        
        // 立即更新几何体
        this._updateGeometry();
        this.clearDirty(DirtyFlags.GEOMETRY);
    }

    toRenderNode() { 
        // 调用父类处理变换脏标记
        const gnode = super.toRenderNode();
        
        // 如果几何脏，重新细分
        if (this.hasDirty(DirtyFlags.GEOMETRY)) {
            this._updateGeometry();
            this.clearDirty(DirtyFlags.GEOMETRY);
        }
        
        return gnode;
    }

    /**
     * 更新几何体
     */
    private _updateGeometry(): void {
        // 1. 创建 SphereSurface
        const surface = new SphereSurface(new Vector3(0, 0, 0), this.virtual.radius);
        
        // 2. 细分生成网格数据
        const meshData = this.tessellator.tessellateSphere(surface, 32, 32, false);
        
        // 3. 更新 GMesh
        if (!this.meshNode) {
            this.meshNode = new GMesh({
                vertices: meshData.positions,
                indices: meshData.indices,
                normals: meshData.normals,
                uvs: meshData.uvs
            });
            this.getGNode().add(this.meshNode);
        } else {
            this.meshNode.setOptions({
                vertices: meshData.positions,
                indices: meshData.indices,
                normals: meshData.normals,
                uvs: meshData.uvs
            });
        }
    }
}

export { SphereElement };