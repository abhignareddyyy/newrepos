const express=require("express")
const axios=require("axios")
const app=express()

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.post("/weather",(req,res)=>{
    const city=req.body.city
    const apiKey="2039e976caabde4180c639a899e507b6"

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    axios.get(url)
    .then(response=>{
        const data=response.data

        res.render("weather",{
            city:data.name,
            temp:data.main.temp,
            hum:data.main.humidity,
            cond:data.weather[0].description
        })
    })
    .catch(error=>{
        res.send("Error")
    })
})

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})