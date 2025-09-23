/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 16:24:24
 * @FilePath: \vf-studio\packages\vf-engine\src\geometry\VirtualGeometryFactory.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { VirtualGeometry } from "./VirtualGeometry";
import { VirtualBox } from "./VirtualBox";
import { VirtualSphere } from "./VirtualSphere";
import { VirtualCylinder } from "./VirtualCylinder";
import { VirtualTorus } from "./VirtualTorus";
import { VirtualCone } from "./VirtualCone";
import { VirtualPlane } from "./VirtualPlane";
import { VirtualGeometryType } from "../types";

// 几何体创建参数联合类型
export type GeometryCreateParams = 
    | { type: VirtualGeometryType.BOX; params: import("./VirtualBox").BoxParams }
    | { type: VirtualGeometryType.SPHERE; params: import("./VirtualSphere").SphereParams }
    | { type: VirtualGeometryType.CYLINDER; params: import("./VirtualCylinder").CylinderParams }
    | { type: VirtualGeometryType.TORUS; params: import("./VirtualTorus").TorusParams }
    | { type: VirtualGeometryType.CONE; params: import("./VirtualCone").ConeParams }
    | { type: VirtualGeometryType.PLANE; params: import("./VirtualPlane").PlaneParams };

// 虚拟几何体工厂类
export class VirtualGeometryFactory {
    private static instance: VirtualGeometryFactory;
    
    public static getInstance(): VirtualGeometryFactory {
        if (!VirtualGeometryFactory.instance) {
            VirtualGeometryFactory.instance = new VirtualGeometryFactory();
        }
        return VirtualGeometryFactory.instance;
    }
    
    private constructor() {}
    
    /**
     * 创建虚拟几何体
     */
    public create(params: GeometryCreateParams): VirtualGeometry {
        switch (params.type) {
            case VirtualGeometryType.BOX:
                return new VirtualBox(params.params);
            case VirtualGeometryType.SPHERE:
                return new VirtualSphere(params.params);
            case VirtualGeometryType.CYLINDER:
                return new VirtualCylinder(params.params);
            case VirtualGeometryType.TORUS:
                return new VirtualTorus(params.params);
            case VirtualGeometryType.CONE:
                return new VirtualCone(params.params);
            case VirtualGeometryType.PLANE:
                return new VirtualPlane(params.params);
            default:
                throw new Error(`Unsupported geometry type: ${(params as any).type}`);
        }
    }
    
    public getSupportedTypes(): VirtualGeometryType[] {
        return [
            VirtualGeometryType.BOX,
            VirtualGeometryType.SPHERE,
            VirtualGeometryType.CYLINDER,
            VirtualGeometryType.TORUS,
            VirtualGeometryType.CONE,
            VirtualGeometryType.PLANE
        ];
    }
    
    /**
     * 检查几何体类型是否受支持
     */
    public isTypeSupported(type: VirtualGeometryType): boolean {
        return this.getSupportedTypes().includes(type);
    }
}
