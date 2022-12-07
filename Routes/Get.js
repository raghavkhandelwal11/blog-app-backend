const express = require("express");
const router = express.Router();
const {MongoClient} = require("mongodb");
const bodyparser = require("body-parser");
const parse = bodyparser.json();


const url = "mongodb+srv://raghav:rk1212@cluster0.rbzeb6a.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);


let collection = null;


const run = async (req, res, next) => {
    await client.connect();
    const db = client.db("blog-data");
    const collection1 = db.collection("users-posts");
    collection = collection1;
    next();
}


router.use("/", run);


router.post("/get", parse, async (req, res) => {
    if(JSON.stringify(req.data) != "") {
        const response = await collection.findOne(
            {
                email: req.body.email
            }
        );
        if(response != null) {
            res.json(response.posts)
        }
    } else {
        res.json("request rejected");
    }
});


module.exports = router;


