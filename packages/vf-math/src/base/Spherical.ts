/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-08-26 16:22:58
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-01 16:41:34
 * @FilePath: \vf-studio\packages\vf-math\src\base\Spherical.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { MathUtils, Tolerance } from '../utils';
import { AbstractMathObject, DumpResult } from './AbstractMathObject';
import { Vector3Like } from './Vector3';

const { clamp } = MathUtils;

type SphericalLike = {
	radius: number;
	phi: number;
	theta: number;
}

class Spherical extends AbstractMathObject {
	radius: number;
	phi: number;
	theta: number;
	constructor(radius = 1, phi = 0, theta = 0) {
		super();
		this.radius = radius;
		this.phi = phi;
		this.theta = theta;
	}

	set(radius: number, phi: number, theta: number): this {
		this.radius = radius;
		this.phi = phi;
		this.theta = theta;
		return this;
	}


	copy(other: SphericalLike) {
		this.radius = other.radius;
		this.phi = other.phi;
		this.theta = other.theta;
		return this;
	}

	makeSafe(eps = Tolerance.ANGLE_EPS): this {
		this.phi = clamp(this.phi, eps, Math.PI - eps);
		return this;
	}


	setFromVector3(v: Vector3Like): this {
		return this.setFromCartesianCoords(v.x, v.y, v.z);
	}


	setFromCartesianCoords(x: number, y: number, z: number): this {
		this.radius = Math.sqrt(x * x + y * y + z * z);
		if (this.radius === 0) {
			this.theta = 0;
			this.phi = 0;
		} else {
			this.theta = Math.atan2(x, z);
			this.phi = Math.acos(clamp(y / this.radius, - 1, 1));
		}
		return this;
	}

	clone(): Spherical {
		return new Spherical().copy(this);
	}

	dump(): DumpResult<SphericalLike> {
		return { type: this.type, value: { radius: this.radius, theta: this.theta, phi: this.phi } }
	}
}

export { Spherical };
