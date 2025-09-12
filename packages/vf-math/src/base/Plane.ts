import { MathUtils, Tolerance } from '../utils';
import { AbstractMathObject, DumpResult } from './AbstractMathObject';
import { Box3, Box3Like } from './Box3';
import { Line3d, Line3dLike } from './Line3d';
import { Matrix3 } from './Matrix3.js';
import type { Matrix4 } from './Matrix4'
import { Sphere, SphereLike } from './Sphere';
import { Vector3, Vector3Like } from './Vector3';

type PlaneLike = {
	normal: Vector3Like,
	constant: number
}

class Plane extends AbstractMathObject {
	normal: Vector3;
	constant: number;

	constructor(normal = new Vector3(1, 0, 0), constant = 0) {
		super();
		this.normal = new Vector3();
		this.constant = 0;
		this.set(normal, constant);
	}


	set(normal: Vector3Like, constant: number): this {
		this.normal.copy(normal);
		this.constant = constant;
		return this;
	}


	setComponents(x: number, y: number, z: number, w: number): this {
		this.normal.set(x, y, z);
		this.constant = w;
		return this;
	}

	setFromNormalAndCoplanarPoint(normal: Vector3Like, point: Vector3Like): this {
		this.normal.copy(normal);
		this.constant = - this.normal.dot(point);
		return this;
	}


	setFromCoplanarPoints(a: Vector3Like, b: Vector3Like, c: Vector3Like): this {
		const normal = _vec1.subVectors(c, b).cross(_vec2.subVectors(a, b)).normalize();
		this.setFromNormalAndCoplanarPoint(normal, a);
		return this;
	}


	copy(plane: PlaneLike) {
		this.normal.copy(plane.normal);
		this.constant = plane.constant;
		return this;
	}


	normalize(): this {
		const inverseNormalLength = 1.0 / this.normal.getLength();
		this.normal.multiplyScalar(inverseNormalLength);
		this.constant *= inverseNormalLength;
		return this;
	}

	negate(): this {
		this.constant *= - 1;
		this.normal.negate();
		return this;
	}

	distanceToPoint(point: Vector3Like): number {
		return this.normal.dot(point) + this.constant;
	}

	distanceToSphere(sphere: SphereLike): number {
		return this.distanceToPoint(sphere.center) - sphere.radius;
	}


	projectPoint(point: Vector3Like, target = new Vector3()): Vector3 {
		return target.copy(point).addScaledVector(this.normal, - this.distanceToPoint(point));
	}

	intersectLine(line: Line3dLike, target = new Vector3()): Vector3 | null {
		_line3d.copy(line);
		const direction = _line3d.delta(_v);
		const denominator = this.normal.dot(direction);
		if (denominator === 0) {
			if (this.distanceToPoint(_line3d.start) === 0) {
				return target.copy(_line3d.start);
			}
			return null;
		}
		const t = - (_line3d.start.dot(this.normal) + this.constant) / denominator;
		if (t < 0 || t > 1) {
			return null;
		}
		return target.copy(_line3d.start).addScaledVector(direction, t);
	}


	intersectsLine(line: Line3dLike): boolean {
		const startSign = this.distanceToPoint(line.start);
		const endSign = this.distanceToPoint(line.end);
		return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
	}


	intersectsBox(box: Box3Like, eps = Tolerance.LENGTH_EPS): boolean {
		_box3.copy(box);
		return _box3.intersectsPlane(this, eps);
	}


	intersectsSphere(sphere: SphereLike): boolean {
		_sphere.copy(sphere);
		return _sphere.intersectsPlane(this);
	}

	coplanarPoint(target = new Vector3()): Vector3 {
		return target.copy(this.normal).multiplyScalar(- this.constant);
	}


	applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix3) {
		const normalMatrix = optionalNormalMatrix || _mat3.getNormalMatrix(matrix);
		const referencePoint = this.coplanarPoint(_v).applyMatrix4(matrix);
		const normal = this.normal.applyMatrix3(normalMatrix).normalize();
		this.constant = - referencePoint.dot(normal);
		return this;
	}


	translate(offset: Vector3Like): this {
		this.constant -= this.normal.dot(offset);
		return this;
	}


	equals(plane: PlaneLike, eps = Tolerance.LENGTH_EPS): boolean {
		return this.normal.equals(plane.normal, eps) && MathUtils.equals(plane.constant, this.constant, eps);
	}

	clone(): Plane {
		return new Plane().copy(this);
	}

	load(data: PlaneLike): this {
		return this.copy(data);
	}

	dump(): DumpResult<PlaneLike> {
		return { type: this.type, value: { normal: { x: this.normal.x, y: this.normal.y, z: this.normal.z }, constant: this.constant } }
	}
}

const _v = /*@__PURE__*/ new Vector3();
const _mat3 = /*@__PURE__*/ new Matrix3();
const _sphere = /*@__PURE__*/ new Sphere();
const _box3 = /*@__PURE__*/ new Box3();
const _line3d = /*@__PURE__*/ new Line3d();

const _vec1 = /*@__PURE__*/ new Vector3();
const _vec2 = /*@__PURE__*/ new Vector3();

export { Plane, PlaneLike };
