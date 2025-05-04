const express = require("express");
const app = express();
const port = 8080;
const path = require("path");//to use the folders -> public and views
const { v4: uuidv4 } = require("uuid");// creating unique id
const methodOverride= require("method-override");

app.use(express.urlencoded({extended: true}));// middleware to parse 
// the data that comes from frontend or client
app.use(methodOverride("_method"));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//serving static files
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username : "apnacollege",
        content : "coding"
    },
    {
        id: uuidv4(),
        username : "shrinivas",
        content : "go to running"
    },
    {
        id: uuidv4(),
        username : "maland",
        content : "complete the dsa coding"
    },
];

//route to render posts
app.get("/posts", (req,res)=> { // main page
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>{ // form to create new posts
    res.render("new.ejs");
});

app.post("/posts", (req, res) =>{ // creating new posts
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) =>{ //show post page
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res)=> {// to add new contentto the posts
    let {id} = req.params;
    let newContent = req.body.content;
    let post= posts.find((p) => id=== p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");

});

app.get("/posts/:id/edit", (req,res) =>{ //edit page
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => { //deleting a specific post by id
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);//while deleting cannot initialize
    //post variable because it already exists.  
    res.redirect("/posts");
}); 

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});




// view all posts <---------
//  create new - 1) form    
//               2) post---->^  redirect to all posts