/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-08-25 16:30:03
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-08-25 16:39:34
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
});