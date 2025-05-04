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

const bookSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
    },
    price:{
        type: Number,
    },
});

const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({
    title: "Mathematics",
    author: "RD Sharma",
    price: 1230
});
book1
    .save()
    .then((res) =>{
        console.log(res);
    }).catch((err) =>{
        console.log(err);
    });