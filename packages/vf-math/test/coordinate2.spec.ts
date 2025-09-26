/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 10:40:49
 * @FilePath: \vf-studio\packages\vf-math\test\coordinate2.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Coordinate2, Matrix3 } from '../src';

describe('Coordinate2', () => {
    test('should create coordinate system with default values', () => {
        const cs = new Coordinate2();
        expect(cs.origin.x).toBe(0);
        expect(cs.origin.y).toBe(0);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
    });

    test('should create standard coordinate system', () => {
        const cs = Coordinate2.STANDARD();
        expect(cs.origin.x).toBe(0);
        expect(cs.origin.y).toBe(0);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
    });

    test('should create coordinate system from matrix', () => {
        const matrix = new Matrix3(
            0, -1, 0,
            1, 0, 0,
            2, 3, 1
        );
        const cs = Coordinate2.fromMatrix(matrix);
        expect(cs.origin.x).toBeCloseTo(2);
        expect(cs.origin.y).toBeCloseTo(3);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dy.x).toBeCloseTo(-1);
        expect(cs.dy.y).toBeCloseTo(0);
    });

    test('should copy coordinate system correctly', () => {
        const cs1 = new Coordinate2(
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const cs2 = new Coordinate2().copy(cs1);
        expect(cs2.origin.x).toBe(1);
        expect(cs2.origin.y).toBe(2);
        expect(cs2.dx.x).toBeCloseTo(1);
        expect(cs2.dx.y).toBeCloseTo(0);
        expect(cs2.dy.x).toBeCloseTo(0);
        expect(cs2.dy.y).toBeCloseTo(1);
    });

    test('should clone coordinate system correctly', () => {
        const cs1 = new Coordinate2(
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const cs2 = cs1.clone();
        expect(cs2.origin.x).toBe(1);
        expect(cs2.origin.y).toBe(2);
        expect(cs2).not.toBe(cs1);
    });

    test('should set coordinate system correctly', () => {
        const cs = new Coordinate2();
        cs.set(
            { x: 2, y: 3 },
            { x: 2, y: 0 },
            { x: 0, y: 2 }
        );
        expect(cs.origin.x).toBe(2);
        expect(cs.origin.y).toBe(3);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
    });

    test('should orthogonalize coordinate system', () => {
        const cs = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 } // Not orthogonal to dx
        );
        cs.orthogonalize();
        // dy should be perpendicular to dx
        expect(cs.dx.dot(cs.dy)).toBeCloseTo(0);
    });

    test('should check if coordinate system is left-handed', () => {
        const rightHanded = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const leftHanded = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 }
        );
        expect(rightHanded.isLeftHanded()).toBe(false);
        expect(leftHanded.isLeftHanded()).toBe(true);
    });

    test('should convert world to local coordinates', () => {
        const cs = new Coordinate2(
            { x: 2, y: 3 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const worldPoint = { x: 4, y: 5 };
        const localPoint = cs.worldToLocal(worldPoint);
        expect(localPoint.x).toBeCloseTo(2);
        expect(localPoint.y).toBeCloseTo(2);
    });

    test('should convert local to world coordinates', () => {
        const cs = new Coordinate2(
            { x: 2, y: 3 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const localPoint = { x: 2, y: 2 };
        const worldPoint = cs.localToWorld(localPoint);
        expect(worldPoint.x).toBeCloseTo(4);
        expect(worldPoint.y).toBeCloseTo(5);
    });

    test('should convert world vector to local coordinates', () => {
        const cs = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const worldVector = { x: 3, y: 4 };
        const localVector = cs.worldVectorToLocal(worldVector);
        expect(localVector.x).toBeCloseTo(3);
        expect(localVector.y).toBeCloseTo(4);
    });

    test('should convert local vector to world coordinates', () => {
        const cs = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const localVector = { x: 3, y: 4 };
        const worldVector = cs.localVectorToWorld(localVector);
        expect(worldVector.x).toBeCloseTo(3);
        expect(worldVector.y).toBeCloseTo(4);
    });

    test('should rotate coordinate system', () => {
        const cs = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        cs.rotate(Math.PI / 2);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dy.x).toBeCloseTo(-1);
        expect(cs.dy.y).toBeCloseTo(0);
    });

    test('should translate coordinate system', () => {
        const cs = new Coordinate2(
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        cs.translate({ x: 3, y: 4 });
        expect(cs.origin.x).toBeCloseTo(4);
        expect(cs.origin.y).toBeCloseTo(6);
    });

    test('should get transformation matrix', () => {
        const cs = new Coordinate2(
            { x: 2, y: 3 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const matrix = cs.getMatrix();
        expect(matrix.elements[6]).toBeCloseTo(2);
        expect(matrix.elements[7]).toBeCloseTo(3);
        expect(matrix.elements[0]).toBeCloseTo(1);
        expect(matrix.elements[1]).toBeCloseTo(0);
        expect(matrix.elements[3]).toBeCloseTo(0);
        expect(matrix.elements[4]).toBeCloseTo(1);
    });

    test('should set coordinate system from matrix', () => {
        const matrix = new Matrix3(
            0, -1, 0,
            1, 0, 0,
            2, 3, 1
        );
        const cs = new Coordinate2();
        cs.setFromMatrix(matrix);
        expect(cs.origin.x).toBeCloseTo(2);
        expect(cs.origin.y).toBeCloseTo(3);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dy.x).toBeCloseTo(-1);
        expect(cs.dy.y).toBeCloseTo(0);
    });

    test('should compare coordinate systems for equality', () => {
        const cs1 = new Coordinate2(
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const cs2 = new Coordinate2(
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const cs3 = new Coordinate2(
            { x: 2, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        expect(cs1.equals(cs2)).toBe(true);
        expect(cs1.equals(cs3)).toBe(false);
    });

    test('should get coordinate system angle', () => {
        const cs = new Coordinate2(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        expect(cs.getAngle()).toBeCloseTo(0);

        cs.rotate(Math.PI / 4);
        expect(cs.getAngle()).toBeCloseTo(Math.PI / 4);
    });

    test('should set coordinate system angle', () => {
        const cs = new Coordinate2();
        cs.setAngle(Math.PI / 2);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dy.x).toBeCloseTo(-1);
        expect(cs.dy.y).toBeCloseTo(0);
    });

    test('should dump and load coordinate system data', () => {
        const cs1 = new Coordinate2(
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        );
        const data = cs1.dump();
        expect(data.type).toBe('Coordinate2');
        expect(data.value.origin.x).toBe(1);
        expect(data.value.origin.y).toBe(2);
        expect(data.value.dx.x).toBeCloseTo(1);
        expect(data.value.dx.y).toBeCloseTo(0);
        expect(data.value.dy.x).toBeCloseTo(0);
        expect(data.value.dy.y).toBeCloseTo(1);

        const cs2 = new Coordinate2();
        cs2.load(data.value);
        expect(cs2.origin.x).toBe(1);
        expect(cs2.origin.y).toBe(2);
        expect(cs2.dx.x).toBeCloseTo(1);
        expect(cs2.dx.y).toBeCloseTo(0);
        expect(cs2.dy.x).toBeCloseTo(0);
        expect(cs2.dy.y).toBeCloseTo(1);
    });
});
