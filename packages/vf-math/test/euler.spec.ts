/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 11:42:02
 * @FilePath: \vf-studio\packages\vf-math\test\euler.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Euler, Quaternion, Matrix4, Vector3, EulerOrder } from '../src';

describe('Euler', () => {
    test('should create euler with default values', () => {
        const e = new Euler();
        expect(e.x).toBe(0);
        expect(e.y).toBe(0);
        expect(e.z).toBe(0);
        expect(e.order).toBe(EulerOrder.XYZ);
    });

    test('should create euler with specified values', () => {
        const e = new Euler(1, 2, 3, EulerOrder.YXZ);
        expect(e.x).toBe(1);
        expect(e.y).toBe(2);
        expect(e.z).toBe(3);
        expect(e.order).toBe(EulerOrder.YXZ);
    });

    test('should set euler values correctly', () => {
        const e = new Euler();
        e.set(1, 2, 3, EulerOrder.ZXY);
        expect(e.x).toBe(1);
        expect(e.y).toBe(2);
        expect(e.z).toBe(3);
        expect(e.order).toBe(EulerOrder.ZXY);
    });

    test('should clone euler correctly', () => {
        const e1 = new Euler(1, 2, 3, EulerOrder.YXZ);
        const e2 = e1.clone();
        expect(e2.x).toBe(1);
        expect(e2.y).toBe(2);
        expect(e2.z).toBe(3);
        expect(e2.order).toBe(EulerOrder.YXZ);
        expect(e2).not.toBe(e1);
    });

    test('should copy euler correctly', () => {
        const e1 = new Euler(1, 2, 3, EulerOrder.YXZ);
        const e2 = new Euler().copy(e1);
        expect(e2.x).toBe(1);
        expect(e2.y).toBe(2);
        expect(e2.z).toBe(3);
        expect(e2.order).toBe(EulerOrder.YXZ);
    });

    test('should set euler from quaternion', () => {
        const q = new Quaternion();
        q.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);
        const e = new Euler();
        e.setFromQuaternion(q, EulerOrder.XYZ);
        expect(e.x).toBeCloseTo(Math.PI / 2);
        expect(e.y).toBeCloseTo(0);
        expect(e.z).toBeCloseTo(0);
    });

    test('should set euler from rotation matrix', () => {
        const matrix = new Matrix4();
        matrix.makeRotationX(Math.PI / 2);
        const e = new Euler();
        e.setFromRotationMatrix(matrix, EulerOrder.XYZ);
        expect(e.x).toBeCloseTo(Math.PI / 2);
        expect(e.y).toBeCloseTo(0);
        expect(e.z).toBeCloseTo(0);
    });

    test('should set euler from vector', () => {
        const e = new Euler();
        e.setFromVector3(new Vector3(1, 2, 3), EulerOrder.XYZ);
        expect(e.x).toBe(1);
        expect(e.y).toBe(2);
        expect(e.z).toBe(3);
    });

    test('should reorder euler angles', () => {
        const e = new Euler(Math.PI / 4, Math.PI / 6, Math.PI / 3, EulerOrder.XYZ);
        e.order = EulerOrder.ZYX;
        expect(e.order).toBe(EulerOrder.ZYX);
        // The values should be recalculated based on the new order
        expect(e.x).toBeCloseTo(Math.PI / 4);
        expect(e.y).toBeCloseTo(Math.PI / 6);
        expect(e.z).toBeCloseTo(Math.PI / 3);
    });

    test('should set euler from array', () => {
        const e = new Euler();
        e.fromArray([1, 2, 3, EulerOrder.ZXY]);
        expect(e.x).toBe(1);
        expect(e.y).toBe(2);
        expect(e.z).toBe(3);
        expect(e.order).toBe(EulerOrder.ZXY);
    });

    test('should convert euler to array', () => {
        const e = new Euler(1, 2, 3, EulerOrder.ZXY);
        const array = e.toArray();
        expect(array).toEqual([1, 2, 3, EulerOrder.ZXY]);
    });

    test('should set euler from array with offset', () => {
        const e = new Euler();
        const array = [0, 0, 1, 2, 3, EulerOrder.ZXY, 0, 0];
        e.fromArray(array.slice(2));
        expect(e.x).toBe(1);
        expect(e.y).toBe(2);
        expect(e.z).toBe(3);
        expect(e.order).toBe(EulerOrder.ZXY);
    });

    test('should convert euler to array with offset', () => {
        const e = new Euler(1, 2, 3, EulerOrder.ZXY);
        const array = [0, 0, 0, 0, 0, 0, 0, 0];
        e.toArray(array, 2);
        expect(array).toEqual([0, 0, 1, 2, 3, EulerOrder.ZXY, 0, 0]);
    });

    test('should compare eulers for equality', () => {
        const e1 = new Euler(1, 2, 3, EulerOrder.XYZ);
        const e2 = new Euler(1, 2, 3, EulerOrder.XYZ);
        const e3 = new Euler(1, 2, 4, EulerOrder.XYZ);
        const e4 = new Euler(1, 2, 3, EulerOrder.YXZ);
        expect(e1.equals(e2)).toBe(true);
        expect(e1.equals(e3)).toBe(false);
        expect(e1.equals(e4)).toBe(false);
    });

    test('should handle different rotation orders', () => {
        const e1 = new Euler(Math.PI / 4, Math.PI / 6, Math.PI / 3, EulerOrder.XYZ);
        const e2 = new Euler(Math.PI / 4, Math.PI / 6, Math.PI / 3, EulerOrder.YXZ);
        const e3 = new Euler(Math.PI / 4, Math.PI / 6, Math.PI / 3, EulerOrder.ZXY);
        
        // Different orders should produce different results when converted to quaternion
        const q1 = new Quaternion().setFromEuler(e1);
        const q2 = new Quaternion().setFromEuler(e2);
        const q3 = new Quaternion().setFromEuler(e3);
        
        expect(q1.equals(q2)).toBe(false);
        expect(q1.equals(q3)).toBe(false);
        expect(q2.equals(q3)).toBe(false);
    });

    test('should handle gimbal lock', () => {
        const e = new Euler(0, Math.PI / 2, 0, EulerOrder.XYZ);
        const q = new Quaternion().setFromEuler(e);
        // Should still produce a valid quaternion
        expect(q.getSquareLength()).toBeCloseTo(1);
    });

    test('should dump and load euler data', () => {
        const e1 = new Euler(1, 2, 3, EulerOrder.ZXY);
        const data = e1.dump();
        expect(data.type).toBe('Euler');
        expect(data.value.x).toBe(1);
        expect(data.value.y).toBe(2);
        expect(data.value.z).toBe(3);
        expect(data.value.order).toBe(EulerOrder.ZXY);

        const e2 = new Euler();
        e2.load(data.value);
        expect(e2.x).toBe(1);
        expect(e2.y).toBe(2);
        expect(e2.z).toBe(3);
        expect(e2.order).toBe(EulerOrder.ZXY);
    });

    test('should maintain consistency between euler and quaternion', () => {
        const e = new Euler(Math.PI / 4, Math.PI / 6, Math.PI / 3, EulerOrder.XYZ);
        const q = new Quaternion().setFromEuler(e);
        const e2 = new Euler();
        e2.setFromQuaternion(q, EulerOrder.XYZ);
        
        // Should be approximately equal (allowing for floating point precision)
        expect(Math.abs(e.x - e2.x)).toBeLessThan(1e-10);
        expect(Math.abs(e.y - e2.y)).toBeLessThan(1e-10);
        expect(Math.abs(e.z - e2.z)).toBeLessThan(1e-10);
    });

    test('should handle onChange callback', () => {
        let callbackCalled = false;
        const e = new Euler();
        e.onChange(() => {
            callbackCalled = true;
        });
        e.set(1, 2, 3);
        expect(callbackCalled).toBe(true);
    });

    test('should handle all rotation orders', () => {
        const orders = [
            EulerOrder.XYZ,
            EulerOrder.XZY,
            EulerOrder.YXZ,
            EulerOrder.YZX,
            EulerOrder.ZXY,
            EulerOrder.ZYX
        ];
        
        orders.forEach(order => {
            const e = new Euler(Math.PI / 4, Math.PI / 6, Math.PI / 3, order);
            expect(e.order).toBe(order);
            
            // Should be able to convert to quaternion and back
            const q = new Quaternion().setFromEuler(e);
            const e2 = new Euler().setFromQuaternion(q, order);
            expect(e.equals(e2)).toBe(true);
        });
    });
});
