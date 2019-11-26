var mongoDb = require('mongodb');

var mongoClient = mongoDb.MongoClient;

var url = 'mongodb://localhost:27017/fruits';

mongoClient.connect(url, function(err, db){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to ", url);
        db.close();
    }
});