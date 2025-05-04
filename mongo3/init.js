const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "neha",
        to: "prathvi",
        msg: "send me the data",
        created_at: new Date(),
    },
    {
        from: "naman",
        to: "parthiv",
        msg: "hi there this is naman",
        created_at: new Date(),
    },
    {
        from: "niraj",
        to: "prathvi",
        msg: "kal milte hai",
        created_at: new Date(),
    },
    {
        from: "neha",
        to: "pavan",
        msg: "hi I am neha",
        created_at: new Date(),
    },
    {
        from: "ravi",
        to: "parthiv",
        msg: "come to the playground",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);

