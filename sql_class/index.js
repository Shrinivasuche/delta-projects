const {faker} = require("@faker-js/faker");
const mysql = require("mysql2");
const express= require("express");
const app= express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Shrinivasuche@MySQL101'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password()
  ];
};

//home page
app.get("/", (req, res)=>{
  let q= `SELECT count(*) FROM user`;
  try{
      connection.query(q, (err, result) => {
        if(err) throw err;
        let count = result[0]["count(*)"];
        res.render("home.ejs", {count});
      });
  } catch(err){
    console.log(err);
    res.send("some error in DB");
  }
});

//show users
app.get("/user", (req, res)=> {
  let q= `SELECT * FROM user`;

  try{
    connection.query(q, (err, users) => {
      if(err) throw err;
      // res.send(result);
      res.render("showusers.ejs", {users});
    });
  } catch(err){
    console.log(err);
    res.send("some error in DB");
  }
});

//edit route
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let query = `SELECT * FROM user WHERE id = '${id}'`;

  try{
    connection.query(query, (err, result) => {
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs", {user});
    });
  } catch(err){
    console.log(err);
    res.send("some error in DB");
  }
});

//update(db) route
app.patch("/user/:id", (req, res) => {
  let {id} = req.params;
  let {password: formPass, username: newUsername} = req.body;
  let query = `SELECT * FROM user WHERE id = '${id}'`;
   
  try{
    connection.query(query, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password){
        res.send ("wrong password");
      }else{
        let q2 = `UPDATE user SET username= '${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch(err){
    console.log(err);
    res.send("some error in DB");
  }
});

//create new user -> /user  (POST)

//page to render new.ejs
app.get("/user/new", (req, res) =>{
  res.render("new.ejs");
});

//post request to create user
app.post("/user", (req, res) => {
  let { email, username, password } = req.body;
  if (!email || !username || !password) {
      return res.send("All fields are required!");
  }

  let id = uuidv4();
  let query = `INSERT INTO user (id, email, username, password) VALUES (?, ?, ?, ?)`;

  connection.query(query, [id, email, username, password], (err, result) => {
      if (err) {
          console.log("DB Error:", err); // Logs the error in the console
          return res.send(`Error inserting user: ${err.message}`);
      }
      res.redirect("/user");
  });
});




//delete a user -> /user/:id
// button after the edit user button
app.route("/user/:id")
  .get((req, res) => {
    let { id } = req.params;
    let query = `SELECT * FROM user WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Some error in DB");
      }

      if (result.length === 0) {
        return res.send("User not found!");
      }

      let user = result[0];
      res.render("delete.ejs", { user }); // Render delete page
    });
  })
  .delete((req, res) => {
    let { id } = req.params;
    let { username, password } = req.body;

    let query = `SELECT * FROM user WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Some error in DB");
      }

      if (result.length === 0) {
        return res.send("User not found!");
      }

      let user = result[0];

      if (user.username !== username || user.password !== password) {
        return res.send("Invalid username or password!");
      }

      let deleteQuery = `DELETE FROM user WHERE id = ?`;
      connection.query(deleteQuery, [id], (err, deleteResult) => {
        if (err) {
          console.log(err);
          return res.send("Error deleting user");
        }

        res.send(`User deleted: ${user.username}, Email: ${user.email}`);
      });
    });
  });



app.listen("8080", ()=>{
  console.log("server is listening to port 8080");
});