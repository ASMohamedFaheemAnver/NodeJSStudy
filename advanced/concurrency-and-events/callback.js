const slowOperation = (x, y) => {
  setTimeout(() => { console.log(x + y); }, 5000);
};

slowOperation(3, 3);
slowOperation(4, 4);
slowOperation(5, 5);