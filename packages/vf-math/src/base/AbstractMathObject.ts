export abstract class AbstractMathObject {
    readonly type: string;
    set(..._: any[]){
        return this;
    }
    clone(){
        return this.constructor();
    }

    copy(..._: any[]){
        return this;
    }

    equals(..._: any[]){
        return false;
    }
}