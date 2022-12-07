const express = require("express");
const bodyparser = require("body-parser");
const parse = bodyparser.json();
const bcrypt = require("bcrypt");

const router = express.Router();

const { MongoClient }  = require("mongodb");
const url = "mongodb+srv://raghav:rk1212@cluster0.rbzeb6a.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

let collection = null;
let collection2 = null;

const run = async (req, res, next) => {
    try{
        await client.connect();
        const db = client.db("blog-data");
        collection = db.collection("users");
        collection2 = db.collection("users-posts");
        next();
    } catch(err) {
        console.log("error occured during client collection",err);
    }
}


router.use("/", run);



router.post("/register", parse, async (req, res) => {
    
    if(JSON.stringify(req.body) != ""){
       try{
        const response2 = await collection.insertOne(req.body);
        console.log(response2);
        user_posts = {
            email: req.body.email,
            posts: []
        }
        const resp2 = await collection2.insertOne(user_posts);
        if(response2) {
            res.json("user registered!")
        } 
       }catch(err) {
        console.log("error occured in singup-register", err);
    }
        
   }
});


module.exports = router;


