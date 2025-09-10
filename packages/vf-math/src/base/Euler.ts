import { MathUtils, Tolerance } from '../utils';
import { AbstractMathObject, Matrix4, type Quaternion, type Vector3Like, type DumpResult } from '../index';
import { _mat4, _quat1 } from '../utils/pure';

enum EulerOrder {
	XYZ = 'XYZ',
	XZY = 'XZY',
	YXZ = 'YXZ',
	YZX = 'YZX',
	ZXY = 'ZXY',
	ZYX = 'ZYX',
}

type EulerLike = { x: number; y: number; z: number; order: EulerOrder };

class Euler extends AbstractMathObject<EulerLike> {
	static DEFAULT_ORDER = EulerOrder.XYZ;

	private _x: number;
	private _y: number;
	private _z: number;
	private _order: EulerOrder;

	constructor(x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER) {
		super();
		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;
	}

	get x() {
		return this._x;
	}

	set x(value: number) {
		this._x = value;
		this._onChangeCallback();
	}

	get y() {
		return this._y;
	}

	set y(value: number) {
		this._y = value;
		this._onChangeCallback();
	}

	get z() {
		return this._z;
	}

	set z(value: number) {
		this._z = value;
		this._onChangeCallback();
	}

	get order() {
		return this._order;
	}

	set order(value: EulerOrder) {
		this._order = value;
		this._onChangeCallback();
	}

	set(x: number, y: number, z: number, order = this._order) {
		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;
		this._onChangeCallback();
		return this;
	}

	clone(): Euler {
		return new Euler(this._x, this._y, this._z, this._order);
	}

	copy(euler: EulerLike): this {
		this._x = euler.x;
		this._y = euler.y;
		this._z = euler.z;
		this._order = euler.order;

		this._onChangeCallback();
		return this;
	}

	setFromRotationMatrix(m: Matrix4, order = this._order, update = true): this {
		const te = m.elements;
		const m11 = te[0], m12 = te[4], m13 = te[8];
		const m21 = te[1], m22 = te[5], m23 = te[9];
		const m31 = te[2], m32 = te[6], m33 = te[10];

		switch (order) {
			case EulerOrder.XYZ:
				this._y = Math.asin(MathUtils.clamp(m13, - 1, 1));
				if (Math.abs(m13) < 0.9999999) {
					this._x = Math.atan2(- m23, m33);
					this._z = Math.atan2(- m12, m11);
				} else {
					this._x = Math.atan2(m32, m22);
					this._z = 0;
				}
				break;
			case EulerOrder.YXZ:
				this._x = Math.asin(- MathUtils.clamp(m23, - 1, 1));
				if (Math.abs(m23) < 0.9999999) {
					this._y = Math.atan2(m13, m33);
					this._z = Math.atan2(m21, m22);
				} else {
					this._y = Math.atan2(- m31, m11);
					this._z = 0;
				}
				break;
			case EulerOrder.ZXY:
				this._x = Math.asin(MathUtils.clamp(m32, - 1, 1));
				if (Math.abs(m32) < 0.9999999) {
					this._y = Math.atan2(- m31, m33);
					this._z = Math.atan2(- m12, m22);
				} else {
					this._y = 0;
					this._z = Math.atan2(m21, m11);
				}
				break;
			case EulerOrder.ZYX:
				this._y = Math.asin(- MathUtils.clamp(m31, - 1, 1));
				if (Math.abs(m31) < 0.9999999) {
					this._x = Math.atan2(m32, m33);
					this._z = Math.atan2(m21, m11);
				} else {
					this._x = 0;
					this._z = Math.atan2(- m12, m22);
				}
				break;
			case EulerOrder.YZX:
				this._z = Math.asin(MathUtils.clamp(m21, - 1, 1));
				if (Math.abs(m21) < 0.9999999) {
					this._x = Math.atan2(- m23, m22);
					this._y = Math.atan2(- m31, m11);
				} else {
					this._x = 0;
					this._y = Math.atan2(m13, m33);
				}
				break;
			case EulerOrder.XZY:
				this._z = Math.asin(- MathUtils.clamp(m12, - 1, 1));
				if (Math.abs(m12) < 0.9999999) {
					this._x = Math.atan2(m32, m22);
					this._y = Math.atan2(m13, m11);
				} else {
					this._x = Math.atan2(- m23, m33);
					this._y = 0;
				}
				break;
			default:
				console.warn('Euler: .setFromRotationMatrix() encountered an unknown order: ' + order);
		}

		this._order = order;
		update && this._onChangeCallback();

		return this;
	}

	setFromQuaternion(q: Quaternion, order = this._order, update = true): this {
		_mat4.makeRotationFromQuaternion(q);
		return this.setFromRotationMatrix(_mat4, order, update);
	}


	setFromVector3(v: Vector3Like, order = this._order): this {
		return this.set(v.x, v.y, v.z, order);
	}

	reorder(newOrder: EulerOrder): this {
		_quat1.setFromEuler(this);
		return this.setFromQuaternion(_quat1, newOrder);
	}

	equals(euler: Euler, eps = Tolerance.LENGTH_EPS): boolean {
		return MathUtils.equals(this._x, euler._x, eps) && MathUtils.equals(this._y, euler._y, eps) && MathUtils.equals(this._z, euler._z, eps) && this._order === euler._order;
	}


	fromArray(array: any[]): this {
		this._x = array[0];
		this._y = array[1];
		this._z = array[2];
		if (array[3] !== undefined) this._order = array[3];
		this._onChangeCallback();

		return this;
	}

	toArray(array: any[] = [], offset = 0): any[] {
		array[offset] = this._x;
		array[offset + 1] = this._y;
		array[offset + 2] = this._z;
		array[offset + 3] = this._order;
		return array;
	}

	onChange(callback: () => void): this {
		this._onChangeCallback = callback;
		return this;
	}

	private _onChangeCallback(): void { }

	load(data: EulerLike): this {
		return this.copy(data);
	}

	dump(): DumpResult<EulerLike> {
		return {
			type: 'Euler',
			value: {
				x: this._x,
				y: this._y,
				z: this._z,
				order: this._order,
			},
		}
	}
}

export { Euler, EulerLike, EulerOrder };
