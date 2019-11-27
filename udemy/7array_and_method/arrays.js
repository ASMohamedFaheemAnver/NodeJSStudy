const hobbies = ['Sports', 'Cooking'];

// for(let hobby of hobbies){
//     console.log(hobby);
// }

// Object.freeze(hobbies);

console.log(hobbies.map(hobby => {
    return "Hobby : " + hobby;
}));

hobbies.push("RiFa");

console.log(hobbies);