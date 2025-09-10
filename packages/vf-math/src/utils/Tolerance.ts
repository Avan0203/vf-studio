/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-08-20 17:20:26
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-08-20 17:36:42
 * @FilePath: \vf-studio\packages\vf-math\src\base\Tolerance.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
export class Tolerance {
    static LENGTH_EPS = 1e-6;
    static ANGLE_EPS = 1e-5;
    static CALCULATION_EPS = 1e-6;

    public lengthEps: number;
    public angleEps: number;
    public calculationEps: number;

    constructor(lengthEps = 1e-5, angleEps = 1e-5, calculationEps = 1e-6) {
        this.lengthEps = lengthEps || Tolerance.LENGTH_EPS;
        this.angleEps = angleEps || Tolerance.ANGLE_EPS;
        this.calculationEps = calculationEps || Tolerance.CALCULATION_EPS;
    }
}