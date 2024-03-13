// type: module prioritize promise callback over next tick
// type: commonjs prioritize next tick over promise callback
console.log({ msg: "SYNC 1!" });
process.nextTick(() => {
  console.log({ test: "NEXT TICK MICROTASK QUEUE PR1!" });
});
Promise.resolve().then((_) => {
  console.log({ test: "PROMISE MICROTASK QUEUE PR2!" });
});
process.nextTick(() => {
  console.log({ test: "NEXT TICK MICROTASK QUEUE PR3!" });
});
Promise.resolve().then((_) => {
  console.log({ test: "PROMISE MICROTASK QUEUE PR4!" });
});
console.log({ msg: "SYNC 2!" });
