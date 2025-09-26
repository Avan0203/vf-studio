/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 11:36:03
 * @FilePath: \vf-studio\packages\vf-math\test\quaternion.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Quaternion, Vector3, Matrix4, Euler, EulerOrder } from '../src';

describe('Quaternion', () => {
    test('should create quaternion with default values', () => {
        const q = new Quaternion();
        expect(q.x).toBe(0);
        expect(q.y).toBe(0);
        expect(q.z).toBe(0);
        expect(q.w).toBe(1);
    });

    test('should create quaternion with specified values', () => {
        const q = new Quaternion(1, 2, 3, 4);
        expect(q.x).toBe(1);
        expect(q.y).toBe(2);
        expect(q.z).toBe(3);
        expect(q.w).toBe(4);
    });

    test('should set quaternion values correctly', () => {
        const q = new Quaternion();
        q.set(1, 2, 3, 4);
        expect(q.x).toBe(1);
        expect(q.y).toBe(2);
        expect(q.z).toBe(3);
        expect(q.w).toBe(4);
    });

    test('should set identity quaternion', () => {
        const q = new Quaternion(1, 2, 3, 4);
        q.identity();
        expect(q.x).toBe(0);
        expect(q.y).toBe(0);
        expect(q.z).toBe(0);
        expect(q.w).toBe(1);
    });

    test('should clone quaternion correctly', () => {
        const q1 = new Quaternion(1, 2, 3, 4);
        const q2 = q1.clone();
        expect(q2.x).toBe(1);
        expect(q2.y).toBe(2);
        expect(q2.z).toBe(3);
        expect(q2.w).toBe(4);
        expect(q2).not.toBe(q1);
    });

    test('should copy quaternion correctly', () => {
        const q1 = new Quaternion(1, 2, 3, 4);
        const q2 = new Quaternion().copy(q1);
        expect(q2.x).toBe(1);
        expect(q2.y).toBe(2);
        expect(q2.z).toBe(3);
        expect(q2.w).toBe(4);
    });

    test('should set quaternion from axis and angle', () => {
        const q = new Quaternion();
        const axis = new Vector3(1, 0, 0);
        q.setFromAxisAngle(axis, Math.PI / 2);
        expect(q.x).toBeCloseTo(0.7071);
        expect(q.y).toBeCloseTo(0);
        expect(q.z).toBeCloseTo(0);
        expect(q.w).toBeCloseTo(0.7071);
    });

    test('should set quaternion from rotation matrix', () => {
        const matrix = new Matrix4();
        matrix.makeRotationX(Math.PI / 2);
        const q = new Quaternion();
        q.setFromRotationMatrix(matrix);
        expect(q.x).toBeCloseTo(0.7071);
        expect(q.y).toBeCloseTo(0);
        expect(q.z).toBeCloseTo(0);
        expect(q.w).toBeCloseTo(0.7071);
    });

    test('should set quaternion from Euler angles', () => {
        const euler = new Euler(Math.PI / 2, 0, 0, EulerOrder.XYZ);
        const q = new Quaternion();
        q.setFromEuler(euler);
        expect(q.x).toBeCloseTo(0.7071);
        expect(q.y).toBeCloseTo(0);
        expect(q.z).toBeCloseTo(0);
        expect(q.w).toBeCloseTo(0.7071);
    });

    test('should set quaternion from vector to vector', () => {
        const q = new Quaternion();
        const vFrom = new Vector3(1, 0, 0);
        const vTo = new Vector3(0, 1, 0);
        q.setFromUnitVectors(vFrom, vTo);
        expect(q.x).toBeCloseTo(0);
        expect(q.y).toBeCloseTo(0);
        expect(q.z).toBeCloseTo(0.7071);
        expect(q.w).toBeCloseTo(0.7071);
    });

    test('should invert quaternion correctly', () => {
        const q = new Quaternion(1, 0, 0, 0);
        q.invert();
        expect(q.x).toBeCloseTo(-1);
        expect(q.y).toBeCloseTo(0);
        expect(q.z).toBeCloseTo(0);
        expect(q.w).toBeCloseTo(0);
    });

    test('should conjugate quaternion correctly', () => {
        const q = new Quaternion(1, 2, 3, 4);
        q.conjugate();
        expect(q.x).toBeCloseTo(-1);
        expect(q.y).toBeCloseTo(-2);
        expect(q.z).toBeCloseTo(-3);
        expect(q.w).toBeCloseTo(4);
    });

    test('should calculate dot product correctly', () => {
        const q1 = new Quaternion(1, 2, 3, 4);
        const q2 = new Quaternion(2, 3, 4, 5);
        const dot = q1.dot(q2);
        expect(dot).toBe(40); // 1*2 + 2*3 + 3*4 + 4*5
    });

    test('should calculate length correctly', () => {
        const q = new Quaternion(3, 4, 0, 0);
        const length = q.getLength();
        expect(length).toBeCloseTo(5);
    });

    test('should calculate squared length correctly', () => {
        const q = new Quaternion(3, 4, 0, 0);
        const lengthSq = q.getSquareLength();
        expect(lengthSq).toBe(25);
    });

    test('should normalize quaternion correctly', () => {
        const q = new Quaternion(3, 4, 0, 0);
        q.normalize();
        expect(q.getLength()).toBeCloseTo(1);
        expect(q.x).toBeCloseTo(0.6);
        expect(q.y).toBeCloseTo(0.8);
        expect(q.z).toBeCloseTo(0);
        expect(q.w).toBeCloseTo(0);
    });

    test('should multiply quaternions correctly', () => {
        const q1 = new Quaternion(1, 0, 0, 0);
        const q2 = new Quaternion(0, 1, 0, 0);
        q1.multiply(q2);
        expect(q1.x).toBeCloseTo(0);
        expect(q1.y).toBeCloseTo(0);
        expect(q1.z).toBeCloseTo(1);
        expect(q1.w).toBeCloseTo(0);
    });

    test('should premultiply quaternions correctly', () => {
        const q1 = new Quaternion(1, 0, 0, 0);
        const q2 = new Quaternion(0, 1, 0, 0);
        q1.premultiply(q2);
        expect(q1.x).toBeCloseTo(0);
        expect(q1.y).toBeCloseTo(0);
        expect(q1.z).toBeCloseTo(-1);
        expect(q1.w).toBeCloseTo(0);
    });

    test('should slerp quaternions correctly', () => {
        const q1 = new Quaternion(1, 0, 0, 0);
        const q2 = new Quaternion(0, 1, 0, 0);
        q1.slerp(q2, 0.5);
        expect(q1.getLength()).toBeCloseTo(1);
    });

    test('should apply quaternion to vector correctly', () => {
        const q = new Quaternion();
        const axis = new Vector3(0, 0, 1);
        q.setFromAxisAngle(axis, Math.PI / 2);
        const v = new Vector3(1, 0, 0);
        v.applyQuaternion(q);
        expect(v.x).toBeCloseTo(0);
        expect(v.y).toBeCloseTo(1);
        expect(v.z).toBeCloseTo(0);
    });

    test('should calculate angle between quaternions', () => {
        const q1 = new Quaternion(1, 0, 0, 0);
        const q2 = new Quaternion(0, 1, 0, 0);
        const angle = q1.angleTo(q2);
        expect(angle).toBeCloseTo(Math.PI);
    });

    test('should rotate towards target quaternion', () => {
        const q1 = new Quaternion(1, 0, 0, 0);
        const q2 = new Quaternion(0, 1, 0, 0);
        q1.rotateTowards(q2, Math.PI / 4);
        expect(q1.getLength()).toBeCloseTo(1);
    });

    test('should set quaternion from array', () => {
        const q = new Quaternion();
        q.fromArray([1, 2, 3, 4]);
        expect(q.x).toBe(1);
        expect(q.y).toBe(2);
        expect(q.z).toBe(3);
        expect(q.w).toBe(4);
    });

    test('should convert quaternion to array', () => {
        const q = new Quaternion(1, 2, 3, 4);
        const array = q.toArray();
        expect(array).toEqual([1, 2, 3, 4]);
    });

    test('should set quaternion from array with offset', () => {
        const q = new Quaternion();
        const array = [0, 0, 1, 2, 3, 4, 0, 0];
        q.fromArray(array, 2);
        expect(q.x).toBe(1);
        expect(q.y).toBe(2);
        expect(q.z).toBe(3);
        expect(q.w).toBe(4);
    });

    test('should convert quaternion to array with offset', () => {
        const q = new Quaternion(1, 2, 3, 4);
        const array = [0, 0, 0, 0, 0, 0, 0, 0];
        q.toArray(array, 2);
        expect(array).toEqual([0, 0, 1, 2, 3, 4, 0, 0]);
    });

    test('should compare quaternions for equality', () => {
        const q1 = new Quaternion(1, 2, 3, 4);
        const q2 = new Quaternion(1, 2, 3, 4);
        const q3 = new Quaternion(1, 2, 3, 5);
        expect(q1.equals(q2)).toBe(true);
        expect(q1.equals(q3)).toBe(false);
    });

    test('should check if quaternion is identity', () => {
        const q1 = new Quaternion(0, 0, 0, 1);
        const q2 = new Quaternion(1, 0, 0, 0);
        expect(q1.x).toBe(0);
        expect(q1.y).toBe(0);
        expect(q1.z).toBe(0);
        expect(q1.w).toBe(1);
        expect(q2.x).toBe(1);
        expect(q2.y).toBe(0);
        expect(q2.z).toBe(0);
        expect(q2.w).toBe(0);
    });

    test('should check if quaternion is normalized', () => {
        const q1 = new Quaternion(0, 0, 0, 1);
        const q2 = new Quaternion(1, 1, 1, 1);
        expect(q1.getLength()).toBeCloseTo(1);
        expect(q2.getLength()).toBeCloseTo(2);
    });

    test('should dump and load quaternion data', () => {
        const q1 = new Quaternion(1, 2, 3, 4);
        const data = q1.dump();
        expect(data.type).toBe('Quaternion');
        expect(data.value.x).toBe(1);
        expect(data.value.y).toBe(2);
        expect(data.value.z).toBe(3);
        expect(data.value.w).toBe(4);

        const q2 = new Quaternion();
        q2.load(data.value);
        expect(q2.x).toBe(1);
        expect(q2.y).toBe(2);
        expect(q2.z).toBe(3);
        expect(q2.w).toBe(4);
    });
});
