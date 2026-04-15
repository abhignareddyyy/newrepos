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

app.post("/products",auth,(req,res)=>{
db.collection("products").add(req.body)
.then(r=>res.json({id:r.id}))
.catch(()=>res.send("Error"))
})

app.get("/products",auth,(req,res)=>{
let data=[]
db.collection("products").get()
.then(s=>{
s.forEach(doc=>data.push({id:doc.id,...doc.data()}))
res.json(data)
})
.catch(()=>res.send("Error"))
})

app.get("/products/:id",auth,(req,res)=>{
db.collection("products").doc(req.params.id).get()
.then(doc=>{
if(!doc.exists)return res.send("Not Found")
res.json({id:doc.id,...doc.data()})
})
.catch(()=>res.send("Error"))
})

app.put("/products/:id",auth,(req,res)=>{
db.collection("products").doc(req.params.id).update(req.body)
.then(()=>res.send("Updated"))
.catch(()=>res.send("Error"))
})

app.delete("/products/:id",auth,(req,res)=>{
db.collection("products").doc(req.params.id).delete()
.then(()=>res.send("Deleted"))
.catch(()=>res.send("Error"))
})

app.listen(3000)