/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 11:27:24
 * @FilePath: \vf-studio\packages\vf-math\test\sphere.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Sphere, Vector3, Box3, Matrix4 } from '../src';

describe('Sphere', () => {
    test('should create sphere with default values', () => {
        const s = new Sphere();
        expect(s.center.x).toBe(0);
        expect(s.center.y).toBe(0);
        expect(s.center.z).toBe(0);
        expect(s.radius).toBe(-1);
    });

    test('should create sphere with specified values', () => {
        const center = new Vector3(1, 2, 3);
        const s = new Sphere(center, 5);
        expect(s.center.x).toBe(1);
        expect(s.center.y).toBe(2);
        expect(s.center.z).toBe(3);
        expect(s.radius).toBe(5);
    });

    test('should set sphere values correctly', () => {
        const s = new Sphere();
        const center = new Vector3(2, 3, 4);
        s.set(center, 6);
        expect(s.center.x).toBe(2);
        expect(s.center.y).toBe(3);
        expect(s.center.z).toBe(4);
        expect(s.radius).toBe(6);
    });

    test('should set sphere from center and radius', () => {
        const s = new Sphere();
        s.set({ x: 1, y: 2, z: 3 }, 4);
        expect(s.center.x).toBe(1);
        expect(s.center.y).toBe(2);
        expect(s.center.z).toBe(3);
        expect(s.radius).toBe(4);
    });

    test('should set sphere from points', () => {
        const s = new Sphere();
        const points = [
            new Vector3(0, 0, 0),
            new Vector3(2, 0, 0),
            new Vector3(0, 2, 0),
            new Vector3(0, 0, 2)
        ];
        s.setFromPoints(points);
        expect(s.center.x).toBeCloseTo(1);
        expect(s.center.y).toBeCloseTo(1);
        expect(s.center.z).toBeCloseTo(1);
        expect(s.radius).toBeCloseTo(Math.sqrt(3));
    });

    test('should clone sphere correctly', () => {
        const s1 = new Sphere(new Vector3(1, 2, 3), 4);
        const s2 = s1.clone();
        expect(s2.center.x).toBe(1);
        expect(s2.center.y).toBe(2);
        expect(s2.center.z).toBe(3);
        expect(s2.radius).toBe(4);
        expect(s2).not.toBe(s1);
    });

    test('should copy sphere correctly', () => {
        const s1 = new Sphere(new Vector3(1, 2, 3), 4);
        const s2 = new Sphere().copy(s1);
        expect(s2.center.x).toBe(1);
        expect(s2.center.y).toBe(2);
        expect(s2.center.z).toBe(3);
        expect(s2.radius).toBe(4);
    });

    test('should check if point is inside sphere', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        expect(s.containsPoint({ x: 0, y: 0, z: 0 })).toBe(true);
        expect(s.containsPoint({ x: 3, y: 0, z: 0 })).toBe(true);
        expect(s.containsPoint({ x: 6, y: 0, z: 0 })).toBe(false);
    });

    test('should check if point is inside sphere (exclusive)', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        expect(s.containsPoint({ x: 5, y: 0, z: 0 }, 0.1)).toBe(true);
        expect(s.containsPoint({ x: 4.9, y: 0, z: 0 }, 0.1)).toBe(true);
        expect(s.containsPoint({ x: 5.2, y: 0, z: 0 }, 0.1)).toBe(false);
    });

    test('should get distance to point', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        const distance = s.distanceToPoint({ x: 10, y: 0, z: 0 });
        expect(distance).toBeCloseTo(5);
    });

    test('should get squared distance to point', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        const distance = s.distanceToPoint({ x: 10, y: 0, z: 0 });
        const distanceSq = distance * distance;
        expect(distanceSq).toBeCloseTo(25);
    });

    test('should check if sphere intersects with another sphere', () => {
        const s1 = new Sphere(new Vector3(0, 0, 0), 5);
        const s2 = new Sphere(new Vector3(3, 0, 0), 3);
        const s3 = new Sphere(new Vector3(10, 0, 0), 2);
        expect(s1.intersectsSphere(s2)).toBe(true);
        expect(s1.intersectsSphere(s3)).toBe(false);
    });

    test('should check if sphere intersects with box', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        const box = new Box3(new Vector3(-2, -2, -2), new Vector3(2, 2, 2));
        const box2 = new Box3(new Vector3(10, 10, 10), new Vector3(12, 12, 12));
        expect(s.intersectsBox(box)).toBe(true);
        expect(s.intersectsBox(box2)).toBe(false);
    });

    test('should check if sphere intersects with plane', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        const plane = { normal: { x: 0, y: 0, z: 1 }, constant: 3 };
        const plane2 = { normal: { x: 0, y: 0, z: 1 }, constant: 10 };
        expect(s.intersectsPlane(plane)).toBe(true);
        expect(s.intersectsPlane(plane2)).toBe(false);
    });

    test('should clamp point to sphere', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 5);
        const point = new Vector3(10, 0, 0);
        const result = s.clampPoint(point);
        expect(result.x).toBeCloseTo(5);
        expect(result.y).toBeCloseTo(0);
        expect(result.z).toBeCloseTo(0);
    });

    test('should get bounding box', () => {
        const s = new Sphere(new Vector3(1, 2, 3), 4);
        const box = s.getBoundingBox();
        expect(box.min.x).toBeCloseTo(-3);
        expect(box.min.y).toBeCloseTo(-2);
        expect(box.min.z).toBeCloseTo(-1);
        expect(box.max.x).toBeCloseTo(5);
        expect(box.max.y).toBeCloseTo(6);
        expect(box.max.z).toBeCloseTo(7);
    });

    test('should apply matrix4 transformation', () => {
        const s = new Sphere(new Vector3(1, 0, 0), 2);
        const matrix = new Matrix4().makeTranslation(2, 0, 0);
        s.applyMatrix4(matrix);
        expect(s.center.x).toBeCloseTo(3);
        expect(s.center.y).toBeCloseTo(0);
        expect(s.center.z).toBeCloseTo(0);
        expect(s.radius).toBeCloseTo(2);
    });

    test('should translate sphere', () => {
        const s = new Sphere(new Vector3(1, 2, 3), 4);
        s.translate({ x: 1, y: 1, z: 1 });
        expect(s.center.x).toBeCloseTo(2);
        expect(s.center.y).toBeCloseTo(3);
        expect(s.center.z).toBeCloseTo(4);
    });

    test('should expand sphere by point', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 1);
        console.dir('s: ', s);
        s.expandByPoint({ x: 5, y: 0, z: 0 });
        expect(s.center.x).toBeCloseTo(2);
        expect(s.center.y).toBeCloseTo(0);
        expect(s.center.z).toBeCloseTo(0);
        expect(s.radius).toBeCloseTo(3);
    });

    test('should expand sphere by points', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 1);
        const points = [
            new Vector3(5, 0, 0),
            new Vector3(-3, 0, 0)
        ];
        s.expandByPoint(points[0]);
        s.expandByPoint(points[1]);
        expect(s.radius).toBeGreaterThan(1);
    });

    test('should expand sphere by another sphere', () => {
        const s1 = new Sphere(new Vector3(0, 0, 0), 2);
        const s2 = new Sphere(new Vector3(5, 0, 0), 1);
        s1.union(s2);
        expect(s1.radius).toBeGreaterThan(2);
    });

    test('should check if sphere is empty', () => {
        const s1 = new Sphere();
        const s2 = new Sphere(new Vector3(0, 0, 0), 5);
        expect(s1.isEmpty()).toBe(true);
        expect(s2.isEmpty()).toBe(false);
    });

    test('should make sphere empty', () => {
        const s = new Sphere(new Vector3(1, 2, 3), 5);
        s.makeEmpty();
        expect(s.center.x).toBe(0);
        expect(s.center.y).toBe(0);
        expect(s.center.z).toBe(0);
        expect(s.radius).toBe(-1);
    });

    test('should check if sphere equals another sphere', () => {
        const s1 = new Sphere(new Vector3(1, 2, 3), 4);
        const s2 = new Sphere(new Vector3(1, 2, 3), 4);
        const s3 = new Sphere(new Vector3(1, 2, 4), 4);
        expect(s1.equals(s2)).toBe(true);
        expect(s1.equals(s3)).toBe(false);
    });

    test('should get sphere volume', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 2);
        const volume = (4/3) * Math.PI * Math.pow(s.radius, 3);
        expect(volume).toBeCloseTo((4/3) * Math.PI * 8);
    });

    test('should get sphere surface area', () => {
        const s = new Sphere(new Vector3(0, 0, 0), 2);
        const surfaceArea = 4 * Math.PI * Math.pow(s.radius, 2);
        expect(surfaceArea).toBeCloseTo(4 * Math.PI * 4);
    });

    test('should dump and load sphere data', () => {
        const s1 = new Sphere(new Vector3(1, 2, 3), 4);
        const data = s1.dump();
        expect(data.type).toBe('Sphere');
        expect(data.value.center.x).toBe(1);
        expect(data.value.center.y).toBe(2);
        expect(data.value.center.z).toBe(3);
        expect(data.value.radius).toBe(4);

        const s2 = new Sphere();
        s2.load(data.value);
        expect(s2.center.x).toBe(1);
        expect(s2.center.y).toBe(2);
        expect(s2.center.z).toBe(3);
        expect(s2.radius).toBe(4);
    });

    test('should handle edge cases with zero radius', () => {
        const s = new Sphere(new Vector3(1, 2, 3), 0);
        expect(s.containsPoint({ x: 1, y: 2, z: 3 })).toBe(true);
        expect(s.containsPoint({ x: 1.1, y: 2, z: 3 })).toBe(false);
    });

    test('should handle edge cases with negative radius', () => {
        const s = new Sphere(new Vector3(1, 2, 3), -1);
        expect(s.isEmpty()).toBe(true);
        expect(s.containsPoint({ x: 1, y: 2, z: 3 })).toBe(true);
    });
});
