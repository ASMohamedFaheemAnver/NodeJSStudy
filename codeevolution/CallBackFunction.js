console.log("User one made a requist!");
setTimeout(callBack, 5000);
// console.log("Database operation takes five seconds!");
// console.log("Data delivered to the user!");

console.log("User two made a requist!");
setTimeout(callBack, 5000);
// console.log("Database operation takes five seconds!");
// console.log("Data delivered to the user!");

console.log("User three made a requist!");
setTimeout(callBack, 5000);
// console.log("Database operation takes five seconds!");
// console.log("Data delivered to the user!");

function callBack(){
    console.log("Queried the database and delivered data in five seconds!")
}