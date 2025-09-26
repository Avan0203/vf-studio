/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 10:48:57
 * @FilePath: \vf-studio\packages\vf-math\test\mat4.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Matrix4, Vector3, Quaternion } from '../src';

describe('Matrix4', () => {
    test('should create matrix with default values (identity)', () => {
        const m = new Matrix4();
        const expected = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        expect(m.elements).toEqual(expected);
    });

    test('should create matrix with specified values', () => {
        const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        expect(m.elements).toEqual(expected);
    });

    test('should set matrix values correctly', () => {
        const m = new Matrix4();
        m.set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        expect(m.elements).toEqual(expected);
    });

    test('should set identity matrix', () => {
        const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        m.identity();
        const expected = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        expect(m.elements).toEqual(expected);
    });

    test('should clone matrix correctly', () => {
        const m1 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const m2 = m1.clone();
        expect(m2.elements).toEqual(m1.elements);
        expect(m2).not.toBe(m1);
    });

    test('should copy matrix correctly', () => {
        const m1 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const m2 = new Matrix4().copy(m1);
        expect(m2.elements).toEqual(m1.elements);
    });

    test('should create from array correctly', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        const m = new Matrix4().fromArray(array);
        expect(m.elements).toEqual(array);
    });

    test('should convert to array correctly', () => {
        const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const arr = m.toArray();
        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });

    test('should multiply matrices correctly', () => {
        const m1 = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const m2 = new Matrix4(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1);
        m1.multiply(m2);
        expect(m1.elements[0]).toBeCloseTo(2);
        expect(m1.elements[5]).toBeCloseTo(2);
        expect(m1.elements[10]).toBeCloseTo(2);
    });

    test('should premultiply matrices correctly', () => {
        const m1 = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const m2 = new Matrix4(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1);
        m1.premultiply(m2);
        expect(m1.elements[0]).toBeCloseTo(2);
        expect(m1.elements[5]).toBeCloseTo(2);
        expect(m1.elements[10]).toBeCloseTo(2);
    });

    test('should multiply scalars correctly', () => {
        const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        m.multiplyScalar(2);
        const expected = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
        expect(m.elements).toEqual(expected);
    });

    test('should calculate determinant correctly', () => {
        const m = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const det = m.determinant();
        expect(det).toBeCloseTo(1);
    });

    test('should get inverse matrix correctly', () => {
        const m = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const inverse = m.invert();
        expect(inverse.elements[0]).toBeCloseTo(1);
        expect(inverse.elements[5]).toBeCloseTo(1);
        expect(inverse.elements[10]).toBeCloseTo(1);
        expect(inverse.elements[15]).toBeCloseTo(1);
    });

    test('should transpose matrix correctly', () => {
        const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        m.transpose();
        const expected = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16];
        expect(m.elements).toEqual(expected);
    });

    test('should apply matrix to vector correctly', () => {
        const m = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const v = new Vector3(1, 2, 3);
        v.applyMatrix4(m);
        expect(v.x).toBeCloseTo(1);
        expect(v.y).toBeCloseTo(2);
        expect(v.z).toBeCloseTo(3);
    });

    test('should apply matrix to vector4 correctly', () => {
        const m = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        const v = new Vector3(1, 2, 3);
        v.applyMatrix4(m);
        expect(v.x).toBeCloseTo(1);
        expect(v.y).toBeCloseTo(2);
        expect(v.z).toBeCloseTo(3);
    });

    test('should apply matrix to vector array correctly', () => {
        const m = new Matrix4(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1);
        const vectors = [
            new Vector3(1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1)
        ];
        vectors.forEach(v => v.applyMatrix4(m));
        expect(vectors[0].x).toBeCloseTo(2);
        expect(vectors[1].y).toBeCloseTo(2);
        expect(vectors[2].z).toBeCloseTo(2);
    });

    test('should scale matrix correctly', () => {
        const m = new Matrix4();
        m.scale(2, 3, 4);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[5]).toBeCloseTo(3);
        expect(m.elements[10]).toBeCloseTo(4);
    });

    test('should rotate around X axis correctly', () => {
        const m = new Matrix4();
        m.makeRotationX(Math.PI / 2);
        expect(m.elements[5]).toBeCloseTo(0);
        expect(m.elements[6]).toBeCloseTo(1);
        expect(m.elements[9]).toBeCloseTo(-1);
        expect(m.elements[10]).toBeCloseTo(0);
    });

    test('should rotate around Y axis correctly', () => {
        const m = new Matrix4();
        m.makeRotationY(Math.PI / 2);
        expect(m.elements[0]).toBeCloseTo(0);
        expect(m.elements[2]).toBeCloseTo(-1);
        expect(m.elements[8]).toBeCloseTo(1);
        expect(m.elements[10]).toBeCloseTo(0);
    });

    test('should rotate around Z axis correctly', () => {
        const m = new Matrix4();
        m.makeRotationZ(Math.PI / 2);
        expect(m.elements[0]).toBeCloseTo(0);
        expect(m.elements[1]).toBeCloseTo(-1);
        expect(m.elements[4]).toBeCloseTo(1);
        expect(m.elements[5]).toBeCloseTo(0);
    });

    test('should translate matrix correctly', () => {
        const m = new Matrix4();
        m.makeTranslation(2, 3, 4);
        expect(m.elements[12]).toBeCloseTo(2);
        expect(m.elements[13]).toBeCloseTo(3);
        expect(m.elements[14]).toBeCloseTo(4);
    });

    test('should make translation matrix', () => {
        const m = new Matrix4().makeTranslation(2, 3, 4);
        expect(m.elements[12]).toBeCloseTo(2);
        expect(m.elements[13]).toBeCloseTo(3);
        expect(m.elements[14]).toBeCloseTo(4);
        expect(m.elements[0]).toBeCloseTo(1);
        expect(m.elements[5]).toBeCloseTo(1);
        expect(m.elements[10]).toBeCloseTo(1);
    });

    test('should make rotation matrix around X axis', () => {
        const m = new Matrix4().makeRotationX(Math.PI / 2);
        expect(m.elements[5]).toBeCloseTo(0);
        expect(m.elements[6]).toBeCloseTo(1);
        expect(m.elements[9]).toBeCloseTo(-1);
        expect(m.elements[10]).toBeCloseTo(0);
    });

    test('should make rotation matrix around Y axis', () => {
        const m = new Matrix4().makeRotationY(Math.PI / 2);
        expect(m.elements[0]).toBeCloseTo(0);
        expect(m.elements[2]).toBeCloseTo(-1);
        expect(m.elements[8]).toBeCloseTo(1);
        expect(m.elements[10]).toBeCloseTo(0);
    });

    test('should make rotation matrix around Z axis', () => {
        const m = new Matrix4().makeRotationZ(Math.PI / 2);
        expect(m.elements[0]).toBeCloseTo(0);
        expect(m.elements[1]).toBeCloseTo(-1);
        expect(m.elements[4]).toBeCloseTo(1);
        expect(m.elements[5]).toBeCloseTo(0);
    });

    test('should make scale matrix', () => {
        const m = new Matrix4().makeScale(2, 3, 4);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[5]).toBeCloseTo(3);
        expect(m.elements[10]).toBeCloseTo(4);
        expect(m.elements[12]).toBeCloseTo(0);
        expect(m.elements[13]).toBeCloseTo(0);
        expect(m.elements[14]).toBeCloseTo(0);
    });

    test('should make shear matrix', () => {
        const m = new Matrix4().makeShear(2, 3, 4, 5, 6, 7);
        expect(m.elements[1]).toBeCloseTo(2);
        expect(m.elements[2]).toBeCloseTo(3);
        expect(m.elements[4]).toBeCloseTo(4);
        expect(m.elements[6]).toBeCloseTo(5);
        expect(m.elements[8]).toBeCloseTo(6);
        expect(m.elements[9]).toBeCloseTo(7);
    });

    test('should compose matrix from position, quaternion, and scale', () => {
        const m = new Matrix4();
        const position = new Vector3(1, 2, 3);
        const quaternion = new Quaternion(0, 0, 0, 1);
        const scale = new Vector3(2, 3, 4);
        m.compose(position, quaternion, scale);
        expect(m.elements[12]).toBeCloseTo(1);
        expect(m.elements[13]).toBeCloseTo(2);
        expect(m.elements[14]).toBeCloseTo(3);
        expect(m.elements[0]).toBeCloseTo(2);
        expect(m.elements[5]).toBeCloseTo(3);
        expect(m.elements[10]).toBeCloseTo(4);
    });

    test('should decompose matrix into position, quaternion, and scale', () => {
        const m = new Matrix4();
        m.makeTranslation(1, 2, 3);
        m.scale(2, 3, 4);
        const position = new Vector3();
        const quaternion = new Quaternion();
        const scale = new Vector3();
        m.decompose(position, quaternion, scale);
        expect(position.x).toBeCloseTo(1);
        expect(position.y).toBeCloseTo(2);
        expect(position.z).toBeCloseTo(3);
        expect(scale.x).toBeCloseTo(2);
        expect(scale.y).toBeCloseTo(3);
        expect(scale.z).toBeCloseTo(4);
    });

    test('should make projection matrix', () => {
        const m = new Matrix4().makePerspective(-1, 1, -1, 1, 0.1, 100);
        expect(m.elements[0]).toBeCloseTo(0.1);
        expect(m.elements[5]).toBeCloseTo(0.1);
        expect(m.elements[10]).toBeCloseTo(-1.002);
        expect(m.elements[11]).toBeCloseTo(-1);
        expect(m.elements[14]).toBeCloseTo(-0.2002);
    });

    test('should make orthographic projection matrix', () => {
        const m = new Matrix4().makeOrthographic(-1, 1, -1, 1, 0.1, 100);
        expect(m.elements[0]).toBeCloseTo(1);
        expect(m.elements[5]).toBeCloseTo(1);
        expect(m.elements[10]).toBeCloseTo(-0.02002);
        expect(m.elements[11]).toBeCloseTo(0);
        expect(m.elements[14]).toBeCloseTo(-1.002);
    });

    test('should make look at matrix', () => {
        const m = new Matrix4().lookAt(
            new Vector3(0, 0, 5),
            new Vector3(0, 0, 0),
            new Vector3(0, 1, 0)
        );
        expect(m.elements[0]).toBeCloseTo(1);
        expect(m.elements[5]).toBeCloseTo(1);
        expect(m.elements[10]).toBeCloseTo(1);
        expect(m.elements[12]).toBeCloseTo(0);
        expect(m.elements[13]).toBeCloseTo(0);
        expect(m.elements[14]).toBeCloseTo(-5);
    });

    test('should make perspective matrix', () => {
        const m = new Matrix4().makePerspective(-1, 1, -1, 1, 0.1, 100);
        expect(m.elements[0]).toBeCloseTo(0.1);
        expect(m.elements[5]).toBeCloseTo(0.1);
        expect(m.elements[10]).toBeCloseTo(-1.002);
        expect(m.elements[11]).toBeCloseTo(-1);
        expect(m.elements[14]).toBeCloseTo(-0.2002);
    });

    test('should make frustum matrix', () => {
        const m = new Matrix4().makePerspective(-1, 1, -1, 1, 0.1, 100);
        expect(m.elements[0]).toBeCloseTo(0.1);
        expect(m.elements[5]).toBeCloseTo(0.1);
        expect(m.elements[10]).toBeCloseTo(-1.002);
        expect(m.elements[11]).toBeCloseTo(-1);
        expect(m.elements[14]).toBeCloseTo(-0.2002);
    });

    test('should make shear matrix with specific parameters', () => {
        const m = new Matrix4().makeShear(2, 3, 4, 5, 6, 7);
        expect(m.elements[1]).toBeCloseTo(2);
        expect(m.elements[2]).toBeCloseTo(3);
        expect(m.elements[4]).toBeCloseTo(4);
        expect(m.elements[6]).toBeCloseTo(5);
        expect(m.elements[8]).toBeCloseTo(6);
        expect(m.elements[9]).toBeCloseTo(7);
    });

    test('should compare matrices for equality', () => {
        const m1 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const m2 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const m3 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15);
        expect(m1.equals(m2)).toBe(true);
        expect(m1.equals(m3)).toBe(false);
    });

    test('should dump and load matrix data', () => {
        const m1 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        const data = m1.dump();
        expect(data.type).toBe('Matrix4');
        expect(data.value).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

        const m2 = new Matrix4();
        m2.load(data.value);
        expect(m2.elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });
});
