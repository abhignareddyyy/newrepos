const http = require("http")

http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("Welcome to the homepage")
    } 
    else if (req.url == "/about") {
        res.end("This is the about page")
    } 
    else if (req.url == "/api/data") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({
            name: "Abhigna",
            age: 20,
            city: "Chennai"
        }))
    } 
    else {
        res.end("Page not found")
    }
}).listen(3000)