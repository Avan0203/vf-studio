import { AbstractMathObject } from "./AbstractMathObject";

export type Vector2Like = {
    x: number;
    y: number;a
}


export class Vector2 extends AbstractMathObject {
    readonly type = 'Vector2';
    x: number;
    y: number;

    static ZERO() {
        return new Vector2(0, 0);
    }

    static X() {
        return new Vector2(1, 0);
    }

    static Y() {
        return new Vector2(0, 1);
    }

    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }
    clone(){
        return new Vector2(this.x, this.y);
    }

    add(v: Vector2Like){
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    
    sub(v: Vector2Like){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    distance(v: Vector2Like){
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    dot(v: Vector2Like){

        return this.x * v.x + this.y * v.y;
    }

    cross(v: Vector2Like){
        return this.x * v.y - this.y * v.x;
    }


}