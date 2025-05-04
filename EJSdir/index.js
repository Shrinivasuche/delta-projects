const express= require("express");
const app = express();
const path=require("path");

const port = 8080;

//connecting the index.js file to style.css 
// by using the (serving static files method)
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/", (req,res) => {
    res.render("home.ejs");
});

//getting response from the page
app.get("/ig/:username", (req,res)=> {
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if( data ){
        res.render("instagram.ejs", {data} );
    }else{
        console.log("this account does not exist");
        res.render("error.ejs");
    }
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});
