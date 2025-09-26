import { DOUBLE_PI } from "./Constant";
import { Tolerance } from "./Tolerance";

export class MathUtils {
    static radToDeg(rad: number) {
        return rad * 180 / Math.PI;
    }
    static degToRad(deg: number) {
        return deg * Math.PI / 180;
    }
    static randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static randomFloat(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    static randomBool() {
        return Math.random() < 0.5;
    }
    static randomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    /**
     * @description: 判断 a 是否等于 b
     * @param {number} a
     * @param {number} b
     * @param {number} eps 1e-6
     * @returns {boolean}
     */
    static equals(a: number, b: number, eps = Tolerance.CALCULATION_EPS) {
        return Math.abs(a - b) < eps;
    }

    /**
     * @description: 判断 a >= b
     * @param {number} a
     * @param {number} b
     * @param {number} eps 1e-6
     * @return {boolean}
     */
    static greaterEqual(a: number, b: number, eps = Tolerance.CALCULATION_EPS) {
        return a > b || MathUtils.equals(a, b, eps);
    }

    /**
     * @description: 判断 a > b
     * @param {number} a
     * @param {number} b
     * @param {number} eps 1e-6
     * @return {boolean}
     */
    static greaterThan(a: number, b: number, eps = Tolerance.CALCULATION_EPS) {
        return a > b && !MathUtils.equals(a, b, eps);
    }

    /**
     * @description: 判断 a <= b
     * @param {number} a
     * @param {number} b
     * @param {number} eps 1e-6
     * @return {boolean}
     */
    static lessEqual(a: number, b: number, eps = Tolerance.CALCULATION_EPS) {
        return a < b || MathUtils.equals(a, b, eps);
    }

    /**
     * @description: 判断 a < b
     * @param {number} a
     * @param {number} b
     * @param {number} eps 1e-6
     * @return {boolean}
     */
    static lessThan(a: number, b: number, eps = Tolerance.CALCULATION_EPS) {
        return a < b && !MathUtils.equals(a, b, eps);
    }

    /**
 * @description: 线性插值，用于在两个值之间平滑过渡
 * @param {number} x - 起始值 
 * @param {number} y - 结束值
 * @param {number} a - 插值系数 取值范围通常是 [0, 1]，用于控制从 x 到 y 的过渡
 * @return {number}
 */
    static mix(x: number, y: number, a: number) {
        return (1 - a) * x + a * y;
    }

    /**
     * @description:  将 value 限制在 [minVal, maxVal] 范围内
     * @param {number} value
     * @param {number} minVal
     * @param {number} maxVal
     * @return {number}
     */
    static clamp(value: number, minVal: number, maxVal: number) {
        return Math.max(minVal, Math.min(maxVal, value));
    }

    /**
     * @description: 如果 x < edge，返回 0，否则返回 1
     * @param {number} edge 边缘值
     * @param {number} value 检测值
     * @return {number}
     */
    static step(edge: number, value: number) {
        return value < edge ? 0 : 1;
    }

/**
 * @description: 在 edge0 和 edge1 之间进行平滑插值，返回 0 到 1 的值。
 * @param {number} edge0 
 * @param {number} edge1
 * @param {number} value
 * @return {number}
 */
    static smoothstep(edge0: number, edge1: number, x: number) {
        let t = MathUtils.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        return t * t * (3.0 - 2.0 * t);
    }

/**
 * @description: 返回浮点数的小数部分
 * @param {number} x
 * @return {number}
 */
    static fract(x: number) {
        return x - Math.floor(x);
    }

/**
 * @description: 返回一个值的符号，-1 表示负，1 表示正，0 表示零
 * @param {number} x
 * @return {number}
 */
    static sign(x: number) {
        if (x > 0) return 1;
        else if (x < 0) return -1;
        else return 0;
    }

    /**
     * @description: 将角度归一化到指定范围内
     * @param {number} angle 要归一化的角度
     * @param {number} period 周期，默认为 2π
     * @return {number} 归一化后的角度
     */
    static normalizeAngle(angle: number, period: number = DOUBLE_PI): number {
        return angle - Math.floor(angle / period) * period;
    }
}