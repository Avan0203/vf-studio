let _contextEnv: 'webgl' | 'webgpu' = 'webgl';

export function getContextEnv(): 'webgl' | 'webgpu' {
    return _contextEnv;
}

export function setContextEnv(env: 'webgl' | 'webgpu') {
    _contextEnv = env;
}

// 稳定哈希：按键排序 + 类型标注，避免顺序/浮点精度差异
export function stableHash(input: unknown): string {
    const seen = new WeakSet<object>();
    function norm(value: any): any {
        if (value === null || value === undefined) return value;
        const t = typeof value;
        if (t === 'number') {
            if (!Number.isFinite(value)) return String(value);
            // 统一浮点格式，保留足够精度
            return Number.parseFloat(value.toFixed(8));
        }
        if (t === 'string' || t === 'boolean') return value;
        if (Array.isArray(value)) return value.map(norm);
        if (t === 'object') {
            if (seen.has(value)) return '[Circular]';
            seen.add(value);
            const keys = Object.keys(value).sort();
            const out: Record<string, any> = {};
            for (const k of keys) out[k] = norm(value[k]);
            return out;
        }
        return String(value);
    }
    const json = JSON.stringify(norm(input));
    // 简单但稳定的字符串哈希（FNV-1a 变体）
    let hash = 2166136261 >>> 0;
    for (let i = 0; i < json.length; i++) {
        hash ^= json.charCodeAt(i);
        hash = Math.imul(hash, 16777619) >>> 0;
    }
    return ('00000000' + hash.toString(16)).slice(-8);
}