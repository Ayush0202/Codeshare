const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Document");
dotenv.config()

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ckdd9.mongodb.net/codeshareDB`, {useUnifiedTopology: true, useNewUrlParser: true});

app.get("/", function(req, res){
    res.render("home-page");
});

app.get("/home", function(req, res){
    const code = `Welcome to Codeshare!
An online code editor for
interviews, troubleshooting, teaching & more....

Sharing a code is a good thing, and it should be really easy to do so....
Nobody likes to share an entire file or upload it somewhere :)

A lot of times, you want to show others what you are seeing - and that's 
where we use Codeshare ;)

It is one of the most prettiest, easiest code sharing platform...

## BASIC USAGE ##
To make a new entry, Click "New"
Type what you want others to see, click "Save", and then copy the URL.
Send that to someone and they will see what you see

To go back to Home Page, click "Codeshare"

Happy Sharing :)`

    res.render("code-display", {code, language: "plaintext"});
});

app.get("/new", function(req, res){
    res.render("new");
});

app.post("/save", async function(req, res){
    const value = req.body.value;
    try {
        const document = await Document.create({value});
        res.redirect(`/${document.id}`);
    } catch (error) {
        res.render("new", {value})
    }
});


app.get("/:id", async function(req, res){
    const id = req.params.id;

    try {
        const document = await Document.findById(id);
        res.render("code-display", {code: document.value, id});
    } catch (error) {
        res.redirect("/");
    }   
})

app.listen(process.env.PORT || 4000, function(){
    console.log("Server has started successfully");
});