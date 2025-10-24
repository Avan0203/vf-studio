/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\style\LineStyle.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Style, StyleType } from './Style';

class LineStyle extends Style {
    color: number | string = 0xffffff;
    linewidth: number = 1.0;
    dashed: boolean = false;
    dashSize?: number = 3;
    gapSize?: number = 1;
    
    getType(): StyleType {
        return StyleType.LINE;
    }
}

export { LineStyle };
