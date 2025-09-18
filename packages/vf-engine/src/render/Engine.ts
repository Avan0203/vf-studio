import { RenderContext } from "./RenderContext";

class Engine {
    private contexts: RenderContext[] = [];
    private running = false;
    private lastTime = 0;

    private forceLoop = false;  // 动画期间需要强制每帧更新

    addContext(context: RenderContext) {
        this.contexts.push(context);
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.lastTime = performance.now();
            this.loop();
        }
    }

    stop() {
        this.running = false;
    }

    private loop = () => {
        if (!this.running) return;

        const now = performance.now();
        const delta = (now - this.lastTime) / 1000;
        this.lastTime = now;

        // 按需更新
        if (this.forceLoop) {
            for (const ctx of this.contexts) {
                ctx.update(delta);
            }
        }

        requestAnimationFrame(this.loop);
    };

    /** 用于动画开始/结束控制 */
    beginAnimation() {
        this.forceLoop = true;
    }

    endAnimation() {
        this.forceLoop = false;
    }

}

export { Engine }