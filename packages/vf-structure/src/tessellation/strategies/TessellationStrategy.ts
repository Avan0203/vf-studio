/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 16:00:00
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\strategies\TessellationStrategy.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Surface } from '@vf/math';
import { TessellationParams, SurfaceMeshData } from '../types/TessellationParams';

/**
 * 曲面细分策略接口
 */
export interface TessellationStrategy {
    /**
     * 细分曲面
     * @param surface 曲面对象
     * @param params 细分参数
     * @returns 网格数据
     */
    tessellate(surface: Surface, params: TessellationParams): SurfaceMeshData;
    
    /**
     * 检查是否支持该曲面类型
     * @param surface 曲面对象
     * @returns 是否支持
     */
    supports(surface: Surface): boolean;
}
