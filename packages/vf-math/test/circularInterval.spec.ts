/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: \vf-studio\packages\vf-math\test\circularInterval.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { CircularInterval } from '../src/base/CircularInterval';
import { DOUBLE_PI } from '../src/utils';

describe('CircularInterval', () => {
    test('should create circular interval with default values', () => {
        const interval = new CircularInterval();
        expect(interval.min).toBe(0);
        expect(interval.max).toBe(DOUBLE_PI);
        expect(interval.period).toBe(DOUBLE_PI);
    });

    test('should normalize angles correctly', () => {
        const interval = new CircularInterval(0, Math.PI);
        expect(interval.normalizeAngle(3 * Math.PI)).toBeCloseTo(Math.PI);
        expect(interval.normalizeAngle(-Math.PI)).toBeCloseTo(Math.PI);
    });

    test('should check if angle is contained', () => {
        const interval = new CircularInterval(0, Math.PI);
        expect(interval.containsAngle(Math.PI / 2)).toBe(true);
        expect(interval.containsAngle(3 * Math.PI / 2)).toBe(false);
    });

    test('should handle cross-zero intervals', () => {
        const interval = new CircularInterval(3 * Math.PI / 2, Math.PI / 2);
        expect(interval.crossesZero()).toBe(true);
        expect(interval.containsAngle(0)).toBe(true);
        expect(interval.containsAngle(Math.PI)).toBe(false);
    });

    test('should get angle range correctly', () => {
        const interval1 = new CircularInterval(0, Math.PI);
        expect(interval1.getAngleRange()).toBeCloseTo(Math.PI);

        const interval2 = new CircularInterval(3 * Math.PI / 2, Math.PI / 2);
        expect(interval2.getAngleRange()).toBeCloseTo(Math.PI);
    });

    test('should get center angle correctly', () => {
        const interval1 = new CircularInterval(0, Math.PI);
        expect(interval1.getCenterAngle()).toBeCloseTo(Math.PI / 2);

        const interval2 = new CircularInterval(3 * Math.PI / 2, Math.PI / 2);
        expect(interval2.getCenterAngle()).toBeCloseTo(0);
    });

    test('should expand and contract angles', () => {
        const interval = new CircularInterval(0, Math.PI);
        interval.expandAngle(Math.PI / 4);
        expect(interval.min).toBeCloseTo(7 * Math.PI / 4);
        expect(interval.max).toBeCloseTo(5 * Math.PI / 4);
    });

    test('should rotate angles', () => {
        const interval = new CircularInterval(0, Math.PI);
        interval.rotateAngle(Math.PI / 2);
        expect(interval.min).toBeCloseTo(Math.PI / 2);
        expect(interval.max).toBeCloseTo(3 * Math.PI / 2);
    });

    test('should convert between radians and degrees', () => {
        const interval = new CircularInterval(0, Math.PI);
        const degrees = interval.toDegrees();
        expect(degrees.min).toBeCloseTo(0);
        expect(degrees.max).toBeCloseTo(180);
        expect(degrees.period).toBeCloseTo(360);
    });

    test('should get random angles', () => {
        const interval = new CircularInterval(0, Math.PI);
        const randomAngle = interval.randomAngle();
        expect(randomAngle).toBeGreaterThanOrEqual(0);
        expect(randomAngle).toBeLessThanOrEqual(Math.PI);
    });

    test('should check overlaps', () => {
        const interval1 = new CircularInterval(0, Math.PI);
        const interval2 = new CircularInterval(Math.PI / 2, 3 * Math.PI / 2);
        expect(interval1.overlapsAngle(interval2)).toBe(true);
    });

    test('should union angles correctly', () => {
        const interval1 = new CircularInterval(0, Math.PI / 2);
        const interval2 = new CircularInterval(Math.PI / 4, 3 * Math.PI / 4);
        interval1.unionAngle(interval2);
        expect(interval1.min).toBeCloseTo(0);
        expect(interval1.max).toBeCloseTo(3 * Math.PI / 4);
    });

    test('should compare intervals for equality', () => {
        const interval1 = new CircularInterval(0, Math.PI, DOUBLE_PI);
        const interval2 = new CircularInterval(0, Math.PI, DOUBLE_PI);
        const interval3 = new CircularInterval(0, Math.PI, Math.PI);
        
        expect(interval1.equals(interval2)).toBe(true);
        expect(interval1.equals(interval3)).toBe(false);
    });
});
