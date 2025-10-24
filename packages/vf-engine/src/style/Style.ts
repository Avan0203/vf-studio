/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\style\Style.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

enum StyleType {
    MESH = 'mesh',
    POINT = 'point',
    LINE = 'line'
}

abstract class Style {
    abstract getType(): StyleType;
    
    // 通用属性
    opacity: number = 1.0;
    visible: boolean = true;
}

export { Style, StyleType };
