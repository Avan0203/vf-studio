import { Matrix2 } from '../src';
import { describe, it, expect, vitest } from 'vitest';

describe('Matrix2', () => {
  it('should create a new Matrix2 with default values (identity matrix)', () => {
    const m = new Matrix2();
    expect(m.elements).toEqual([1, 0, 0, 1]);
  });

  it('should create a new Matrix2 with specified values', () => {
    const m = new Matrix2(1, 2, 3, 4);
    expect(m.elements).toEqual([1, 2, 3, 4]);
  });

  it('should set values correctly', () => {
    const m = new Matrix2();
    m.set(1, 2, 3, 4);
    expect(m.elements).toEqual([1, 2, 3, 4]);
  });

  it('should set identity matrix correctly', () => {
    const m = new Matrix2(1, 2, 3, 4);
    m.identity();
    expect(m.elements).toEqual([1, 0, 0, 1]);
  });

  it('should clone a Matrix2 correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    const m2 = m1.clone();

    expect(m2.elements).toEqual([1, 2, 3, 4]);
    expect(m2).not.toBe(m1); // Should be a different instance
  });

  it('should copy a Matrix2 correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    const m2 = new Matrix2().copy(m1);

    expect(m2.elements).toEqual([1, 2, 3, 4]);
  });

  it('should create from array correctly', () => {
    const m = new Matrix2().fromArray([1, 2, 3, 4]);
    expect(m.elements).toEqual([1, 2, 3, 4]);
  });

  it('should convert to array correctly', () => {
    const m = new Matrix2(1, 2, 3, 4);
    const arr = m.toArray();
    expect(arr).toEqual([1, 2, 3, 4]);
  });

  it('should load data correctly', () => {
    const m = new Matrix2().load([1, 2, 3, 4]);
    expect(m.elements).toEqual([1, 2, 3, 4]);
  });

  it('should dump data correctly', () => {
    const m = new Matrix2(1, 2, 3, 4);
    const dumped = m.dump();

    expect(dumped.type).toBe('Matrix2');
    expect(dumped.value).toEqual([1, 2, 3, 4]);
  });

  it('should check equality of matrices correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    const m2 = new Matrix2(1, 2, 3, 4);
    const m3 = new Matrix2(1.0000001, 2, 3, 4);
    const m4 = new Matrix2(5, 6, 7, 8);

    expect(m1.equals(m2)).toBe(true);
    expect(m1.equals(m3)).toBe(true); // Due to epsilon tolerance
    expect(m1.equals(m4)).toBe(false);
  });

  it('should add matrices correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    const m2 = new Matrix2(5, 6, 7, 8);
    m1.add(m2);

    expect(m1.elements).toEqual([6, 8, 10, 12]);
  });

  it('should subtract matrices correctly', () => {
    const m1 = new Matrix2(5, 6, 7, 8);
    const m2 = new Matrix2(1, 2, 3, 4);
    m1.sub(m2);

    expect(m1.elements).toEqual([4, 4, 4, 4]);
  });

  it('should multiply matrices correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    const m2 = new Matrix2(5, 6, 7, 8);
    m1.multiply(m2);

    // Column-major order multiplication
    // elements[0] = 1*5 + 3*6 = 5 + 18 = 23
    // elements[1] = 2*5 + 4*6 = 10 + 24 = 34
    // elements[2] = 1*7 + 3*8 = 7 + 24 = 31
    // elements[3] = 2*7 + 4*8 = 14 + 32 = 46
    expect(m1.elements[0]).toBeCloseTo(23); // 1*5 + 3*6 = 23
    expect(m1.elements[1]).toBeCloseTo(34); // 2*5 + 4*6 = 34
    expect(m1.elements[2]).toBeCloseTo(31);
    expect(m1.elements[3]).toBeCloseTo(46);
  });

  it('should premultiply matrices correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    const m2 = new Matrix2(5, 6, 7, 8);
    m1.premultiply(m2);

    // m2 * m1
    // elements[0] = 5*1 + 7*2 = 5 + 14 = 19
    // elements[1] = 6*1 + 8*2 = 6 + 16 = 22
    // elements[2] = 5*3 + 7*4 = 15 + 28 = 43
    // elements[3] = 6*3 + 8*4 = 18 + 32 = 50
    expect(m1.elements[0]).toBeCloseTo(19);
    expect(m1.elements[1]).toBeCloseTo(22);
    expect(m1.elements[2]).toBeCloseTo(43);
    expect(m1.elements[3]).toBeCloseTo(50);
  });

  it('should multiply by scalar correctly', () => {
    const m = new Matrix2(1, 2, 3, 4);
    m.multiplyScalar(2);
    expect(m.elements).toEqual([2, 4, 6, 8]);
  });

  it('should calculate determinant correctly', () => {
    const m1 = new Matrix2(1, 2, 3, 4);
    expect(m1.determinant()).toBe(-2); // 1*4 - 2*3 = -2

    const m2 = new Matrix2(2, 0, 0, 2);
    expect(m2.determinant()).toBe(4); // 2*2 - 0*0 = 4
  });

  it('should transpose matrix correctly', () => {
    const m = new Matrix2(1, 2, 3, 4);
    m.transpose();
    expect(m.elements).toEqual([1, 3, 2, 4]);
  });

  it('should invert matrix correctly', () => {
    const m1 = new Matrix2(2, 0, 0, 2);
    m1.invert();
    expect(m1.elements[0]).toBeCloseTo(0.5);
    expect(m1.elements[1]).toBeCloseTo(0);
    expect(m1.elements[2]).toBeCloseTo(0);
    expect(m1.elements[3]).toBeCloseTo(0.5);

    const m2 = new Matrix2(1, 2, 3, 4);
    m2.invert();
    expect(m2.elements[0]).toBeCloseTo(-2);
    expect(m2.elements[1]).toBeCloseTo(1.5);
    expect(m2.elements[2]).toBeCloseTo(1);
    expect(m2.elements[3]).toBeCloseTo(-0.5);
  });

  it('should handle inversion of singular matrix', () => {
    const m = new Matrix2(1, 2, 2, 4); // Determinant is 0
    const consoleWarn = vitest.spyOn(console, 'warn').mockImplementation(() => { });
    m.invert();
    expect(consoleWarn).toHaveBeenCalledWith('Matrix2: can\'t invert, determinant is 0');
    consoleWarn.mockRestore();
  });
});
