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

app.post("/students",auth,async(req,res)=>{
let r=await db.collection("students").add(req.body)
res.json({id:r.id})
})

app.get("/students",auth,async(req,res)=>{
let data=[]
let s=await db.collection("students").get()
s.forEach(doc=>data.push({id:doc.id,...doc.data()}))
res.json(data)
})

app.put("/students/:id",auth,async(req,res)=>{
await db.collection("students").doc(req.params.id).update(req.body)
res.send("Updated")
})

app.delete("/students/:id",auth,async(req,res)=>{
await db.collection("students").doc(req.params.id).delete()
res.send("Deleted")
})

app.listen(3000)