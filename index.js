const express = require("express");
const cors = require("cors");
const images = require("./Posts/Image_URL.json");
const postItems = require("./Posts/MOCK_DATA.json");
const postData = require("./Posts/MOCK_DATA_TWO.json");

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.send("welcome, this is blog-app server");
});

app.get("/images", (req, res) => {
    res.json(images);
});

app.get("/post/items", (req, res) => {
    res.json(postItems);
});

app.get("/post/data", (req, res) => {
    res.json(postData);
});


app.listen(port, () => {
    console.log("Server is active!");
});


