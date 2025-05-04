const mongoose = require('mongoose');

//connection establishment
main()
    .then((res) => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/test');
}

//creating user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

//converting a user schema into collection
const User = mongoose.model("User", userSchema);

User.find({age: {$gt:30}})
    .then((res) =>{
        console.log(res);
    })
    .catch((err) =>{
        console.log(err);
    });

// const user2 = new User({//creating instance for User
//     name: "lasssi",
//     email: "lasssi@yahoo.in",
//     age: 34,
// });
// user2
//     .save()
//     .then((res) =>{
//         console.log(res);
//     }).catch((err) =>{
//         console.log(err);
// });