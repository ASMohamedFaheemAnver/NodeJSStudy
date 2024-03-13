// type: module prioritize promise callback over next tick
// type: commonjs prioritize next tick over promise callback
console.log({ msg: "SYNC 1!" });
process.nextTick(() => {
  console.log({ test: "NT PR1!" });
  process.nextTick(() => {
    console.log({ test: "NT NT PR1!" });
  });
});
Promise.resolve().then((_) => {
  console.log({ test: "P PR2!" });
  process.nextTick(() => {
    console.log({ test: "P NT PR2!" });
  });
});
process.nextTick(() => {
  console.log({ test: "NT PR3!" });
  process.nextTick(() => {
    console.log({ test: "NT NT PR3!" });
  });
});
Promise.resolve().then((_) => {
  console.log({ test: "P PR4!" });
  process.nextTick(() => {
    console.log({ test: "P NT PR4!" });
  });
});
console.log({ msg: "SYNC 2!" });

// If we are in nexTick queue and we have nested nextTick it will stay and execute
// If we are in promise queue and we have nested nextTick it will stay and pop all promises before going to nextTick
