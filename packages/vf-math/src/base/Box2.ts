import { MathUtils } from '../utils/MathUtils.js';
import { Tolerance } from '../utils/Tolerance.js';
import { AbstractMathObject, DumpResult } from './AbstractMathObject.js';
import { Vector2, Vector2Like } from './Vector2.js';

const { greaterEqual, lessEqual } = MathUtils;

const _vector = /*@__PURE__*/ new Vector2();

type Box2Like = {
	min: Vector2Like,
	max: Vector2Like,
}

class Box2 extends AbstractMathObject<Box2Like> {
	min: Vector2;
	max: Vector2;

	constructor(min = new Vector2(+ Infinity, + Infinity), max = new Vector2(- Infinity, - Infinity)) {
		super();
		this.min = new Vector2();
		this.max = new Vector2();
		this.set(min, max);
	}

	set(min: Vector2Like, max: Vector2Like): this {
		this.min.copy(min);
		this.max.copy(max);
		return this;
	}

	setFromPoints(points: Vector2Like[]): this {
		this.makeEmpty();
		for (let i = 0, il = points.length; i < il; i++) {
			this.expandByPoint(points[i]);
		}
		return this;
	}


	setFromCenterAndSize(center: Vector2Like, size: Vector2Like): this {
		const halfSize = _vector.copy(size).multiplyScalar(0.5);
		this.min.copy(center).sub(halfSize);
		this.max.copy(center).add(halfSize);
		return this;
	}

	clone(): Box2 {
		return new Box2().copy(this);
	}

	copy(box: Box2Like): this {
		this.min.copy(box.min);
		this.max.copy(box.max);
		return this;
	}

	makeEmpty(): this {
		this.min.x = this.min.y = + Infinity;
		this.max.x = this.max.y = - Infinity;
		return this;
	}

	isEmpty(): boolean {
		return (this.max.x < this.min.x) || (this.max.y < this.min.y);
	}

	getCenter(target = new Vector2()): Vector2 {
		return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
	}

	getSize(target = new Vector2()): Vector2 {
		return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
	}


	expandByPoint(point: Vector2Like): this {
		this.min.min(point);
		this.max.max(point);
		return this;
	}

	expandByVector(vector: Vector2Like): this {
		this.min.sub(vector);
		this.max.add(vector);
		return this;
	}


	containsPoint(point: Vector2Like, eps = Tolerance.LENGTH_EPS): boolean {
		return greaterEqual(point.x, this.min.x, eps) && lessEqual(point.x, this.max.x, eps) &&
			greaterEqual(point.y, this.min.y, eps) && lessEqual(point.y, this.max.y, eps);
	}


	containsBox(box: Box2Like, eps = Tolerance.LENGTH_EPS): boolean {
		return greaterEqual(box.min.x, this.min.x, eps) && lessEqual(box.max.x, this.max.x, eps) &&
			greaterEqual(box.min.y, this.min.y, eps) && lessEqual(box.max.y, this.max.y, eps);
	}

	getParameter(point: Vector2Like, target = new Vector2()): Vector2 {
		return target.set(
			(point.x - this.min.x) / (this.max.x - this.min.x),
			(point.y - this.min.y) / (this.max.y - this.min.y)
		);
	}

	intersectsBox(box: Box2Like, eps = Tolerance.LENGTH_EPS): boolean {
		return greaterEqual(box.max.x, this.min.x, eps) && lessEqual(box.min.x, this.max.x, eps) &&
			greaterEqual(box.max.y, this.min.y, eps) && lessEqual(box.min.y, this.max.y, eps);
	}


	clampPoint(point: Vector2Like, target = new Vector2()): Vector2 {
		return target.copy(point).clamp(this.min, this.max);
	}


	distanceToPoint(point: Vector2Like): number {
		return this.clampPoint(point, _vector).distanceTo(point);
	}

	intersect(box: Box2Like): this {
		this.min.max(box.min);
		this.max.min(box.max);
		if (this.isEmpty()) this.makeEmpty();
		return this;
	}

	union(box: Box2Like): this {
		this.min.min(box.min);
		this.max.max(box.max);
		return this;
	}

	translate(offset: Vector2Like): this {
		this.min.add(offset);
		this.max.add(offset);
		return this;
	}

	equals(box: Box2Like, eps = Tolerance.LENGTH_EPS): boolean {
		return this.min.equals(box.min, eps) && this.max.equals(box.max, eps);
	}

	load(data: Box2Like): this {
		return this.copy(data);
	}

	dump(): DumpResult<Box2Like> {
		return {
			type: 'Box2',
			value: {
				min: { x: this.min.x, y: this.min.y },
				max: { x: this.max.x, y: this.max.y }
			},
		}
	}

}

export { Box2, Box2Like };
