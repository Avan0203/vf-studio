export abstract class AbstractMathObject {
    readonly type: string;
    clone(){
        return this.constructor();
    }
}