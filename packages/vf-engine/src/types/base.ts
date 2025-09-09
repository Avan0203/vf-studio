import { IBase } from "@vf/core";
import type { Euler, Matrix4, Quaternion, Vector3 } from "@vf/math";

interface IBase3D extends IBase {
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    quaternion: Quaternion;

    matrix: Matrix4;
    up: Vector3;
    getDirection(target: Vector3): Vector3;
    lookAt(target: Vector3): void;
    updateMatrix(): void;
}

export { IBase3D }