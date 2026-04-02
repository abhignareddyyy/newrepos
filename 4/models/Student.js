const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
     name : String,
     age : Number,
     class : String,
     grade : String   
    }
)
module.exports = mongoose.model("Student",studentSchema)