const express = require("express");
const bodyparser = require("body-parser");
const parse = bodyparser.json();
const bcrypt = require("bcrypt");

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



router.post("/login", parse, async (req, res) => {
    console.log("I was here");
    if(req.body.password != "") {
        const response1 = await collection.findOne({
            email: req.body.email,
            password: req.body.password
        });

        console.log(response1);
         if(response1 != null)
            {
            const response2 = await collection.updateOne(
                {email: req.body.email,
                password: req.body.password},
                {$set: {
                    logged_in: true
                }}
            );

            console.log(response2, "hi");
            res.json(response1);
        } else {
            console.log("sending string!");
            res.json("ENTER CORRECT PASSWORD");
        }
    } else {
        res.json("Password not entered")
    }
});


module.exports = router;


