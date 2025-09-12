import { Vector3, Vector3Like } from './Vector3.js';
import { AbstractMathObject, DumpResult } from './AbstractMathObject.js';
import { MathUtils, Tolerance } from '../utils';
import { Matrix4 } from './Matrix4.js';

const { clamp } = MathUtils;

type Line3dLike = {
	start: Vector3Like;
	end: Vector3Like;
}

class Line3d extends AbstractMathObject {
	start = new Vector3();
	end = new Vector3();
	constructor(start = new Vector3(), end = new Vector3()) {
		super();
		this.set(start, end);
	}


	set(start: Vector3Like, end: Vector3Like): this {
		this.start.copy(start);
		this.end.copy(end);
		return this;
	}

	copy(line: Line3dLike): this {
		this.start.copy(line.start);
		this.end.copy(line.end);
		return this;
	}

	getCenter(target = new Vector3()): Vector3 {
		return target.addVectors(this.start, this.end).multiplyScalar(0.5);
	}


	delta(target = new Vector3()): Vector3 {
		return target.subVectors(this.end, this.start);
	}


	distanceSquared(): number {
		return this.start.distanceToSquared(this.end);
	}


	distance(): number {
		return this.start.distanceTo(this.end);
	}


	at(t: number, target = new Vector3()): Vector3 {
		return this.delta(target).multiplyScalar(t).add(this.start);
	}

	closestPointToPointParameter(point: Vector3Like, clampToLine: boolean): number {
		_vec1.subVectors(point, this.start);
		_vec2.subVectors(this.end, this.start);

		const startEnd2 = _vec2.dot(_vec2);
		const startEnd_startP = _vec2.dot(_vec1);

		let t = startEnd_startP / startEnd2;

		if (clampToLine) {
			t = clamp(t, 0, 1);
		}
		return t;
	}

	closestPointToPoint(point: Vector3Like, clampToLine: boolean, target = new Vector3()): Vector3 {
		const t = this.closestPointToPointParameter(point, clampToLine);
		return this.delta(target).multiplyScalar(t).add(this.start);
	}

	distanceSquaredToLine3d(line: Line3dLike, eps = Tolerance.LENGTH_EPS): number {
		// from Real-Time Collision Detection by Christer Ericson, chapter 5.1.9

		// Computes closest points _va and _vb of S1(s)=P1+s*(Q1-P1) and
		// S2(t)=P2+t*(Q2-P2), returning s and t. Function result is squared
		// distance between between S1(s) and S2(t)

		const EPSILON = eps * eps; // must be squared since we compare squared length
		let s, t;

		const p1 = this.start;
		const p2 = line.start;
		const q1 = this.end;
		const q2 = line.end;

		_vec1.subVectors(q1, p1); // Direction vector of segment S1
		_vec2.subVectors(q2, p2); // Direction vector of segment S2
		_v.subVectors(p1, p2);

		const a = _vec1.dot(_vec1); // Squared length of segment S1, always nonnegative
		const e = _vec2.dot(_vec2); // Squared length of segment S2, always nonnegative
		const f = _vec2.dot(_v);

		// Check if either or both segments degenerate into points
		if (a <= EPSILON && e <= EPSILON) {
			// Both segments degenerate into points
			_va.copy(p1);
			_vb.copy(p2);
			_va.sub(_vb);
			return _va.dot(_va);
		}

		if (a <= EPSILON) {
			s = 0;
			t = f / e; // s = 0 => t = (b*s + f) / e = f / e
			t = clamp(t, 0, 1);
		} else {
			const c = _vec1.dot(_v);
			if (e <= EPSILON) {
				t = 0;
				s = clamp(- c / a, 0, 1); // t = 0 => s = (b*t - c) / a = -c / a
			} else {
				const b = _vec1.dot(_vec2);
				const denom = a * e - b * b; // Always nonnegative

				if (denom !== 0) {
					s = clamp((b * f - c * e) / denom, 0, 1);
				} else {
					s = 0;
				}
				t = (b * s + f) / e;

				if (t < 0) {
					t = 0.;
					s = clamp(- c / a, 0, 1);
				} else if (t > 1) {
					t = 1;
					s = clamp((b - c) / a, 0, 1);
				}
			}
		}
		_va.copy(p1).add(_vec1.multiplyScalar(s));
		_vb.copy(p2).add(_vec2.multiplyScalar(t));

		_va.sub(_vb);
		return _va.dot(_va);
	}

	applyMatrix4(matrix: Matrix4): this {
		this.start.applyMatrix4(matrix);
		this.end.applyMatrix4(matrix);
		return this;
	}


	equals(line: Line3dLike, eps = Tolerance.LENGTH_EPS): boolean {
		return this.start.equals(line.start, eps) && this.end.equals(line.end, eps);
	}

	clone(): Line3d {
		return new Line3d().copy(this);
	}

	load(data: Line3dLike): this {
		return this.copy(data);
	}

	dump(): DumpResult<Line3dLike> {
		return { type: this.type, value: { start: { x: this.start.x, y: this.start.y, z: this.start.z }, end: { x: this.end.x, y: this.end.y, z: this.end.z } } }
	}

}

const _v = /*@__PURE__*/ new Vector3();
const _va = /*@__PURE__*/ new Vector3();
const _vb = /*@__PURE__*/ new Vector3();
const _vec1 = /*@__PURE__*/ new Vector3();
const _vec2 = /*@__PURE__*/ new Vector3();

export { Line3d, Line3dLike };
