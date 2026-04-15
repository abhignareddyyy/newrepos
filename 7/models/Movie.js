const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    releaseYear: Number,
    genre: String
})
module.exports = mongoose.model("Movie", movieSchema)