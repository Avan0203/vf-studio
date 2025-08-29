import { MathUtils, Tolerance } from '../utils';
import { _mat3, _sphere, _v, _vec1, _vec2 } from '../utils/pure';
import { AbstractMathObject } from './AbstractMathObject';
import { Matrix3 } from './Matrix3.js';
import type { Matrix4 } from './Matrix4'
import { SphereLike } from './Sphere';
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

	intersectLine(line: Line3Like, target = new Vector3()): Vector3 | null {
		const direction = line.delta(_v);
		const denominator = this.normal.dot(direction);
		if (denominator === 0) {
			if (this.distanceToPoint(line.start) === 0) {
				return target.copy(line.start);
			}
			return null;
		}
		const t = - (line.start.dot(this.normal) + this.constant) / denominator;
		if (t < 0 || t > 1) {
			return null;
		}
		return target.copy(line.start).addScaledVector(direction, t);
	}


	intersectsLine(line: Line3Like): boolean {
		const startSign = this.distanceToPoint(line.start);
		const endSign = this.distanceToPoint(line.end);
		return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
	}


	intersectsBox(box: Box3Like): boolean {
		return box.intersectsPlane(this);
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

}

export { Plane, PlaneLike };
