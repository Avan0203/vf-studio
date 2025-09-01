import { AbstractMathObject, DumpResult } from './AbstractMathObject.js';
import { Vector3, type Vector3Like } from './Vector3.js';
import { Tolerance, MathUtils } from '../utils';
import { Sphere, type SphereLike } from './Sphere.js';
import { _plane, _sphere, _v } from '../utils/pure.js';
import type { PlaneLike } from './Plane.js';
import type { Matrix4 } from './Matrix4.js';
import { TriangleLike } from './Triangle.js';

const { lessEqual, greaterEqual } = MathUtils

type Box3Like = {
	min: Vector3Like;
	max: Vector3Like;
}

class Box3 extends AbstractMathObject<Box3Like> {
	min: Vector3;
	max: Vector3;
	constructor(min = new Vector3(+ Infinity, + Infinity, + Infinity), max = new Vector3(- Infinity, - Infinity, - Infinity)) {
		super();
		this.min = new Vector3(+ Infinity, + Infinity, + Infinity);
		this.max = new Vector3(- Infinity, - Infinity, - Infinity);
		this.set(min, max);
	}

	set(min: Vector3Like, max: Vector3Like): this {
		this.min.copy(min);
		this.max.copy(max);
		return this;
	}

	setFromArray(array: number[]): this {
		this.makeEmpty();
		for (let i = 0, il = array.length; i < il; i += 3) {
			this.expandByPoint(_v.fromArray(array, i));
		}
		return this;
	}

	setFromPoints(points: Vector3Like[]) {
		this.makeEmpty();
		for (let i = 0, il = points.length; i < il; i++) {
			this.expandByPoint(points[i]);
		}
		return this;
	}

	setFromCenterAndSize(center: Vector3Like, size: Vector3Like) {
		const halfSize = _v.copy(size).multiplyScalar(0.5);
		this.min.copy(center).sub(halfSize);
		this.max.copy(center).add(halfSize);
		return this;
	}

	clone(): Box3 {
		return new Box3().copy(this);
	}


	copy(box: Box3Like): this {
		this.min.copy(box.min);
		this.max.copy(box.max);
		return this;
	}

	makeEmpty(): this {
		this.min.x = this.min.y = this.min.z = + Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;
		return this;
	}

	isEmpty(): boolean {
		return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
	}

	getCenter(target = new Vector3()): Vector3 {
		return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
	}

	getSize(target = new Vector3()): Vector3 {
		return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
	}

	expandByScalar(scalar: number): this {
		this.min.addScalar(- scalar);
		this.max.addScalar(scalar);

		return this;
	}


	expandByPoint(point: Vector3Like): this {
		this.min.min(point);
		this.max.max(point);
		return this;
	}


	expandByVector(vector: Vector3Like): this {
		this.min.sub(vector);
		this.max.add(vector);
		return this;
	}

	containsPoint(point: Vector3Like, eps = Tolerance.LENGTH_EPS): boolean {
		return lessEqual(point.x, this.max.x, eps) && greaterEqual(point.x, this.min.x, eps) &&
			lessEqual(point.y, this.max.y, eps) && greaterEqual(point.y, this.min.y, eps) &&
			lessEqual(point.z, this.max.z, eps) && greaterEqual(point.z, this.min.z, eps);
	}


	containsBox(box: Box3Like, eps = Tolerance.LENGTH_EPS): boolean {
		return lessEqual(this.min.x, box.max.x, eps) && greaterEqual(this.max.x, box.min.x, eps) &&
			lessEqual(this.min.y, box.max.y, eps) && greaterEqual(this.max.y, box.min.y, eps) &&
			lessEqual(this.min.z, box.max.z, eps) && greaterEqual(this.max.z, box.min.z, eps);
	}


	getParameter(point: Vector3Like, target = new Vector3()): Vector3 {
		return target.set(
			(point.x - this.min.x) / (this.max.x - this.min.x),
			(point.y - this.min.y) / (this.max.y - this.min.y),
			(point.z - this.min.z) / (this.max.z - this.min.z)
		);
	}

	intersectsBox(box: Box3Like, eps = Tolerance.LENGTH_EPS): boolean {
		return lessEqual(box.max.x, this.min.x, eps) && greaterEqual(box.min.x, this.max.x, eps) &&
			lessEqual(box.max.y, this.min.y, eps) && greaterEqual(box.min.y, this.max.y, eps) &&
			lessEqual(box.max.z, this.min.z, eps) && greaterEqual(box.min.z, this.max.z, eps);
	}

	intersectsSphere(sphere: SphereLike, eps = Tolerance.LENGTH_EPS): boolean {
		_sphere.copy(sphere);
		this.clampPoint(_sphere.center, _v);
		return lessEqual(_v.distanceToSquared(_sphere.center), (_sphere.radius * _sphere.radius), eps);
	}


	intersectsPlane(plane: PlaneLike, eps = Tolerance.LENGTH_EPS): boolean {
		// We compute the minimum and maximum dot product values. If those values
		// are on the same side (back or front) of the plane, then there is no intersection.
		_plane.copy(plane);
		let min, max;
		if (_plane.normal.x > 0) {
			min = _plane.normal.x * this.min.x;
			max = _plane.normal.x * this.max.x;
		} else {
			min = _plane.normal.x * this.max.x;
			max = _plane.normal.x * this.min.x;
		}

		if (_plane.normal.y > 0) {
			min += _plane.normal.y * this.min.y;
			max += _plane.normal.y * this.max.y;
		} else {
			min += _plane.normal.y * this.max.y;
			max += _plane.normal.y * this.min.y;
		}

		if (_plane.normal.z > 0) {
			min += _plane.normal.z * this.min.z;
			max += _plane.normal.z * this.max.z;
		} else {
			min += _plane.normal.z * this.max.z;
			max += _plane.normal.z * this.min.z;
		}
		return lessEqual(min, - _plane.constant, eps) && greaterEqual(max, - _plane.constant, eps);
	}


	intersectsTriangle(triangle: TriangleLike, eps = Tolerance.LENGTH_EPS) {
		if (this.isEmpty()) {
			return false;
		}
		// compute box center and extents
		this.getCenter(_center);
		_extents.subVectors(this.max, _center);

		// translate triangle to aabb origin
		_v0.subVectors(triangle.a, _center);
		_v1.subVectors(triangle.b, _center);
		_v2.subVectors(triangle.c, _center);

		// compute edge vectors for triangle
		_f0.subVectors(_v1, _v0);
		_f1.subVectors(_v2, _v1);
		_f2.subVectors(_v0, _v2);

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		let axes = [
			0, - _f0.z, _f0.y, 0, - _f1.z, _f1.y, 0, - _f2.z, _f2.y,
			_f0.z, 0, - _f0.x, _f1.z, 0, - _f1.x, _f2.z, 0, - _f2.x,
			- _f0.y, _f0.x, 0, - _f1.y, _f1.x, 0, - _f2.y, _f2.x, 0
		];
		if (!satForAxes(axes, _v0, _v1, _v2, _extents)) {
			return false;
		}

		// test 3 face normals from the aabb
		axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
		if (!satForAxes(axes, _v0, _v1, _v2, _extents)) {
			return false;
		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		_triangleNormal.crossVectors(_f0, _f1);
		axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
		return satForAxes(axes, _v0, _v1, _v2, _extents);
	}


	clampPoint(point: Vector3Like, target = new Vector3()): Vector3 {
		return target.copy(point).clamp(this.min, this.max);
	}


	distanceToPoint(point: Vector3Like): number {
		return this.clampPoint(point, _v).distanceTo(point);
	}


	getBoundingSphere(target = new Sphere()): Sphere {
		if (this.isEmpty()) {
			target.makeEmpty();
		} else {
			this.getCenter(target.center);
			target.radius = this.getSize(_v).getLength() * 0.5;
		}
		return target;
	}


	intersect(box: Box3Like): this {
		this.min.max(box.min);
		this.max.min(box.max);
		// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
		if (this.isEmpty()) this.makeEmpty();
		return this;
	}


	union(box: Box3Like): this {
		this.min.min(box.min);
		this.max.max(box.max);
		return this;
	}


	applyMatrix4(matrix: Matrix4): this {
		// transform of empty box is an empty box.
		if (this.isEmpty()) return this;
		// NOTE: I am using a binary pattern to specify all 2^3 combinations below
		const v: Record<number, number> = {
			0: this.min.x,
			1: this.min.y,
			2: this.min.z,
			3: this.max.x,
			4: this.max.y,
			5: this.max.z,
		};
		_points.forEach(([i, j, k]) => {
			_v.set(v[i], v[j], v[k]).applyMatrix4(matrix);
			this.expandByVector(_v);
		})
		return this;
	}


	translate(offset: Vector3Like): this {
		this.min.add(offset);
		this.max.add(offset);
		return this;
	}


	equals(box: Box3Like, eps = Tolerance.LENGTH_EPS): boolean {
		return this.min.equals(box.min, eps) && this.max.equals(box.max, eps);
	}

	load(data: Box3Like): this {
		return this.copy(data);
	}

	dump(): DumpResult<Box3Like> {
		return { type: this.type, value: { min: { x: this.min.x, y: this.min.y, z: this.min.z }, max: { x: this.max.x, y: this.max.y, z: this.max.z } } }
	}
}

const _points =
	[
		[0, 1, 2],
		[0, 1, 5],
		[0, 4, 2],
		[0, 4, 5],
		[3, 1, 2],
		[3, 1, 5],
		[3, 4, 2],
		[3, 4, 5],
	];

// triangle centered vertices

const _v0 = /*@__PURE__*/ new Vector3();
const _v1 = /*@__PURE__*/ new Vector3();
const _v2 = /*@__PURE__*/ new Vector3();

// triangle edge vectors

const _f0 = /*@__PURE__*/ new Vector3();
const _f1 = /*@__PURE__*/ new Vector3();
const _f2 = /*@__PURE__*/ new Vector3();

const _center = /*@__PURE__*/ new Vector3();
const _extents = /*@__PURE__*/ new Vector3();
const _triangleNormal = /*@__PURE__*/ new Vector3();
const _testAxis = /*@__PURE__*/ new Vector3();

function satForAxes(axes:any[], v0:Vector3, v1:Vector3, v2:Vector3, extents:Vector3) {

	for (let i = 0, j = axes.length - 3; i <= j; i += 3) {

		_testAxis.fromArray(axes, i);
		// project the aabb onto the separating axis
		const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
		// project all 3 vertices of the triangle onto the separating axis
		const p0 = v0.dot(_testAxis);
		const p1 = v1.dot(_testAxis);
		const p2 = v2.dot(_testAxis);
		// actual test, basically see if either of the most extreme of the triangle points intersects r
		if (Math.max(- Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {

			// points of the projected triangle are outside the projected half-length of the aabb
			// the axis is separating and we can exit
			return false;

		}

	}

	return true;

}

export { Box3, Box3Like };
