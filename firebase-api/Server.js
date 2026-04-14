const express=require("express")
const admin=require("firebase-admin")
const jwt=require("jsonwebtoken")

const app=express()
app.use(express.json())

const SECRET="abc123"

admin.initializeApp({
credential:admin.credential.cert(require("./serviceAccountKey.json"))
})

const db=admin.firestore()

app.post("/login",(req,res)=>{
const token=jwt.sign({user:"abhi"},SECRET)
res.json({token})
})

function auth(req,res,next){
const h=req.headers.authorization
if(!h)return res.send("No Token")
try{
jwt.verify(h.split(" ")[1],SECRET)
next()
}catch{
res.send("Invalid Token")
}
}

app.post("/students",auth,(req,res)=>{
db.collection("students").add(req.body)
.then(r=>res.json({id:r.id}))
.catch(()=>res.send("Error"))
})

app.get("/students",auth,(req,res)=>{
let data=[]
db.collection("students").get()
.then(s=>{
s.forEach(doc=>data.push({id:doc.id,...doc.data()}))
res.json(data)
})
.catch(()=>res.send("Error"))
})

app.put("/students/:id",auth,(req,res)=>{
db.collection("students").doc(req.params.id).update(req.body)
.then(()=>res.send("Updated"))
.catch(()=>res.send("Error"))
})

app.delete("/students/:id",auth,(req,res)=>{
db.collection("students").doc(req.params.id).delete()
.then(()=>res.send("Deleted"))
.catch(()=>res.send("Error"))
})

app.listen(3000)