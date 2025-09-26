/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-08-25 16:30:03
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 11:44:17
 * @FilePath: \vf-studio\packages\vf-math\test\mathUtils.spec.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { MathUtils } from '../src';
import { describe, it, expect } from 'vitest';

describe('MathUtils', () => {
  it('should convert radians to degrees correctly', () => {
    expect(MathUtils.radToDeg(Math.PI)).toBe(180);
    expect(MathUtils.radToDeg(Math.PI / 2)).toBe(90);
    expect(MathUtils.radToDeg(0)).toBe(0);
    expect(MathUtils.radToDeg(Math.PI * 2)).toBe(360);
  });

  it('should convert degrees to radians correctly', () => {
    expect(MathUtils.degToRad(180)).toBeCloseTo(Math.PI);
    expect(MathUtils.degToRad(90)).toBeCloseTo(Math.PI / 2);
    expect(MathUtils.degToRad(0)).toBeCloseTo(0);
    expect(MathUtils.degToRad(360)).toBeCloseTo(Math.PI * 2);
  });

  it('should generate random integer within range correctly', () => {
    const min = 1; const max = 10;
    const randomInt = MathUtils.randomInt(min, max);
    expect(randomInt).toBeGreaterThanOrEqual(min);
    expect(randomInt).toBeLessThanOrEqual(max);
    expect(randomInt % 1 === 0).toBe(true);
  });

  it('should clamp value correctly', () => {
    expect(MathUtils.clamp(5, 0, 10)).toBe(5);
    expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
    expect(MathUtils.clamp(15, 0, 10)).toBe(10);
    expect(MathUtils.clamp(5, 5, 5)).toBe(5);
  });

  it('should mix values correctly', () => {
    expect(MathUtils.mix(0, 10, 0.5)).toBe(5);
    expect(MathUtils.mix(0, 10, 0)).toBe(0);
    expect(MathUtils.mix(0, 10, 1)).toBe(10);
    expect(MathUtils.mix(5, 15, 0.3)).toBe(8);
  });

  it('should perform smoothstep correctly', () => {
    expect(MathUtils.smoothstep(0, 1, 0.5)).toBe(0.5);
    expect(MathUtils.smoothstep(0, 1, 0)).toBe(0);
    expect(MathUtils.smoothstep(0, 1, 1)).toBe(1);
    expect(MathUtils.smoothstep(2, 4, 3)).toBe(0.5);
  });

  it('should calculate the sign of a number correctly', () => {
    expect(MathUtils.sign(10)).toBe(1);
    expect(MathUtils.sign(-10)).toBe(-1);
    expect(MathUtils.sign(0)).toBe(0);
  });

  it('should generate random float within range correctly', () => {
    const min = 1.5; const max = 10.5;
    const randomFloat = MathUtils.randomFloat(min, max);
    expect(randomFloat).toBeGreaterThanOrEqual(min);
    expect(randomFloat).toBeLessThanOrEqual(max);
  });

  it('should generate random boolean correctly', () => {
    const randomBool = MathUtils.randomBool();
    expect(typeof randomBool).toBe('boolean');
  });

  it('should generate random sign correctly', () => {
    const randomSign = MathUtils.randomSign();
    expect(randomSign === 1 || randomSign === -1).toBe(true);
  });

  it('should compare numbers for equality correctly', () => {
    expect(MathUtils.equals(1.0, 1.0000001)).toBe(true);
    expect(MathUtils.equals(1.0, 1.1)).toBe(false);
    expect(MathUtils.equals(0, 0)).toBe(true);
  });

  it('should compare numbers with greaterEqual correctly', () => {
    expect(MathUtils.greaterEqual(5, 3)).toBe(true);
    expect(MathUtils.greaterEqual(3, 5)).toBe(false);
    expect(MathUtils.greaterEqual(3, 3)).toBe(true);
    expect(MathUtils.greaterEqual(3.0000001, 3)).toBe(true);
  });

  it('should compare numbers with greaterThan correctly', () => {
    expect(MathUtils.greaterThan(5, 3)).toBe(true);
    expect(MathUtils.greaterThan(3, 5)).toBe(false);
    expect(MathUtils.greaterThan(3, 3)).toBe(false);
    expect(MathUtils.greaterThan(3.0000001, 3, 0.0001)).toBe(false);
  });

  it('should compare numbers with lessEqual correctly', () => {
    expect(MathUtils.lessEqual(3, 5)).toBe(true);
    expect(MathUtils.lessEqual(5, 3)).toBe(false);
    expect(MathUtils.lessEqual(3, 3)).toBe(true);
    expect(MathUtils.lessEqual(3, 3.0000001)).toBe(true);
  });

  it('should compare numbers with lessThan correctly', () => {
    expect(MathUtils.lessThan(3, 5)).toBe(true);
    expect(MathUtils.lessThan(5, 3)).toBe(false);
    expect(MathUtils.lessThan(3, 3)).toBe(false);
    expect(MathUtils.lessThan(3, 3.0000001)).toBe(false);
  });

  it('should perform step function correctly', () => {
    expect(MathUtils.step(5, 3)).toBe(0);
    expect(MathUtils.step(5, 7)).toBe(1);
    expect(MathUtils.step(5, 5)).toBe(1);
  });

  it('should calculate fract correctly', () => {
    expect(MathUtils.fract(3.14)).toBeCloseTo(0.14);
    expect(MathUtils.fract(-3.14)).toBeCloseTo(0.86);
    expect(MathUtils.fract(5.0)).toBeCloseTo(0.0);
  });

  it('should normalize angles correctly', () => {
    expect(MathUtils.normalizeAngle(3 * Math.PI)).toBeCloseTo(Math.PI);
    expect(MathUtils.normalizeAngle(-Math.PI)).toBeCloseTo(Math.PI);
    expect(MathUtils.normalizeAngle(0)).toBeCloseTo(0);
    expect(MathUtils.normalizeAngle(2 * Math.PI)).toBeCloseTo(0);
  });
});