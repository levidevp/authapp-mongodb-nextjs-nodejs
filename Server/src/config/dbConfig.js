const mongoose = require('mongoose');

async function connection() {
    try {
        await mongoose.connect(process.env.dbURI)
        console.log("connection successful");
    } catch (error) {
        console.log("connection error");
    }
}
module.exports = {
    connection
}