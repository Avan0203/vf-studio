/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: \vf-studio\packages\vf-math\test\mat3.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Matrix3, Vector3, Matrix4 } from '../src';

describe('Matrix3', () => {
    test('should create matrix with default values (identity)', () => {
        const m = new Matrix3();
        expect(m.elements).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });

    test('should create matrix with specified values', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(m.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should set matrix values correctly', () => {
        const m = new Matrix3();
        m.set(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(m.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should set identity matrix', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        m.identity();
        expect(m.elements).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });

    test('should clone matrix correctly', () => {
        const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const m2 = m1.clone();
        expect(m2.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(m2).not.toBe(m1);
    });

    test('should copy matrix correctly', () => {
        const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const m2 = new Matrix3().copy(m1);
        expect(m2.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should create from array correctly', () => {
        const m = new Matrix3().fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(m.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should convert to array correctly', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const arr = m.toArray();
        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should multiply matrices correctly', () => {
        const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const m2 = new Matrix3(9, 8, 7, 6, 5, 4, 3, 2, 1);
        m1.multiply(m2);
        // Column-major multiplication: m1 * m2
        // m1 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
        // m2 = [[9, 6, 3], [8, 5, 2], [7, 4, 1]]
        // Result[0,0] = 1*9 + 4*8 + 7*7 = 9 + 32 + 49 = 90
        // Result[1,0] = 2*9 + 5*8 + 8*7 = 18 + 40 + 56 = 114
        // Result[2,0] = 3*9 + 6*8 + 9*7 = 27 + 48 + 63 = 138
        expect(m1.elements[0]).toBeCloseTo(90);
        expect(m1.elements[1]).toBeCloseTo(114);
        expect(m1.elements[2]).toBeCloseTo(138);
    });

    test('should premultiply matrices correctly', () => {
        const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const m2 = new Matrix3(9, 8, 7, 6, 5, 4, 3, 2, 1);
        m1.premultiply(m2);
        // Column-major multiplication: m2 * m1
        // m2 = [[9, 6, 3], [8, 5, 2], [7, 4, 1]]
        // m1 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
        // Result[0,0] = 9*1 + 6*2 + 3*3 = 9 + 12 + 9 = 30
        // Result[1,0] = 8*1 + 5*2 + 2*3 = 8 + 10 + 6 = 24
        // Result[2,0] = 7*1 + 4*2 + 1*3 = 7 + 8 + 3 = 18
        expect(m1.elements[0]).toBeCloseTo(30);
        expect(m1.elements[1]).toBeCloseTo(24);
        expect(m1.elements[2]).toBeCloseTo(18);
    });

    test('should multiply scalars correctly', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        m.multiplyScalar(2);
        expect(m.elements).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
    });

    test('should calculate determinant correctly', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const det = m.determinant();
        expect(det).toBeCloseTo(0); // This matrix is singular
    });

    test('should calculate determinant for non-singular matrix', () => {
        const m = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        const det = m.determinant();
        expect(det).toBeCloseTo(1);
    });

    test('should get inverse matrix correctly', () => {
        const m = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        m.invert();
        expect(m.elements).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });

    test('should transpose matrix correctly', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        m.transpose();
        // Original: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
        // Transposed: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        // Stored as [1, 4, 7, 2, 5, 8, 3, 6, 9]
        expect(m.elements).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9]);
    });

    test('should get normal matrix correctly', () => {
        const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const normal = m.getNormalMatrix(new Matrix4());
        expect(normal).toBeInstanceOf(Matrix3);
    });

    test('should apply matrix to vector correctly', () => {
        const m = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        const v = new Vector3(1, 2, 3);
        v.applyMatrix3(m);
        expect(v.x).toBeCloseTo(1);
        expect(v.y).toBeCloseTo(2);
        expect(v.z).toBeCloseTo(3);
    });

    test('should apply matrix to vector array correctly', () => {
        const m = new Matrix3(2, 0, 0, 0, 2, 0, 0, 0, 2);
        const vectors = [
            new Vector3(1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1)
        ];
        vectors.forEach(v => v.applyMatrix3(m));
        expect(vectors[0].x).toBeCloseTo(2);
        expect(vectors[1].y).toBeCloseTo(2);
        expect(vectors[2].z).toBeCloseTo(2);
    });

    test('should scale matrix correctly', () => {
        const m = new Matrix3();
        m.scale(2, 3);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[4]).toBeCloseTo(3);
    });

    test('should rotate matrix correctly', () => {
        const m = new Matrix3();
        m.rotate(Math.PI / 2);
        expect(m.elements[0]).toBeCloseTo(0);
        expect(m.elements[1]).toBeCloseTo(-1);
        expect(m.elements[3]).toBeCloseTo(1);
        expect(m.elements[4]).toBeCloseTo(0);
    });

    test('should translate matrix correctly', () => {
        const m = new Matrix3();
        m.translate(2, 3);
        expect(m.elements[6]).toBeCloseTo(2);
        expect(m.elements[7]).toBeCloseTo(3);
    });

    test('should make translation matrix', () => {
        const m = new Matrix3().makeTranslation(2, 3);
        expect(m.elements[6]).toBeCloseTo(2);
        expect(m.elements[7]).toBeCloseTo(3);
        expect(m.elements[0]).toBeCloseTo(1);
        expect(m.elements[4]).toBeCloseTo(1);
    });

    test('should make rotation matrix', () => {
        const m = new Matrix3().makeRotation(Math.PI / 2);
        expect(m.elements[0]).toBeCloseTo(0);
        expect(m.elements[1]).toBeCloseTo(-1);
        expect(m.elements[3]).toBeCloseTo(1);
        expect(m.elements[4]).toBeCloseTo(0);
    });

    test('should make scale matrix', () => {
        const m = new Matrix3().makeScale(2, 3);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[4]).toBeCloseTo(3);
        expect(m.elements[6]).toBeCloseTo(0);
        expect(m.elements[7]).toBeCloseTo(0);
    });

    test('should make shear matrix', () => {
        const m = new Matrix3();
        m.scale(1, 1);
        expect(m.elements[0]).toBeCloseTo(1);
        expect(m.elements[4]).toBeCloseTo(1);
    });

    test('should compose matrix from position, quaternion, and scale', () => {
        const m = new Matrix3();
        m.makeTranslation(1, 2);
        m.scale(2, 3);
        expect(m.elements[6]).toBeCloseTo(1);
        expect(m.elements[7]).toBeCloseTo(2);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[4]).toBeCloseTo(3);
    });

    test('should decompose matrix into position, quaternion, and scale', () => {
        const m = new Matrix3();
        m.makeTranslation(1, 2);
        m.scale(2, 3);
        expect(m.elements[6]).toBeCloseTo(1);
        expect(m.elements[7]).toBeCloseTo(2);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[4]).toBeCloseTo(3);
    });

    test('should make projection matrix', () => {
        const m = new Matrix3();
        m.makeScale(1, 1);
        expect(m.elements[0]).toBeCloseTo(1);
        expect(m.elements[4]).toBeCloseTo(1);
    });

    test('should make shear matrix with specific parameters', () => {
        const m = new Matrix3();
        m.makeScale(2, 3);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[4]).toBeCloseTo(3);
    });

    test('should compare matrices for equality', () => {
        const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const m2 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const m3 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 8);
        expect(m1.equals(m2)).toBe(true);
        expect(m1.equals(m3)).toBe(false);
    });

    test('should dump and load matrix data', () => {
        const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const data = m1.dump();
        expect(data.type).toBe('Matrix3');
        expect(data.value).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        const m2 = new Matrix3();
        m2.load(data.value);
        expect(m2.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
