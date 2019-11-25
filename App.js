var printStuff = function(stuff){
    console.log(stuff);
}

function printFunction(stuff){
    console.log(stuff);
}

function mainFunction(anotherFunction, value){
    anotherFunction(value);
}

// printFunction("HELLO WORLD!");

mainFunction(printFunction, "HELLO WORLD!");
mainFunction(printStuff, "HELLO WORLD2!")

mainFunction(function(stuff){
                console.log(stuff);
            }, "HELLO WORLD3!")