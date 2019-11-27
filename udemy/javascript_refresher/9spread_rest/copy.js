const hobbies = ['Sports', 'Cooking'];

const copiedArray = hobbies.slice();
const copiedArrayTwo = [...hobbies];
console.log(copiedArrayTwo);

const toArray = (...args) => {
    return args;
}

console.log(toArray(1, 2, 3));