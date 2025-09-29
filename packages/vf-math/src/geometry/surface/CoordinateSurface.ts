import { Coordinate3, Coordinate3Like, Vector3Like } from "../../base";
import { Surface } from "./Surface";

abstract class CoordinateSurface extends Surface {
    protected _coordinate: Coordinate3
    constructor(coordinate: Coordinate3) {
        super();
        this._coordinate = coordinate;
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