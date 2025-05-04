const express = require("express");
const app = express();

let port = 8080;
app.listen (port,()=>{ //listening 
    console.log(`app listeninig on the port ${port}`);

});


app.get("/",(req,res)=>{
    console.log("hello I am root path.");
    res.send("this is the root.");
});

app.get("/search", (req,res)=>{
    console.log("query parameters received",req.query);
    res.send("no results")
});