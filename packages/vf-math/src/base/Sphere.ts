import { Plane, PlaneLike } from './Plane';
import { MathUtils, Tolerance } from '../utils';
import { Vector3, Vector3Like } from './Vector3';
import { Matrix4 } from './Matrix4';
import { type DumpResult, AbstractMathObject } from './AbstractMathObject';
import { Box3, Box3Like } from './Box3';

type SphereLike = {
	center: Vector3Like;
	radius: number;
}

class Sphere extends AbstractMathObject<SphereLike> {
	center: Vector3;
	radius: number;

	constructor(center = new Vector3(), radius = - 1) {
		super();
		this.center = new Vector3();
		this.radius = -1;
		this.set(center, radius)
	}

	set(center: Vector3Like, radius: number): this {
		this.center.copy(center);
		this.radius = radius;
		return this;
	}

	setFromPoints(points: Vector3Like[], optionalCenter?: Vector3Like): this {
		if (optionalCenter !== undefined) {
			this.center.copy(optionalCenter);
		} else {
			_box3.setFromPoints(points).getCenter(this.center);
		}

		let maxRadiusSq = 0;
		for (let i = 0, il = points.length; i < il; i++) {
			maxRadiusSq = Math.max(maxRadiusSq, this.center.distanceToSquared(points[i]));
		}

		this.radius = Math.sqrt(maxRadiusSq);
		return this;
	}


	copy(sphere: SphereLike): this {
		this.center.copy(sphere.center);
		this.radius = sphere.radius;
		return this;
	}

	isEmpty(): boolean {
		return this.radius < 0;
	}


	makeEmpty(): this {
		this.center.set(0, 0, 0);
		this.radius = - 1;
		return this;
	}

	containsPoint(point: Vector3Like, eps = Tolerance.LENGTH_EPS): boolean {
		return MathUtils.lessEqual(this.center.distanceToSquared(point), (this.radius * this.radius), eps);
	}

	distanceToPoint(point: Vector3Like): number {
		return this.center.distanceTo(point) - this.radius;
	}


	intersectsSphere(sphere: SphereLike, eps = Tolerance.LENGTH_EPS): boolean {
		const radiusSum = this.radius + sphere.radius;
		_sphere.copy(sphere);
		return MathUtils.lessEqual(_sphere.center.distanceToSquared(this.center), (radiusSum * radiusSum), eps);
	}


	intersectsBox(box: Box3Like, eps = Tolerance.LENGTH_EPS): boolean {
		_box3.copy(box);
		return _box3.intersectsSphere(this, eps);
	}

	intersectsPlane(plane: PlaneLike, eps = Tolerance.LENGTH_EPS): boolean {
		_plane.copy(plane);
		return MathUtils.lessEqual(Math.abs(_plane.distanceToPoint(this.center)), this.radius, eps);
	}

	clampPoint(point: Vector3Like, target = new Vector3()): Vector3 {
		const deltaLengthSq = this.center.distanceToSquared(point);
		target.copy(point);
		if (deltaLengthSq > (this.radius * this.radius)) {
			target.sub(this.center).normalize();
			target.multiplyScalar(this.radius).add(this.center);
		}
		return target;
	}

	getBoundingBox(target = new Box3()): Box3 {
		if (this.isEmpty()) {
			// Empty sphere produces empty bounding box
			target.makeEmpty();
			return target;
		}
		target.set(this.center, this.center);
		target.expandByScalar(this.radius);
		return target;
	}

	applyMatrix4(matrix: Matrix4): this {
		this.center.applyMatrix4(matrix);
		this.radius = this.radius * matrix.getMaxScaleOnAxis();
		return this;
	}

	translate(offset: Vector3Like): this {
		this.center.add(offset);
		return this;
	}


	expandByPoint(point: Vector3Like) {
		if (this.isEmpty()) {
			this.center.copy(point);
			this.radius = 0;
			return this;
		}

		_v.subVectors(point, this.center);
		const lengthSq = _v.getSquareLength();
		if (lengthSq > (this.radius * this.radius)) {
			const length = Math.sqrt(lengthSq);
			const delta = (length - this.radius) * 0.5;
			this.center.addScaledVector(_v, delta / length);
			this.radius += delta;
		}
		return this;
	}


	union(sphere: SphereLike, eps = Tolerance.LENGTH_EPS) {
		_sphere.copy(sphere);
		if (_sphere.isEmpty()) {
			return this;
		}

		if (this.isEmpty()) {
			this.copy(_sphere);
			return this;
		}

		if (this.center.equals(_sphere.center, eps)) {
			this.radius = Math.max(this.radius, _sphere.radius);
		} else {
			_vec2.subVectors(_sphere.center, this.center).setLength(_sphere.radius);
			this.expandByPoint(_vec1.copy(_sphere.center).add(_vec2));
			this.expandByPoint(_vec1.copy(_sphere.center).sub(_vec2));
		}
		return this;
	}

	equals(sphere: SphereLike, eps = Tolerance.LENGTH_EPS) {
		_sphere.copy(sphere);
		return _sphere.center.equals(this.center) && MathUtils.equals(_sphere.radius, this.radius, eps);
	}

	clone() {
		return new Sphere().copy(this);
	}

	load(data: SphereLike): this {
		return this.copy(data);
	}

	dump(): DumpResult<SphereLike> {
		return { type: this.type, value: { center: this.center, radius: this.radius } }
	}
}

const _sphere = /*@__PURE__*/ new Sphere();
const _v = /*@__PURE__*/ new Vector3();
const _vec1 = /*@__PURE__*/ new Vector3();
const _vec2 = /*@__PURE__*/ new Vector3();
const _plane = /*@__PURE__*/ new Plane();
const _box3 = /*@__PURE__*/ new Box3();

export { Sphere, SphereLike };
