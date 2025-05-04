const express= require ("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));// to get url data from the req.body
app.use(express.json());//to get json data from req.body

app.get("/register", (req,res)=>{
    let {user, password} = req.query;
    res.send(`get response.Welcome ${user}`);
});

app.post("/register", (req,res)=>{
    let {user, passsword} = req.body;//parsing the data from the req.body.
    res.send(`post response.Welcome ${user}`);
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
}); 