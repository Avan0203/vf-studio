/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-08-25 14:50:07
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-08-25 16:17:20
 * @FilePath: \vf-studio\packages\vf-math\src\base\Matrix2.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { MathUtils, Tolerance } from "../utils";
import { AbstractMathObject, DumpResult } from "./AbstractMathObject";

class Matrix2 extends AbstractMathObject<number[]> {
    public elements = new Array(4);
    constructor(n1 = 1, n2 = 0, n3 = 0, n4 = 1) {
        super();
        this.set(n1, n2, n3, n4);
    }

    set(n1 = 1, n2 = 0, n3 = 0, n4 = 1) {
        this.elements = [n1, n2, n3, n4];
        return this;
    }

    identity() {
        this.set(
            1, 0,
            0, 1
        );
        return this;
    }

    clone() {
        return new Matrix2(...this.elements);
    }

    copy(m: Matrix2) {
        const t = this.elements;
        const e = m.elements;
        t[0] = e[0];
        t[1] = e[1];
        t[2] = e[2];
        t[3] = e[3];
        return this;
    }

    fromArray(array: number[], offset = 0) {
        this.set(
            array[offset], array[offset + 1],
            array[offset + 2], array[offset + 3]
        );
        return this;
    }

    toArray(target = [], offset = 0): number[] {
        const t = this.elements;
        target[offset] = t[0];
        target[offset + 1] = t[1];
        target[offset + 2] = t[2];
        target[offset + 3] = t[3];
        return target;
    }

    load(array: number[]): this {
        return this.fromArray(array);
    }

    dump(): DumpResult<number[]> {
        return {
            type: 'Matrix2',
            value: [...this.elements],
        }
    }

    equals(m: Matrix2, eps = Tolerance.LENGTH_EPS): boolean {
        const te = this.elements;
        const me = m.elements;
        for (let i = 0; i < 4; i++) {
            if (MathUtils.equals(te[i], me[i]), eps) return false;
        }
        return true;
    }

    add(m: Matrix2) {
        const t = this.elements;
        const e = m.elements;
        t[0] += e[0];
        t[1] += e[1];
        t[2] += e[2];
        t[3] += e[3];
        return this;
    }

    sub(m: Matrix2) {
        const t = this.elements;
        const e = m.elements;
        t[0] -= e[0];
        t[1] -= e[1];
        t[2] -= e[2];
        t[3] -= e[3];
        return this;
    }

    multiply(m: Matrix2): this {
        return this.multiplyMatrices(this, m);
    }

    premultiply(m: Matrix2): this {
        return this.multiplyMatrices(m, this);
    }

    multiplyMatrices(m1: Matrix2, m2: Matrix2): this {
        const a = m1.elements;
        const b = m2.elements;
        const ae0 = a[0], ae1 = a[1], ae2 = a[2], ae3 = a[3];
        const be0 = b[0], be1 = b[1], be2 = b[2], be3 = b[3];

        // 列主序存储
        const c0 = ae0 * be0 + ae2 * be1; // m11
        const c1 = ae1 * be0 + ae3 * be1; // m21
        const c2 = ae0 * be2 + ae2 * be3; // m12
        const c3 = ae1 * be2 + ae3 * be3; // m22

        return this.set(c0, c1, c2, c3);
    }

    multiplyScalar(v: number): this {
        const t = this.elements;
        t[0] *= v;
        t[1] *= v;
        t[2] *= v;
        t[3] *= v;
        return this;
    }

    determinant(): number {
        const e = this.elements;
        return e[0] * e[3] - e[2] * e[1];
    }

    // 转置
    transpose(): this {
        const e = this.elements;
        let tmp = e[1];
        e[1] = e[2];
        e[2] = tmp;
        return this;
    }

    // 逆矩阵
    invert(): this {
        const e = this.elements;
        const det = this.determinant();

        if (det === 0) {
            console.warn("Matrix2: can't invert, determinant is 0");
            return this;
        }

        const n11 = e[0], n21 = e[1], n12 = e[2], n22 = e[3];

        this.set(
            n22 / det, -n12 / det,
            -n21 / det, n11 / det
        );

        return this;
    }
}

export { Matrix2 };
