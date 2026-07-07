const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main().
    then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6a4287d439bc20c955940a5d" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();
