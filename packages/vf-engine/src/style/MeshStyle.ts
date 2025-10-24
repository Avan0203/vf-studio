/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\style\MeshStyle.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Style, StyleType } from './Style';

type MaterialType = 'basic' | 'phong' | 'lambert' | 'standard' | 'normal' | 'depth';
type SideType = 'front' | 'back' | 'double';

class MeshStyle extends Style {
    // 基础属性
    color: number | string = 0xffffff;
    wireframe: boolean = false;
    side: SideType = 'front';
    type: MaterialType = 'standard';
    
    // PBR 属性
    metalness?: number = 0.5;
    roughness?: number = 0.5;
    
    // 其他属性
    transparent?: boolean = false;
    depthTest?: boolean = true;
    depthWrite?: boolean = true;
    
    getType(): StyleType {
        return StyleType.MESH;
    }
}

export { MeshStyle, MaterialType, SideType };
