const express = require("express")
const mongoose = require("mongoose")
const Student = require("./models/Student")

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/schoolDB")


app.post("/students",(req,res)=>{
    Student.create(req.body)
    .then(d=>res.json(d))
})

app.get("/students",(req,res)=>{
    Student.find()
    .then(d=>res.json(d))
})

app.get("/students/:id",(req,res)=>{
    Student.findById(req.params.id)
    .then(d=>res.json(d))
})

app.put("/students/:id",(req,res)=>{
    Student.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(d=>res.json(d))
})

app.delete("/students/:id",(req,res)=>{
    Student.findByIdAndDelete(req.params.id)
    .then(()=>res.json({message:"Deleted"}))
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
}) 