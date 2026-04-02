const express = require("express");
const admin = require("firebase-admin");
const key = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(key)
});

const db = admin.firestore();
const app = express();

app.use(express.json());

app.post("/students", (req, res) => {
  db.collection("students").add(req.body)
    .then(doc => res.send({ id: doc.id }))
    .catch(err => res.send(err));
});

app.get("/students", (req, res) => {
  let arr = [];
  db.collection("students").get()
    .then(snap => {
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      res.send(arr);
    })
    .catch(err => res.send(err));
});

app.get("/students/:id", (req, res) => {
  db.collection("students").doc(req.params.id).get()
    .then(doc => res.send({ id: doc.id, ...doc.data() }))
    .catch(err => res.send(err));
});

app.put("/students/:id", (req, res) => {
  db.collection("students").doc(req.params.id).update(req.body)
    .then(() => res.send("Updated"))
    .catch(err => res.send(err));
});

app.delete("/students/:id", (req, res) => {
  db.collection("students").doc(req.params.id).delete()
    .then(() => res.send("Deleted"))
    .catch(err => res.send(err));
});

app.listen(3000, () => console.log("Running"));