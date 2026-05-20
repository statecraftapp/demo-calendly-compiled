const envProxy = new Proxy({ NODE_ENV: 'production' }, { get(t, k) { return k in t ? t[k] : undefined; } });
if (typeof globalThis.process === 'undefined') { globalThis.process = { env: envProxy }; }
else if (typeof globalThis.process.env === 'undefined') { globalThis.process.env = envProxy; }
