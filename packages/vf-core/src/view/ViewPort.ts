import { EventEmitter } from "../base";
import { InputDispatch } from "../input";
import { IInputObserver, IViewPort, ViewPortEvents } from "../types";

abstract class ViewPort<T extends Record<string, any> = ViewPortEvents> extends EventEmitter<T> implements IViewPort {
    protected width: number;
    protected height: number;
    protected inputDispatch: InputDispatch;
    constructor() {
        super();
        this.inputDispatch = new InputDispatch(this);
        this.width = 0;
        this.height = 0;
    }
    abstract getSize(): { width: number; height: number };
    abstract setSize(width: number, height: number): this;
    abstract resize(width: number, height: number): this;

    lock() {
        this.inputDispatch.detach();
    }

    unlock() {
        this.inputDispatch.attach();
    }
    
    dispose() {
        this.inputDispatch.dispose();
    };

    addObserver(observer: IInputObserver): this {
        this.inputDispatch.addObserver(observer);
        return this;
    }
    removeObserver(observer: IInputObserver): this {
        this.inputDispatch.removeObserver(observer);
        return this;
    }

}

export { ViewPort }