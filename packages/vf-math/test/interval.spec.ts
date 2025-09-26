/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: \vf-studio\packages\vf-math\test\interval.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { describe, expect, test } from 'vitest';
import { Interval } from '../src/base/Interval';

describe('Interval', () => {
    test('should create interval with default values', () => {
        const interval = new Interval();
        expect(interval.min).toBe(-Infinity);
        expect(interval.max).toBe(Infinity);
        expect(interval.autoReset).toBe(false);
    });

    test('should create interval with specified values', () => {
        const interval = new Interval(1, 5);
        expect(interval.min).toBe(1);
        expect(interval.max).toBe(5);
    });

    test('should create infinite interval', () => {
        const interval = Interval.INFINITE();
        expect(interval.min).toBe(-Infinity);
        expect(interval.max).toBe(Infinity);
    });

    test('should create empty interval', () => {
        const interval = Interval.EMPTY();
        expect(interval.min).toBe(0);
        expect(interval.max).toBe(0);
    });

    test('should create interval from array', () => {
        const interval = Interval.fromArray([2, 8]);
        expect(interval.min).toBe(2);
        expect(interval.max).toBe(8);
    });

    test('should throw error when creating from array with insufficient elements', () => {
        expect(() => Interval.fromArray([1])).toThrow('Array must have at least 2 elements');
    });

    test('should copy interval correctly', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval().copy(interval1);
        expect(interval2.min).toBe(1);
        expect(interval2.max).toBe(5);
    });

    test('should clone interval correctly', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = interval1.clone();
        expect(interval2.min).toBe(1);
        expect(interval2.max).toBe(5);
        expect(interval2).not.toBe(interval1);
    });

    test('should set interval values correctly', () => {
        const interval = new Interval();
        interval.set(3, 7);
        expect(interval.min).toBe(3);
        expect(interval.max).toBe(7);
    });

    test('should handle autoReset when min > max', () => {
        const interval = new Interval(1, 5, true);
        interval.set(7, 3); // min > max
        expect(interval.min).toBe(3);
        expect(interval.max).toBe(7);
    });

    test('should check if value is contained', () => {
        const interval = new Interval(1, 5);
        expect(interval.contains(3)).toBe(true);
        expect(interval.contains(1)).toBe(true);
        expect(interval.contains(5)).toBe(true);
        expect(interval.contains(0)).toBe(false);
        expect(interval.contains(6)).toBe(false);
    });

    test('should check if value is contained (exclusive)', () => {
        const interval = new Interval(1, 5);
        expect(interval.contains(3, false)).toBe(true);
        expect(interval.contains(1, false)).toBe(false);
        expect(interval.contains(5, false)).toBe(false);
    });

    test('should check if interval contains another interval', () => {
        const interval1 = new Interval(1, 10);
        const interval2 = new Interval(3, 7);
        expect(interval1.containsInterval(interval2)).toBe(true);
        expect(interval2.containsInterval(interval1)).toBe(false);
    });

    test('should check if intervals overlap', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(3, 7);
        const interval3 = new Interval(6, 10);
        expect(interval1.overlaps(interval2)).toBe(true);
        expect(interval1.overlaps(interval3)).toBe(false);
    });

    test('should check if intervals intersect', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(3, 7);
        expect(interval1.intersects(interval2)).toBe(true);
    });

    test('should union intervals correctly', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(3, 7);
        interval1.union(interval2);
        expect(interval1.min).toBe(1);
        expect(interval1.max).toBe(7);
    });

    test('should find intersection of intervals', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(3, 7);
        interval1.intersection(interval2);
        expect(interval1.min).toBe(3);
        expect(interval1.max).toBe(5);
    });

    test('should handle intersection with no overlap', () => {
        const interval1 = new Interval(1, 2);
        const interval2 = new Interval(3, 4);
        interval1.intersection(interval2);
        expect(interval1.min).toBe(0);
        expect(interval1.max).toBe(0);
    });

    test('should split interval correctly', () => {
        const interval = new Interval(1, 5);
        const [left, right] = interval.split(3);
        expect(left.min).toBe(1);
        expect(left.max).toBe(3);
        expect(right.min).toBe(3);
        expect(right.max).toBe(5);
    });

    test('should throw error when splitting with value outside interval', () => {
        const interval = new Interval(1, 5);
        expect(() => interval.split(6)).toThrow('Split value must be within the interval');
    });

    test('should split interval by ratio correctly', () => {
        const interval = new Interval(0, 10);
        const [left, right] = interval.splitByRatio(0.3);
        expect(left.min).toBe(0);
        expect(left.max).toBe(3);
        expect(right.min).toBe(3);
        expect(right.max).toBe(10);
    });

    test('should throw error for invalid ratio', () => {
        const interval = new Interval(1, 5);
        expect(() => interval.splitByRatio(-0.1)).toThrow('Ratio must be between 0 and 1');
        expect(() => interval.splitByRatio(1.1)).toThrow('Ratio must be between 0 and 1');
    });

    test('should get interval length correctly', () => {
        const interval = new Interval(1, 5);
        expect(interval.getLength()).toBe(4);
    });

    test('should get interval center correctly', () => {
        const interval = new Interval(1, 5);
        expect(interval.getCenter()).toBe(3);
    });

    test('should check if interval is empty', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(3, 3);
        const interval3 = new Interval(5, 1);
        expect(interval1.isEmpty()).toBe(false);
        expect(interval2.isEmpty()).toBe(true);
        expect(interval3.isEmpty()).toBe(true);
    });

    test('should check if interval is infinite', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = Interval.INFINITE();
        expect(interval1.isInfinite()).toBe(false);
        expect(interval2.isInfinite()).toBe(true);
    });

    test('should check if interval is valid', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(5, 1);
        expect(interval1.isValid()).toBe(true);
        expect(interval2.isValid()).toBe(false);
    });

    test('should expand interval correctly', () => {
        const interval = new Interval(1, 5);
        interval.expand(2);
        expect(interval.min).toBe(-1);
        expect(interval.max).toBe(7);
    });

    test('should contract interval correctly', () => {
        const interval = new Interval(1, 5);
        interval.contract(1);
        expect(interval.min).toBe(2);
        expect(interval.max).toBe(4);
    });

    test('should translate interval correctly', () => {
        const interval = new Interval(1, 5);
        interval.translate(3);
        expect(interval.min).toBe(4);
        expect(interval.max).toBe(8);
    });

    test('should scale interval correctly', () => {
        const interval = new Interval(1, 5);
        interval.scale(2);
        expect(interval.min).toBe(-1);
        expect(interval.max).toBe(7);
    });

    test('should scale interval around center correctly', () => {
        const interval = new Interval(1, 5);
        interval.scale(2, 2);
        expect(interval.min).toBe(0);
        expect(interval.max).toBe(8);
    });

    test('should clamp value to interval', () => {
        const interval = new Interval(1, 5);
        expect(interval.clamp(3)).toBe(3);
        expect(interval.clamp(0)).toBe(1);
        expect(interval.clamp(6)).toBe(5);
    });

    test('should get random value from interval', () => {
        const interval = new Interval(1, 5);
        const random = interval.random();
        expect(random).toBeGreaterThanOrEqual(1);
        expect(random).toBeLessThanOrEqual(5);
    });

    test('should perform linear interpolation', () => {
        const interval = new Interval(1, 5);
        expect(interval.lerp(0)).toBe(1);
        expect(interval.lerp(1)).toBe(5);
        expect(interval.lerp(0.5)).toBe(3);
    });

    test('should get relative position of value', () => {
        const interval = new Interval(1, 5);
        expect(interval.getRelativePosition(3)).toBe(0.5);
        expect(interval.getRelativePosition(1)).toBe(0);
        expect(interval.getRelativePosition(5)).toBe(1);
    });

    test('should get interval bounds', () => {
        const interval = new Interval(1, 5);
        const bounds = interval.getBounds();
        expect(bounds).toEqual([1, 5]);
    });

    test('should convert to array', () => {
        const interval = new Interval(1, 5);
        const array = interval.toArray();
        expect(array).toEqual([1, 5]);
    });

    test('should load from array', () => {
        const interval = new Interval();
        interval.fromArray([2, 8]);
        expect(interval.min).toBe(2);
        expect(interval.max).toBe(8);
    });

    test('should throw error when loading from array with insufficient elements', () => {
        const interval = new Interval();
        expect(() => interval.fromArray([1])).toThrow('Array must have at least 2 elements');
    });

    test('should compare intervals for equality', () => {
        const interval1 = new Interval(1, 5);
        const interval2 = new Interval(1, 5);
        const interval3 = new Interval(1, 6);
        expect(interval1.equals(interval2)).toBe(true);
        expect(interval1.equals(interval3)).toBe(false);
    });

    test('should dump and load interval data', () => {
        const interval1 = new Interval(1, 5, true);
        const data = interval1.dump();
        expect(data.type).toBe('Interval');
        expect(data.value.min).toBe(1);
        expect(data.value.max).toBe(5);
        expect(data.value.autoReset).toBe(true);

        const interval2 = new Interval();
        interval2.load(data.value);
        expect(interval2.min).toBe(1);
        expect(interval2.max).toBe(5);
        expect(interval2.autoReset).toBe(true);
    });
});
