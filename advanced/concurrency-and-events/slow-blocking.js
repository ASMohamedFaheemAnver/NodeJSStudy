const slowOperation = (x, y) => {
  for (let i = 0; i < 999999999; i++) {

  }
  console.log({ msg: "Done." });
  return x + z;
};

const a = slowOperation(3, 3);
const b = slowOperation(4, 4);
const c = slowOperation(5, 5);

console.log(a);
console.log(b);
console.log(c);