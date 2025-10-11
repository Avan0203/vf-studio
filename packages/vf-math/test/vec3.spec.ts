import { MathUtils, Vector3 } from '../src';
import { describe, it, expect } from 'vitest';

describe('Vector3', () => {
    it('should have type Vector3', () => {
    const v = new Vector3();
    expect(v.type).toBe('Vector3');
  });

  it('should create a new Vector3 with default values (0, 0, 0)', () => {
    const v = new Vector3();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
  });

  it('should create a new Vector3 with specified values', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('should return correct static vectors', () => {
    const zero = Vector3.ZERO();
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(0);
    expect(zero.z).toBe(0);

    const x = Vector3.X();
    expect(x.x).toBe(1);
    expect(x.y).toBe(0);
    expect(x.z).toBe(0);

    const y = Vector3.Y();
    expect(y.x).toBe(0);
    expect(y.y).toBe(1);
    expect(y.z).toBe(0);

    const z = Vector3.Z();
    expect(z.x).toBe(0);
    expect(z.y).toBe(0);
    expect(z.z).toBe(1);
  });

  it('should copy a vector correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3().copy(v1);

    expect(v2.x).toBe(1);
    expect(v2.y).toBe(2);
    expect(v2.z).toBe(3);
  });

  it('should clone a Vector3 correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = v1.clone();

    expect(v2.x).toBe(1);
    expect(v2.y).toBe(2);
    expect(v2.z).toBe(3);
    expect(v2).not.toBe(v1); // Should be a different instance
  });

  it('should add vectors correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    v1.add(v2);

    expect(v1.x).toBe(5);
    expect(v1.y).toBe(7);
    expect(v1.z).toBe(9);
  });

  it('should subtract vectors correctly', () => {
    const v1 = new Vector3(5, 7, 9);
    const v2 = new Vector3(2, 3, 4);
    v1.sub(v2);

    expect(v1.x).toBe(3);
    expect(v1.y).toBe(4);
    expect(v1.z).toBe(5);
  });

  it('should calculate dot product correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    const dotProduct = v1.dot(v2);

    expect(dotProduct).toBe(32); // 1*4 + 2*5 + 3*6 = 32
  });

  it('should calculate cross product correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    const v3 = new Vector3().crossVectors(v1, v2);

    expect(v3.x).toBe(-3);  // 2*6 - 3*5 = -3
    expect(v3.y).toBe(6);   // 3*4 - 1*6 = 6
    expect(v3.z).toBe(-3);  // 1*5 - 2*4 = -3
  });

  it('should handle cross product with self-modification correctly', () => {
    const v1 = new Vector3(1, 0, 0);
    const v2 = new Vector3(0, 1, 0);
    
    // v1.cross(v2) 应该修改 v1 并返回 v1
    const result = v1.cross(v2);
    
    expect(result).toBe(v1);  // 应该返回自身
    expect(v1.x).toBe(0);
    expect(v1.y).toBe(0);
    expect(v1.z).toBe(1);  // (1,0,0) × (0,1,0) = (0,0,1)
  });

  it('should handle cross product: X × Y = Z', () => {
    const x = new Vector3(1, 0, 0);
    const y = new Vector3(0, 1, 0);
    x.cross(y);
    
    expect(x.x).toBeCloseTo(0);
    expect(x.y).toBeCloseTo(0);
    expect(x.z).toBeCloseTo(1);
  });

  it('should handle cross product: Y × Z = X', () => {
    const y = new Vector3(0, 1, 0);
    const z = new Vector3(0, 0, 1);
    y.cross(z);
    
    expect(y.x).toBeCloseTo(1);
    expect(y.y).toBeCloseTo(0);
    expect(y.z).toBeCloseTo(0);
  });

  it('should handle cross product: Z × X = Y', () => {
    const z = new Vector3(0, 0, 1);
    const x = new Vector3(1, 0, 0);
    z.cross(x);
    
    expect(z.x).toBeCloseTo(0);
    expect(z.y).toBeCloseTo(1);
    expect(z.z).toBeCloseTo(0);
  });

  it('should handle clone().cross() pattern used in Coordinate3', () => {
    const dx = new Vector3(1, 0, 0);
    const dy = new Vector3(0, 1, 0);
    
    // 这是 Coordinate3.orthogonalize() 中使用的模式
    const dz = dx.clone().cross(dy);
    
    expect(dz.x).toBeCloseTo(0);
    expect(dz.y).toBeCloseTo(0);
    expect(dz.z).toBeCloseTo(1);
    
    // 确保原始向量没有被修改
    expect(dx.x).toBe(1);
    expect(dx.y).toBe(0);
    expect(dx.z).toBe(0);
  });

  it('should handle crossVectors with this as first parameter', () => {
    const v = new Vector3(1, 0, 0);
    const other = new Vector3(0, 1, 0);
    
    // 直接调用 crossVectors(this, other)
    v.crossVectors(v, other);
    
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(0);
    expect(v.z).toBeCloseTo(1);
  });

  it('should check equality of vectors correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(1, 2, 3);
    const v3 = new Vector3(1.0000001, 2, 3);
    const v4 = new Vector3(4, 5, 6);

    expect(v1.equals(v2)).toBe(true);
    expect(v1.equals(v3)).toBe(true); // Due to epsilon tolerance
    expect(v1.equals(v4)).toBe(false);
  });

  it('should multiply vectors correctly', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(2, 3, 4);
    v1.multiply(v2);

    expect(v1.x).toBe(2);
    expect(v1.y).toBe(6);
    expect(v1.z).toBe(12);
  });

  it('should divide vectors correctly', () => {
    const v1 = new Vector3(6, 12, 24);
    const v2 = new Vector3(2, 3, 4);
    v1.divide(v2);

    expect(v1.x).toBe(3);
    expect(v1.y).toBe(4);
    expect(v1.z).toBe(6);
  });

  it('should multiply by scalar correctly', () => {
    const v = new Vector3(1, 2, 3);
    v.multiplyScalar(2);

    expect(v.x).toBe(2);
    expect(v.y).toBe(4);
    expect(v.z).toBe(6);
  });

  it('should set values correctly', () => {
    const v = new Vector3();
    v.set(1, 2, 3);

    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('should calculate square length correctly', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.getSquareLength()).toBe(14); // 1^2 + 2^2 + 3^2 = 14
  });

  it('should calculate length correctly', () => {
    const v = new Vector3(3, 4, 0);
    expect(v.getLength()).toBe(5);
  });

  it('should normalize vector correctly', () => {
    const v = new Vector3(3, 4, 0);
    v.normalize();

    expect(v.getLength()).toBeCloseTo(1);
    expect(v.x).toBeCloseTo(0.6);
    expect(v.y).toBeCloseTo(0.8);
    expect(v.z).toBe(0);
  });

  it('should check if vectors are perpendicular correctly', () => {
    const v1 = new Vector3(1, 0, 0);
    const v2 = new Vector3(0, 1, 0);
    const v3 = new Vector3(1, 1, 0);

    expect(v1.isPerpendicular(v2)).toBe(true);  // Perpendicular vectors
    expect(v1.isPerpendicular(v3)).toBe(false); // Not perpendicular
  });

  it('should negate vector correctly', () => {
    const v = new Vector3(1, 2, 3);
    v.negate();

    expect(v.x).toBe(-1);
    expect(v.y).toBe(-2);
    expect(v.z).toBe(-3);
  });

  it('should calculate distance to another vector correctly', () => {
    const v1 = new Vector3(0, 0, 0);
    const v2 = new Vector3(3, 4, 0);
    expect(v1.distanceTo(v2)).toBe(5);
  });

  it('should generate random values correctly', () => {
    const v = new Vector3().random(0, 10);
    expect(v.x).toBeGreaterThanOrEqual(0);
    expect(v.x).toBeLessThanOrEqual(10);
    expect(v.y).toBeGreaterThanOrEqual(0);
    expect(v.y).toBeLessThanOrEqual(10);
    expect(v.z).toBeGreaterThanOrEqual(0);
    expect(v.z).toBeLessThanOrEqual(10);
  });

  it('should get max values correctly', () => {
    const v1 = new Vector3(1, 5, 3);
    const v2 = new Vector3(4, 2, 6);
    v1.max(v2);

    expect(v1.x).toBe(4);
    expect(v1.y).toBe(5);
    expect(v1.z).toBe(6);
  });

  it('should get min values correctly', () => {
    const v1 = new Vector3(1, 5, 3);
    const v2 = new Vector3(4, 2, 6);
    v1.min(v2);

    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
    expect(v1.z).toBe(3);
  });

  it('should clamp values correctly', () => {
    const v = new Vector3(1, 6, 3);
    v.clamp(new Vector3(2, 2, 2), new Vector3(5, 5, 5));

    expect(v.x).toBe(2);
    expect(v.y).toBe(5);
    expect(v.z).toBe(3);
  });

  it('should calculate angle to another vector correctly', () => {
    const v1 = new Vector3(1, 0, 0);
    const v2 = new Vector3(0, 1, 0);
    const v3 = new Vector3(1, 1, 0);

    expect(MathUtils.equals(v1.angleTo(v2), Math.PI / 2)).toBe(true);
    expect(MathUtils.equals(v1.angleTo(v3), Math.PI / 4)).toBe(true);
  });

  it('should lerp to another vector correctly', () => {
    const v1 = new Vector3(0, 0, 0);
    const v2 = new Vector3(10, 10, 10);

    v1.lerp(v2, 0.5);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(5);
    expect(v1.z).toBe(5);
  });

  it('should lerp between two vectors correctly', () => {
    const v = new Vector3();
    const v1 = new Vector3(0, 0, 0);
    const v2 = new Vector3(10, 10, 10);

    v.lerpVectors(v1, v2, 0.5);
    expect(v.x).toBe(5);
    expect(v.y).toBe(5);
    expect(v.z).toBe(5);
  });

  it('should project on vector correctly', () => {
    const v1 = new Vector3(2, 3, 4);
    const v2 = new Vector3(1, 0, 0);
    v1.projectOnVector(v2);

    expect(v1.x).toBe(2);
    expect(v1.y).toBe(0);
    expect(v1.z).toBe(0);
  });

  it('should reflect vector correctly', () => {
    const v1 = new Vector3(1, 1, 0);
    const v2 = new Vector3(0, 1, 0);
    v1.reflect(v2);

    expect(v1.x).toBe(1);
    expect(v1.y).toBe(-1);
    expect(v1.z).toBe(0);
  });

  it('should convert to array correctly', () => {
    const v = new Vector3(1, 2, 3);
    const arr = v.toArray();

    expect(arr).toEqual([1, 2, 3]);
  });

  it('should create from array correctly', () => {
    const v = new Vector3().fromArray([1, 2, 3]);

    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('should load data correctly', () => {
    const v = new Vector3().load({ x: 1, y: 2, z: 3 });

    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('should dump data correctly', () => {
    const v = new Vector3(1, 2, 3);
    const dumped = v.dump();

    expect(dumped.type).toBe('Vector3');
    expect(dumped.value).toEqual({ x: 1, y: 2, z: 3 });
  });

  
});