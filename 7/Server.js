const express = require("express")
const mongoose = require("mongoose")
const Movie = require("./models/Movie")

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/moviesDB")

app.post("/movies", (req, res) => {
    Movie.create(req.body)
    .then(movie => res.json(movie))
})

app.get("/movies", (req, res) => {
    Movie.find()
    .then(movies => res.json(movies))
})

app.get("/movies/:id", (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => res.json(movie))
})

app.put("/movies/:id", (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(movie => res.json(movie))
})

app.delete("/movies/:id", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(movie => res.json(movie))
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})