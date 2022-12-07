const express = require("express");
const bodyparser = require("body-parser");
const parse = bodyparser.json();
const router = express.Router();

let collection = null;
let collection2 = null;


const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const url = "mongodb+srv://raghav:rk1212@cluster0.rbzeb6a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const run = async (req, res, next) => {
    try{
        await client.connect();
        const db = client.db("blog-data");
        collection = db.collection("users-posts");
        collection2 = db.collection("users");
        next();
    } catch(err) {
        console.log(err);
    }
    
}



router.use("/", run)

router.post("/post", parse, async (req, res)=>{

    const check = await collection2.findOne({
        email: req.body.email
    })


    if(check && check.logged_in) {
        console.log(check);
        if(JSON.stringify(req.body) == "") {
            res.json("data not sent!");
        } else {
            const newPost = {
                heading: req.body.heading,
                discription: req.body.discription,
                content: req.body.content,
                date: req.body.date,
                category: req.body.category,
                img_url: req.body.img_url
            }
    
            const response1 = await collection.updateOne(
                {email: req.body.email},
                {$push: {posts: newPost}}
            )
    
            console.log(response1);
    
            if(response1) {
                res.json("post added successfully")
            } else {
                res.json("post not added")
            }
         }
    } else {
        res.json("user logged out!")
    }
});


module.exports = router;


