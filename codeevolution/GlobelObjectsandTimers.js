console.log(__filename);
console.log(__dirname);

function printStuff(){
    console.log("THIS WAS FROM SETTIMEOUT!");
}

setTimeout(printStuff, 5000);
setInterval(printStuff, 2000);