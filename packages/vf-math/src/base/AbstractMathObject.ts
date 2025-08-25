export abstract class AbstractMathObject {
    readonly type: string;
    constructor() {
        this.type = (new.target as { new(...args: any[]): any; name: string }).name;
    }
    set(..._: any[]) {
        return this;
    }
    clone() {
        return this.constructor();
    }

    copy(..._: any[]) {
        return this;
    }

    equals(..._: any[]) {
        return false;
    }

    load(..._: any[]) {
        return this;
    }

    dump(){
        return {  type: this.type  }
    }
}