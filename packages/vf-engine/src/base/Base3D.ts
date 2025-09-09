import { Base } from "@vf/core";
import { IBase3D } from "../types";
import { Euler, Matrix4, Quaternion, Vector3 } from "@vf/math";

class Base3D extends Base implements IBase3D {
    position = new Vector3();
    scale = new Vector3(1, 1, 1);
    rotation = new Euler();
    quaternion = new Quaternion();

    matrix = new Matrix4();
    up = new Vector3(0, 1, 0);
    constructor() {
        super();
    }

    getDirection(target: Vector3): Vector3 {
        return target
    }

    updateMatrix(): void {
        this.matrix.compose(this.position, this.quaternion, this.scale);
    }

    lookAt(target: Vector3): void {
        
    }
}

export { Base3D }