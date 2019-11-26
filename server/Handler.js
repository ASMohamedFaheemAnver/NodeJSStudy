function home(){
    console.log("Excecuting home handler!\n");
}

function review(){
    console.log("Executing review handler!\n");
}

exports.home = home;
exports.review = review;