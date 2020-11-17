// We can create buffer on of three major ways
console.log(Buffer);

// alloc will create filled buffer
console.log(Buffer.alloc(8));

// allocUnsafe will not fill the created buffer
console.log(Buffer.allocUnsafe(8));
// To fill the buffer we need to call .fill() method
console.log(Buffer.allocUnsafe(8).fill());

// This will so some uncleared buffer data sometimes
console.log(Buffer.allocUnsafe(800).toString());

const string = "touche";
const buffer = Buffer.from("touche");

console.log(string, string.length);
console.log(buffer, buffer.length);