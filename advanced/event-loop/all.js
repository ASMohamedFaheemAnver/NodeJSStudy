import { readFileSync } from "fs";

console.log({ msg: "SYNC 1!" });
setInterval(() => {
  console.log({ test: "INTERVAL TIMER QUEUE ORDER1!" });
}, 1000);
console.log({ msg: "SYNC 2!" });
setTimeout(() => {
  console.log({ test: "TIMEOUT TIMER QUEUE ORDER2!" });
}, 1000);
console.log({ msg: "SYNC 3!" });
setInterval(() => {
  console.log({ test: "INTERVAL TIMER QUEUE ORDER3!" });
}, 1000);
console.log({ msg: "SYNC 4!" });
setTimeout(() => {
  console.log({ test: "TIMEOUT TIMER QUEUE ORDER4!" });
}, 1000);
console.log({ msg: "SYNC 5!" });
Promise.resolve().then((_) => {
  console.log({ test: "PROMISE MICROTASK QUEUE PR2!" });
});
console.log({ msg: "SYNC 6!" });
process.nextTick(() => {
  console.log({ test: "NEXT TICK MICROTASK QUEUE PR1!" });
});
console.log({ msg: "SYNC 7!" });

const fileString = readFileSync("./microtask/index.js", "utf-8");
console.log({ msg: "SYNC FILE READ!", fileString });
console.log({ msg: "SYNC 8!" });
