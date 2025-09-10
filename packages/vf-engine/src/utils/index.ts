let _contextEnv: 'webgl' | 'webgpu' = 'webgl';

export function getContextEnv(): 'webgl' | 'webgpu' {
    return _contextEnv;
}

export function setContextEnv(env: 'webgl' | 'webgpu') {
    _contextEnv = env;
}
