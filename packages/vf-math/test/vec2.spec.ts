import { MathUtils, Vector2 } from '../src';
import { describe, it, expect } from 'vitest';

describe('Vector2', () => {
  it('should have type Vector2', () => {
    const v = new Vector2();
    expect(v.type).toBe('Vector2');
  });

  it('should create a new Vector2 with default values (0, 0)', () => {
    const v = new Vector2();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it('should create a new Vector2 with specified values', () => {
    const v = new Vector2(3, 4);
    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

  it('should return correct static vectors', () => {
    const zero = Vector2.ZERO();
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(0);

    const x = Vector2.X();
    expect(x.x).toBe(1);
    expect(x.y).toBe(0);

    const y = Vector2.Y();
    expect(y.x).toBe(0);
    expect(y.y).toBe(1);
  });

  it('should clone a Vector2 correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = v1.clone();

    expect(v2.x).toBe(3);
    expect(v2.y).toBe(4);
    expect(v2).not.toBe(v1); // Should be a different instance
  });

  it('should add vectors correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(1, 2);
    v1.add(v2);

    expect(v1.x).toBe(4);
    expect(v1.y).toBe(6);
  });

  it('should subtract vectors correctly', () => {
    const v1 = new Vector2(5, 7);
    const v2 = new Vector2(2, 3);
    v1.sub(v2);

    expect(v1.x).toBe(3);
    expect(v1.y).toBe(4);
  });

  it('should calculate dot product correctly', () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);
    const dotProduct = v1.dot(v2);

    expect(dotProduct).toBe(11); // 1*3 + 2*4 = 11
  });

  it('should calculate cross product correctly', () => {
    const v1 = new Vector2(2, 3);
    const v2 = new Vector2(4, 5);
    const crossProduct = v1.cross(v2);

    expect(crossProduct).toBe(-2); // 2*5 - 3*4 = -2
  });

  it('should add two vectors to itself correctly', () => {
    const v = new Vector2(1, 1);
    const v1 = new Vector2(2, 3);
    const v2 = new Vector2(4, 5);
    v.addVectors(v1, v2);

    expect(v.x).toBe(6); // 2 + 4 = 6
    expect(v.y).toBe(8); // 3 + 5 = 8
  });

  it('should subtract sum of two vectors from itself correctly', () => {
    const v = new Vector2();
    const v1 = new Vector2(2, 3);
    const v2 = new Vector2(4, 5);
    v.subVectors(v2, v1);

    expect(v.x).toBe(2); // 4 - 2 = 2
    expect(v.y).toBe(2); // 5 - 3 = 2
  });

  it('should check equality of vectors correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(3, 4);
    const v3 = new Vector2(3.0000001, 4);
    const v4 = new Vector2(5, 6);

    expect(v1.equals(v2)).toBe(true);
    expect(v1.equals(v3)).toBe(true); // Due to epsilon tolerance
    expect(v1.equals(v4)).toBe(false);
  });

  it('should copy a vector correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2().copy(v1);

    expect(v2.x).toBe(3);
    expect(v2.y).toBe(4);
  });

  it('should multiply vectors correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(2, 3);
    v1.multiply(v2);

    expect(v1.x).toBe(6);
    expect(v1.y).toBe(12);
  });

  it('should divide vectors correctly', () => {
    const v1 = new Vector2(6, 12);
    const v2 = new Vector2(2, 3);
    v1.divide(v2);

    expect(v1.x).toBe(3);
    expect(v1.y).toBe(4);
  });

  it('should multiply by scalar correctly', () => {
    const v = new Vector2(3, 4);
    v.multiplyScalar(2);

    expect(v.x).toBe(6);
    expect(v.y).toBe(8);
  });

  it('should set values correctly', () => {
    const v = new Vector2();
    v.set(3, 4);

    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

  it('should calculate square length correctly', () => {
    const v = new Vector2(3, 4);
    expect(v.getSquareLength()).toBe(25);
  });

  it('should calculate length correctly', () => {
    const v = new Vector2(3, 4);
    expect(v.getLength()).toBe(5);
  });

  it('should normalize vector correctly', () => {
    const v = new Vector2(3, 4);
    v.normalize();

    expect(v.getLength()).toBeCloseTo(1);
    expect(v.x).toBeCloseTo(0.6);
    expect(v.y).toBeCloseTo(0.8);
  });

  it('should check if vectors are parallel correctly', () => {
    const v1 = new Vector2(1, 0);
    const v2 = new Vector2(0, 1);
    const v3 = new Vector2(2, 0);

    expect(v1.isParallel(v2)).toBe(true);  // Perpendicular vectors have dot product 0
    expect(v1.isParallel(v3)).toBe(false); // Parallel vectors don't have dot product 0
  });

  it('should negate vector correctly', () => {
    const v = new Vector2(3, 4);
    v.negate();

    expect(v.x).toBe(-3);
    expect(v.y).toBe(-4);
  });

  it('should calculate distance to another vector correctly', () => {
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(3, 4);
    expect(v1.distanceTo(v2)).toBe(5);
  });

  it('should generate random values correctly', () => {
    const v = new Vector2().random(0, 10);
    expect(v.x).toBeGreaterThanOrEqual(0);
    expect(v.x).toBeLessThanOrEqual(10);
    expect(v.y).toBeGreaterThanOrEqual(0);
    expect(v.y).toBeLessThanOrEqual(10);
  });

  it('should calculate angle correctly', () => {
    const v1 = new Vector2(1, 0);
    const v2 = new Vector2(0, 1);
    const v3 = new Vector2(-1, 0);

    expect(v1.angle()).toBe(0);
    expect(v2.angle()).toBe(Math.PI / 2);
    expect(v3.angle()).toBe(Math.PI);
  });

  it('should get max values correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(5, 2);
    v1.max(v2);

    expect(v1.x).toBe(5);
    expect(v1.y).toBe(4);
  });

  it('should get min values correctly', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(5, 2);
    v1.min(v2);

    expect(v1.x).toBe(3);
    expect(v1.y).toBe(2);
  });

  it('should clamp values correctly', () => {
    const v = new Vector2(1, 6);
    v.clamp(2, 5);

    expect(v.x).toBe(2);
    expect(v.y).toBe(5);
  });

  it('should calculate angle to another vector correctly', () => {
    const v1 = new Vector2(1, 0);
    const v2 = new Vector2(0, 1);
    const v3 = new Vector2(1, 1);

    expect(MathUtils.equals(v1.angleTo(v2), Math.PI / 2)).toBe(true);
    expect(MathUtils.equals(v1.angleTo(v3), Math.PI / 4)).toBe(true);
  });

  it('should lerp to another vector correctly', () => {
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(10, 10);

    v1.lerp(v2, 0.5);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(5);
  });

  it('should lerp between two vectors correctly', () => {
    const v = new Vector2();
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(10, 10);

    v.lerpVectors(v1, v2, 0.5);
    expect(v.x).toBe(5);
    expect(v.y).toBe(5);
  });

  it('should convert to array correctly', () => {
    const v = new Vector2(3, 4);
    const arr = v.toArray();

    expect(arr).toEqual([3, 4]);
  });

  it('should create from array correctly', () => {
    const v = new Vector2().fromArray([3, 4]);

    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

    it('should load data correctly', () => {
    const v = new Vector2().load([1, 2]);

    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  it('should dump data correctly', () => {
    const v = new Vector2(1, 2);
    const dumped = v.dump();

    expect(dumped.type).toBe('Vector2');
    expect(dumped.value).toEqual([1, 2]);
  });
});