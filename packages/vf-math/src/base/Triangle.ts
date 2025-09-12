import { MathUtils, Tolerance } from '../utils';
import { AbstractMathObject, DumpResult } from './AbstractMathObject.js';
import { Box3, Box3Like } from './Box3';
import { Plane } from './Plane';
import { Vector3, Vector3Like } from './Vector3';

const { lessEqual, greaterEqual, greaterThan } = MathUtils

const _v0 = /*@__PURE__*/ new Vector3();
const _v1 = /*@__PURE__*/ new Vector3();
const _v2 = /*@__PURE__*/ new Vector3();
const _v3 = /*@__PURE__*/ new Vector3();

const _vab = /*@__PURE__*/ new Vector3();
const _vac = /*@__PURE__*/ new Vector3();
const _vbc = /*@__PURE__*/ new Vector3();
const _vap = /*@__PURE__*/ new Vector3();
const _vbp = /*@__PURE__*/ new Vector3();
const _vcp = /*@__PURE__*/ new Vector3();

type TriangleLike = {
	a: Vector3Like;
	b: Vector3Like;
	c: Vector3Like;
}

class Triangle extends AbstractMathObject {
	public a = new Vector3();
	public b = new Vector3();
	public c = new Vector3();
	constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {
		super();
		this.set(a, b, c);
	}

	static getNormal(a: Vector3Like, b: Vector3Like, c: Vector3Like, target = new Vector3()): Vector3 {
		target.subVectors(c, b);
		_v0.subVectors(a, b);
		target.cross(_v0);
		const targetLengthSq = target.getSquareLength();
		if (targetLengthSq > 0) {
			return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
		}
		return target.set(0, 0, 0);
	}


	static getBarycoord(point: Vector3Like, a: Vector3Like, b: Vector3Like, c: Vector3Like, target = new Vector3()): null | Vector3 {
		_v0.subVectors(c, a);
		_v1.subVectors(b, a);
		_v2.subVectors(point, a);

		const dot00 = _v0.dot(_v0);
		const dot01 = _v0.dot(_v1);
		const dot02 = _v0.dot(_v2);
		const dot11 = _v1.dot(_v1);
		const dot12 = _v1.dot(_v2);

		const denom = (dot00 * dot11 - dot01 * dot01);

		// collinear or singular triangle
		if (denom === 0) {

			target.set(0, 0, 0);
			return null;
		}
		const invDenom = 1 / denom;
		const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		return target.set(1 - u - v, v, u);
	}


	static containsPoint(point: Vector3Like, a: Vector3Like, b: Vector3Like, c: Vector3Like, eps = Tolerance.LENGTH_EPS): boolean {
		if (Triangle.getBarycoord(point, a, b, c, _v3) === null) {
			return false;
		}
		return greaterEqual(_v3.x, 0, eps) && greaterEqual(_v3.y, 0, eps) && lessEqual(_v3.x + _v3.y, 1, eps);
	}


	static getInterpolation(point: Vector3Like, p1: Vector3Like, p2: Vector3Like, p3: Vector3Like, v1: Vector3Like, v2: Vector3Like, v3: Vector3Like, target = new Vector3()): null | Vector3 {
		if (Triangle.getBarycoord(point, p1, p2, p3, _v3) === null) {
			target.x = 0;
			target.y = 0;
			target.z = 0;
			return null;
		}

		target.set(0, 0, 0);
		target.addScaledVector(v1, _v3.x);
		target.addScaledVector(v2, _v3.y);
		target.addScaledVector(v3, _v3.z);

		return target;

	}

	static isFrontFacing(a: Vector3Like, b: Vector3Like, c: Vector3Like, direction: Vector3Like, eps = Tolerance.CALCULATION_EPS) {
		_v0.subVectors(c, b);
		_v1.subVectors(a, b);
		return greaterThan(_v0.cross(_v1).dot(direction), eps);
	}

	set(a: Vector3Like, b: Vector3Like, c: Vector3Like): this {
		this.a.copy(a);
		this.b.copy(b);
		this.c.copy(c);
		return this;
	}


	setFromPointsAndIndices(points: Vector3Like[], i0: number, i1: number, i2: number): this {
		this.a.copy(points[i0]);
		this.b.copy(points[i1]);
		this.c.copy(points[i2]);
		return this;
	}

	clone() {
		return new Triangle().copy(this);
	}


	copy(triangle: TriangleLike) {
		this.a.copy(triangle.a);
		this.b.copy(triangle.b);
		this.c.copy(triangle.c);
		return this;
	}


	getArea(): number {
		_v0.subVectors(this.c, this.b);
		_v1.subVectors(this.a, this.b);
		return _v0.cross(_v1).getLength() * 0.5;
	}


	getMidpoint(target = new Vector3()): Vector3 {
		return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}


	getNormal(target = new Vector3()): Vector3 {
		return Triangle.getNormal(this.a, this.b, this.c, target);
	}


	getPlane(target = new Plane()): Plane {
		return target.setFromCoplanarPoints(this.a, this.b, this.c);
	}


	getBarycoord(point: Vector3Like, target = new Vector3()): null | Vector3 {
		return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
	}


	getInterpolation(point: Vector3Like, v1: Vector3Like, v2: Vector3Like, v3: Vector3Like, target = new Vector3()): null | Vector3 {
		return Triangle.getInterpolation(point, this.a, this.b, this.c, v1, v2, v3, target);
	}

	containsPoint(point: Vector3Like, eps = Tolerance.CALCULATION_EPS): boolean {
		return Triangle.containsPoint(point, this.a, this.b, this.c, eps);
	}


	isFrontFacing(direction: Vector3Like): boolean {
		return Triangle.isFrontFacing(this.a, this.b, this.c, direction);
	}


	intersectsBox(box: Box3Like): boolean {
		_box3.copy(box);
		return _box3.intersectsTriangle(this);
	}


	closestPointToPoint(p: Vector3Like, target = new Vector3()): Vector3 {
		const a = this.a, b = this.b, c = this.c;
		let v, w;
		_vab.subVectors(b, a);
		_vac.subVectors(c, a);
		_vap.subVectors(p, a);
		const d1 = _vab.dot(_vap);
		const d2 = _vac.dot(_vap);
		if (d1 <= 0 && d2 <= 0) {
			// vertex region of A; barycentric coords (1, 0, 0)
			return target.copy(a);
		}

		_vbp.subVectors(p, b);
		const d3 = _vab.dot(_vbp);
		const d4 = _vac.dot(_vbp);
		if (d3 >= 0 && d4 <= d3) {
			// vertex region of B; barycentric coords (0, 1, 0)
			return target.copy(b);
		}

		const vc = d1 * d4 - d3 * d2;
		if (vc <= 0 && d1 >= 0 && d3 <= 0) {
			v = d1 / (d1 - d3);
			// edge region of AB; barycentric coords (1-v, v, 0)
			return target.copy(a).addScaledVector(_vab, v);
		}

		_vcp.subVectors(p, c);
		const d5 = _vab.dot(_vcp);
		const d6 = _vac.dot(_vcp);
		if (d6 >= 0 && d5 <= d6) {
			// vertex region of C; barycentric coords (0, 0, 1)
			return target.copy(c);
		}

		const vb = d5 * d2 - d1 * d6;
		if (vb <= 0 && d2 >= 0 && d6 <= 0) {
			w = d2 / (d2 - d6);
			// edge region of AC; barycentric coords (1-w, 0, w)
			return target.copy(a).addScaledVector(_vac, w);
		}

		const va = d3 * d6 - d5 * d4;
		if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
			_vbc.subVectors(c, b);
			w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
			// edge region of BC; barycentric coords (0, 1-w, w)
			return target.copy(b).addScaledVector(_vbc, w); // edge region of BC
		}

		// face region
		const denom = 1 / (va + vb + vc);
		// u = va * denom
		v = vb * denom;
		w = vc * denom;

		return target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);
	}


	equals(triangle: TriangleLike, eps = Tolerance.LENGTH_EPS) {
		return this.a.equals(triangle.a, eps) && this.b.equals(triangle.b, eps) && this.c.equals(triangle.c, eps);
	}

	load(data: TriangleLike): this {
		return this.copy(data);
	}

	dump(): DumpResult<TriangleLike> {
		return {
			type: 'Triangle',
			value: {
				a: {
					x: this.a.x,
					y: this.a.y,
					z: this.a.z,
				},
				b: {
					x: this.b.x,
					y: this.b.y,
					z: this.b.z,
				},
				c: {
					x: this.c.x,
					y: this.c.y,
					z: this.c.z,
				},
			},
		}
	}
}

const _box3 = /*@__PURE__*/ new Box3();

export { Triangle, TriangleLike };
