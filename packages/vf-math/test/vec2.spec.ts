import { Vector2 } from '../src';
import { describe, it, expect } from 'vitest';

describe('Vector2', () => {
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

  it('should calculate distance between vectors correctly', () => {
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(3, 4);
    const distance = v1.distance(v2);

    expect(distance).toBe(5);
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
    v.addVector(v1, v2);

    expect(v.x).toBe(7); // 1 + 2 + 4 = 7
    expect(v.y).toBe(9); // 1 + 3 + 5 = 9
  });

  it('should subtract sum of two vectors from itself correctly', () => {
    const v = new Vector2(10, 10);
    const v1 = new Vector2(2, 3);
    const v2 = new Vector2(4, 5);
    v.subVector(v1, v2);

    expect(v.x).toBe(4); // 10 - (2 + 4) = 4
    expect(v.y).toBe(2); // 10 - (3 + 5) = 2
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
});