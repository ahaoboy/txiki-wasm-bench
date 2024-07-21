const base64 = "AGFzbQEAAAABBgFgAX8BfwMCAQAHBwEDRmliAAAKHgEcACAAQQJJBH8gAAUgAEEBaxAAIABBAmsQAGoLCwANBG5hbWUBBgEAA0ZpYg==";
const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
const wasmModule = new WebAssembly.Module(buffer);
const instance = new WebAssembly.Instance(wasmModule, {});
const fibWasm = instance.exports.Fib;

function fibJs(n) {
  return n < 2 ? n : fibJs(n - 1) + fibJs(n - 2)
}
for (let i = 0; i < 10; i++) {
  console.log(`fibJs(${i}) = ${fibJs(i)}`);
  console.log(`fibWasm(${i}) = ${fibWasm(i)}`);
}

const N = 100
const MAX = 25

function test(f) {
  const start = +new Date()
  for (let i = 0; i < N; i++) {
    for (let k = 0; k < MAX; k++) {
      f(k)
    }
  }
  const end = + new Date()
  return end - start
}

const js = test(fibJs)
const wasm = test(fibWasm)
console.log(`js: ${js}, wasm: ${wasm}`)