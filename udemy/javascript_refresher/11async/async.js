const fetchData = () => {
    const promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Done!');
        },1500);
    });
    return promise;
}

setTimeout(()=>{
    console.log("Time done!");
    fetchData().then(text=>{
        console.log(text);
        return fetchData();
    }).then(text2=>{
        console.log(text2);
    });
}, 2000);

// Your other code
console.log("Hi!");
console.log("Hi!");
console.log("Hi!");