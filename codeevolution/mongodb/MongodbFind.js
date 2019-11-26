var mongoDb = require('mongodb');

var mongoClient = mongoDb.MongoClient;

var url = 'mongodb://localhost:27017/fruits';

mongoClient.connect(url, function(err, db){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to ", url);
        var collection = db.collection('apples');
        var docOne = {name : 'red apples', color : 'red'};
        var docTwo = {name : 'green apples', color : 'green'};

        collection.find().toArray(function(err, res){
            if(err){
                console.log(err);
            }else if(res.length){
                console.log(res);
            }else{
                console.log("NO MATCHES FOUND!");
            }
            db.close();
        });
    }
});