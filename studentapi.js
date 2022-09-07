const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL ="mongodb://localhost:27017/" ;
const DATABASE_NAME = "stuinfo";
var app = Express();
var cors = require('cors')
app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection,collection1;
app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("student");
        collection1 = database.collection("register");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

});
app.get("/studata", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/stu/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


app.post("/studata", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.put("/stu/:id", (request, response) => {
    collection.updateOne({ "_id": new ObjectId(request.params.id) },{$set:request.body}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});
app.delete("/stu/:id", (request, response) => {
    collection.remove({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/showreg", (request, response) => {
    collection1.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
app.post("/login", (request, response) => {
   
    collection1.findOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        var s ="";
        if(!result)
        {
            s = "0";
            console.log("login fail")
        }
        else
        {
            s = "1";
            console.log("login pass" + result) 
        }
        const responseData = {
            message:s
        }
        response.send(responseData);
        
    });
});


app.post("/reg", (request, response) => {
    collection1.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});
