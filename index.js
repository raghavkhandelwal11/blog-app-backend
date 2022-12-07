const express = require("express");
const cors = require("cors");
const signup  = require("./Routes/Signup");
const { MongoClient }  = require("mongodb");
const add = require("./Routes/Add");
const login = require("./Routes/Login");
const logout = require("./Routes/Logout");
const gett = require("./Routes/Get");


const url = "mongodb+srv://raghav:rk1212@cluster0.rbzeb6a.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

let database = null;

const run = async (req, res, next) => {
    try{
        await client.connect();
        database = client.db("blog-data");
        next();
    } catch(err) {
        console.log(err);
    }
}


const app = express();

const port = process.env.PORT || 3002;

app.use(cors());



app.use("/", run);




app.get("/", (req, res) => {
    res.send("welcome, this is blog-app server");
});

app.get("/images", async (req, res) => {
    try{

        const collection = database.collection("images");
        const response = await collection.find().toArray();
        res.json(response);
    } catch(err) {
        console.log(err);
    }
    
    
});

app.get("/post/items", async (req, res) => {
    try{

        const collection = database.collection("posts");
        const response = await collection.find().toArray();
        res.json(response);
    } catch(err) {
        console.log(err);
    }
});

app.get("/post/data", async (req, res) => {
    try{

        const collection = database.collection("content");
        const response = await collection.find().toArray();
        res.json(response);
    } catch(err) {
        console.log(err);
    }
});

app.use("/user", login)

app.use("/signup", signup);

app.use("/add", add);

app.use("/ur", logout);

app.use("/posts", gett);

app.listen(port, () => {
    console.log("Server is active!");
});





