const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

// V1
// const readFileAsArray = function (file, cb) {
//   fs.readFile(file, function (err, data) {
//     if (err) {
//       return cb(err);
//     }

//     const lines = data.toString().trim().split("\n");
//     cb(null, lines);
//   });
// };

//V2
// const readFileAsArray = function (file) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, function (err, data) {
//       if (err) {
//         return reject(err);
//       }

//       const lines = data.toString().trim().split("\n");
//       resolve(lines);
//     });
//   });
// };

// V3
const readFileAsArray = function (file, cb = () => { }) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function (err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }

      const lines = data.toString().trim().split("\n");
      resolve(lines);
      cb(null, lines);
    });
  });
};




// readFileAsArray("./numbers.txt", (err, lines) => {
//   if (err) throw err;
//   const numbers = lines.map(Number);

//   const oddNumbers = numbers.filter(number => number % 2 === 1);
//   console.log({ oddNumbers: oddNumbers });
// });


// Function caller
// readFileAsArray("./numbers.txt").then(lines => {
//   const numbers = lines.map(Number);
//   const oddNumbers = numbers.filter(number => number % 2 === 1);
//   console.log({ oddNumbers: oddNumbers });
// }).catch(err => {
//   console.log(err);
// });


// Modern function caller
async function countOdd() {
  try {
    const lines = await readFileAsArray("./numbers.txt");
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log({ oddNumbers: oddNumbers });
  } catch (err) {
    console.log(err);
  }
}

countOdd();