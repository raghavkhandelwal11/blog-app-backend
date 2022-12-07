const express = require("express");
const bodyparser = require("body-parser");
const parse = bodyparser.json();
const bcrypt = require("bcrypt");
const {ObjectId} = require("mongodb")

const router = express.Router();

const { MongoClient }  = require("mongodb");
const url = "mongodb+srv://raghav:rk1212@cluster0.rbzeb6a.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

let collection = null;

const run = async (req, res, next) => {
    try{
        await client.connect();
        const db = client.db("blog-data");
        collection = db.collection("users");
        next();
    } catch(err) {
        console.log(err);
    }
}


router.use("/", run);



router.post("/logout", parse, async (req, res) => {
    console.log("I was here");
    if(req.body.user_id != "") {
        console.log(req.body.user_id);
        const id = ObjectId(req.body.user_id)
        const response1 = await collection.findOne({
            _id: id
        });
        if(JSON.stringify(response1) != "") {
            console.log("the response1:", response1);
            const response2 = await collection.updateOne(
                {_id: id},
                {$set: {
                    logged_in: false
                }}
        )
            
         console.log(response2);
         res.send("success");
        }
    } else {
        res.send("Log out failed");
    }
});


module.exports = router;


