/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\style\PointStyle.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Style, StyleType } from './Style';

class PointStyle extends Style {
    color: number | string = 0xffffff;
    size: number = 1.0;
    sizeAttenuation: boolean = true;
    
    getType(): StyleType {
        return StyleType.POINT;
    }
}

export { PointStyle };
