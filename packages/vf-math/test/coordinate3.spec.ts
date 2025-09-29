/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 11:11:50
 * @FilePath: \vf-studio\packages\vf-math\test\coordinate3.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Coordinate3, Vector3, Matrix4, Quaternion } from '../src';

describe('Coordinate3', () => {
    test('should create coordinate system with default values', () => {
        const cs = new Coordinate3();
        expect(cs.origin.x).toBe(0);
        expect(cs.origin.y).toBe(0);
        expect(cs.origin.z).toBe(0);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dx.z).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
        expect(cs.dy.z).toBeCloseTo(0);
        expect(cs.dz.x).toBeCloseTo(0);
        expect(cs.dz.y).toBeCloseTo(0);
        expect(cs.dz.z).toBeCloseTo(1);
    });

    test('should create standard coordinate system', () => {
        const cs = Coordinate3.STANDARD();
        expect(cs.origin.x).toBe(0);
        expect(cs.origin.y).toBe(0);
        expect(cs.origin.z).toBe(0);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dx.z).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
        expect(cs.dy.z).toBeCloseTo(0);
        expect(cs.dz.x).toBeCloseTo(0);
        expect(cs.dz.y).toBeCloseTo(0);
        expect(cs.dz.z).toBeCloseTo(1);
    });

    test('should create coordinate system from matrix', () => {
        const matrix = new Matrix4(
            0, 0, 1, 0,
            1, 0, 0, 0,
            0, 1, 0, 0,
            2, 3, 4, 1
        );
        const cs = Coordinate3.fromMatrix(matrix);
        expect(cs.origin.x).toBeCloseTo(2);
        expect(cs.origin.y).toBeCloseTo(3);
        expect(cs.origin.z).toBeCloseTo(4);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dx.z).toBeCloseTo(0);
    });

    test('should create coordinate system from quaternion', () => {
        const origin = new Vector3(1, 2, 3);
        const axis = new Vector3(0, 0, 1);
        const quaternion = new Quaternion().setFromAxisAngle(axis, Math.PI / 2);
        const cs = Coordinate3.fromQuaternion(origin, quaternion);
        expect(cs.origin.x).toBe(1);
        expect(cs.origin.y).toBe(2);
        expect(cs.origin.z).toBe(3);
    });

    test('should copy coordinate system correctly', () => {
        const cs1 = new Coordinate3(
            { x: 1, y: 2, z: 3 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const cs2 = new Coordinate3().copy(cs1);
        expect(cs2.origin.x).toBe(1);
        expect(cs2.origin.y).toBe(2);
        expect(cs2.origin.z).toBe(3);
        expect(cs2.dx.x).toBeCloseTo(1);
        expect(cs2.dx.y).toBeCloseTo(0);
        expect(cs2.dx.z).toBeCloseTo(0);
    });

    test('should clone coordinate system correctly', () => {
        const cs1 = new Coordinate3(
            { x: 1, y: 2, z: 3 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const cs2 = cs1.clone();
        expect(cs2.origin.x).toBe(1);
        expect(cs2.origin.y).toBe(2);
        expect(cs2.origin.z).toBe(3);
        expect(cs2).not.toBe(cs1);
    });

    test('should set coordinate system correctly', () => {
        const cs = new Coordinate3();
        cs.set(
            { x: 2, y: 3, z: 4 },
            { x: 2, y: 0, z: 0 },
            { x: 0, y: 2, z: 0 }
        );
        expect(cs.origin.x).toBe(2);
        expect(cs.origin.y).toBe(3);
        expect(cs.origin.z).toBe(4);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dx.z).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
        expect(cs.dy.z).toBeCloseTo(0);
    });

    test('should orthogonalize coordinate system', () => {
        const cs = new Coordinate3(
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 1, y: 1, z: 0 } // Not orthogonal to dx
        );
        cs.orthogonalize();
        // All axes should be perpendicular to each other
        expect(cs.dx.dot(cs.dy)).toBeCloseTo(0);
        expect(cs.dx.dot(cs.dz)).toBeCloseTo(0);
        expect(cs.dy.dot(cs.dz)).toBeCloseTo(0);
    });

    test('should check if coordinate system is left-handed', () => {
        const rightHanded = new Coordinate3(
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const leftHanded = new Coordinate3(
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: -1, z: 0 }
        );
        expect(rightHanded.isLeftHanded()).toBe(false);
        expect(leftHanded.isLeftHanded()).toBe(true);
    });

    test('should convert world to local coordinates', () => {
        const cs = new Coordinate3(
            { x: 2, y: 3, z: 4 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const worldPoint = { x: 4, y: 5, z: 6 };
        const localPoint = cs.worldToLocal(worldPoint);
        expect(localPoint.x).toBeCloseTo(2);
        expect(localPoint.y).toBeCloseTo(2);
        expect(localPoint.z).toBeCloseTo(2);
    });

    test('should convert local to world coordinates', () => {
        const cs = new Coordinate3(
            { x: 2, y: 3, z: 4 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const localPoint = { x: 2, y: 2, z: 2 };
        const worldPoint = cs.localToWorld(localPoint);
        expect(worldPoint.x).toBeCloseTo(4);
        expect(worldPoint.y).toBeCloseTo(5);
        expect(worldPoint.z).toBeCloseTo(6);
    });

    test('should convert world vector to local coordinates', () => {
        const cs = new Coordinate3(
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const worldVector = { x: 3, y: 4, z: 5 };
        const localVector = cs.worldVectorToLocal(worldVector);
        expect(localVector.x).toBeCloseTo(3);
        expect(localVector.y).toBeCloseTo(4);
        expect(localVector.z).toBeCloseTo(5);
    });

    test('should convert local vector to world coordinates', () => {
        const cs = new Coordinate3(
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const localVector = { x: 3, y: 4, z: 5 };
        const worldVector = cs.localVectorToWorld(localVector);
        expect(worldVector.x).toBeCloseTo(3);
        expect(worldVector.y).toBeCloseTo(4);
        expect(worldVector.z).toBeCloseTo(5);
    });

    test('should rotate around X axis', () => {
        const cs = new Coordinate3();
        cs.rotateX(Math.PI / 2);
        expect(cs.dx.x).toBeCloseTo(1);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dx.z).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(0);
        expect(cs.dy.z).toBeCloseTo(1);
        expect(cs.dz.x).toBeCloseTo(0);
        expect(cs.dz.y).toBeCloseTo(-1);
        expect(cs.dz.z).toBeCloseTo(0);
    });

    test('should rotate around Y axis', () => {
        const cs = new Coordinate3();
        cs.rotateY(Math.PI / 2);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(0);
        expect(cs.dx.z).toBeCloseTo(-1);
        expect(cs.dy.x).toBeCloseTo(0);
        expect(cs.dy.y).toBeCloseTo(1);
        expect(cs.dy.z).toBeCloseTo(0);
        expect(cs.dz.x).toBeCloseTo(1);
        expect(cs.dz.y).toBeCloseTo(0);
        expect(cs.dz.z).toBeCloseTo(0);
    });

    test('should rotate around Z axis', () => {
        const cs = new Coordinate3();
        cs.rotateZ(Math.PI / 2);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dx.z).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(-1);
        expect(cs.dy.y).toBeCloseTo(0);
        expect(cs.dy.z).toBeCloseTo(0);
        expect(cs.dz.x).toBeCloseTo(0);
        expect(cs.dz.y).toBeCloseTo(0);
        expect(cs.dz.z).toBeCloseTo(1);
    });

    test('should rotate by quaternion', () => {
        const cs = new Coordinate3();
        const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
        cs.rotateByQuaternion(quaternion);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dx.z).toBeCloseTo(0);
        expect(cs.dy.x).toBeCloseTo(-1);
        expect(cs.dy.y).toBeCloseTo(0);
        expect(cs.dy.z).toBeCloseTo(0);
    });

    test('should translate coordinate system', () => {
        const cs = new Coordinate3(
            { x: 1, y: 2, z: 3 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        cs.translate({ x: 3, y: 4, z: 5 });
        expect(cs.origin.x).toBeCloseTo(4);
        expect(cs.origin.y).toBeCloseTo(6);
        expect(cs.origin.z).toBeCloseTo(8);
    });

    test('should get transformation matrix', () => {
        const cs = new Coordinate3(
            { x: 2, y: 3, z: 4 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const matrix = cs.getMatrix();
        expect(matrix.elements[12]).toBeCloseTo(2);
        expect(matrix.elements[13]).toBeCloseTo(3);
        expect(matrix.elements[14]).toBeCloseTo(4);
        expect(matrix.elements[0]).toBeCloseTo(1);
        expect(matrix.elements[1]).toBeCloseTo(0);
        expect(matrix.elements[2]).toBeCloseTo(0);
    });

    test('should set coordinate system from matrix', () => {
        const matrix = new Matrix4(
            0, 0, 1, 0,
            1, 0, 0, 0,
            0, 1, 0, 0,
            2, 3, 4, 1
        );
        const cs = new Coordinate3();
        cs.setFromMatrix(matrix);
        expect(cs.origin.x).toBeCloseTo(2);
        expect(cs.origin.y).toBeCloseTo(3);
        expect(cs.origin.z).toBeCloseTo(4);
        expect(cs.dx.x).toBeCloseTo(0);
        expect(cs.dx.y).toBeCloseTo(1);
        expect(cs.dx.z).toBeCloseTo(0);
    });

    test('should get quaternion representation', () => {
        const cs = new Coordinate3();
        const quaternion = cs.getQuaternion();
        expect(quaternion.x).toBeCloseTo(0);
        expect(quaternion.y).toBeCloseTo(0);
        expect(quaternion.z).toBeCloseTo(0);
        expect(quaternion.w).toBeCloseTo(1);
    });

    test('should set coordinate system from quaternion', () => {
        const origin = new Vector3(1, 2, 3);
        const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
        const cs = new Coordinate3();
        cs.setFromQuaternion(quaternion);
        expect(cs.origin.x).toBe(1);
        expect(cs.origin.y).toBe(2);
        expect(cs.origin.z).toBe(3);
    });

    test('should compare coordinate systems for equality', () => {
        const cs1 = new Coordinate3(
            { x: 1, y: 2, z: 3 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const cs2 = new Coordinate3(
            { x: 1, y: 2, z: 3 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const cs3 = new Coordinate3(
            { x: 2, y: 2, z: 2 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        expect(cs1.equals(cs2)).toBe(true);
        expect(cs1.equals(cs3)).toBe(false);
    });

    test('should get normal vector', () => {
        const cs = new Coordinate3();
        const normal = cs.getNormal();
        expect(normal.x).toBeCloseTo(0);
        expect(normal.y).toBeCloseTo(0);
        expect(normal.z).toBeCloseTo(1);
    });

    test('should set normal vector', () => {
        const cs = new Coordinate3();
        cs.setNormal({ x: 0, y: 0, z: 1 });
        expect(cs.dz.x).toBeCloseTo(0);
        expect(cs.dz.y).toBeCloseTo(0);
        expect(cs.dz.z).toBeCloseTo(1);
    });

    test('should dump and load coordinate system data', () => {
        const cs1 = new Coordinate3(
            { x: 1, y: 2, z: 3 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }
        );
        const data = cs1.dump();
        expect(data.type).toBe('Coordinate3');
        expect(data.value.origin.x).toBe(1);
        expect(data.value.origin.y).toBe(2);
        expect(data.value.origin.z).toBe(3);
        expect(data.value.dx.x).toBeCloseTo(1);
        expect(data.value.dx.y).toBeCloseTo(0);
        expect(data.value.dx.z).toBeCloseTo(0);
        expect(data.value.dy.x).toBeCloseTo(0);
        expect(data.value.dy.y).toBeCloseTo(1);
        expect(data.value.dy.z).toBeCloseTo(0);

        const cs2 = new Coordinate3();
        cs2.load(data.value);
        expect(cs2.origin.x).toBe(1);
        expect(cs2.origin.y).toBe(2);
        expect(cs2.origin.z).toBe(3);
        expect(cs2.dx.x).toBeCloseTo(1);
        expect(cs2.dx.y).toBeCloseTo(0);
        expect(cs2.dx.z).toBeCloseTo(0);
        expect(cs2.dy.x).toBeCloseTo(0);
        expect(cs2.dy.y).toBeCloseTo(1);
        expect(cs2.dy.z).toBeCloseTo(0);
    });
    // End of file

});

