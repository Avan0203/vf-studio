/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-29 10:49:25
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 17:24:17
 * @FilePath: \vf-studio\packages\vf-math\src\geometry\surface\CoordinateSurface.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Coordinate3, Vector3Like } from "../../base";
import { Surface } from "./Surface";

abstract class CoordinateSurface extends Surface {
    protected _coordinate: Coordinate3
    constructor() {
        super();
        this._coordinate = new Coordinate3();
    }
    copy(surface: CoordinateSurface): this {
        super.copy(surface);
        this._coordinate.copy(surface.getCoordinate());
        return this;
    }

    getCoordinate(): Coordinate3 {
        return this._coordinate;
    }

    reverse(): this {
        this._coordinate.dy = this._coordinate.dy.negate();
        return this;
    }

    setCoordinate(coordinate: Coordinate3): this {
        this._coordinate.copy(coordinate);
        return this;
    }

    translate(translation: Vector3Like): this {
        this._coordinate.translate(translation);
        return this;
    }
}

export { CoordinateSurface }