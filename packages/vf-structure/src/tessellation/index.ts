/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 16:44:53
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\index.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */


// 导出具体策略实现
export * from './strategies/DefaultTessellationStrategy';
export * from './strategies/ConeTessellationStrategy';
export * from './strategies/SphereTessellationStrategy';

// 导出主要细分器
export * from './SurfaceTessellator';
