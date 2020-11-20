const slowAdd = (a, b) => {
  setTimeout(() => {
    console.log(a + b);
  }, 0);
};

const slowAddPresident = (a, b) => {
  setImmediate(() => {
    console.log(a + b);
  });
};


slowAdd(3, 3);
slowAddPresident(4, 4);