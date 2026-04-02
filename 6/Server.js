// const http = require("http")

// http.createServer((req, res) => {
//     if (req.url == "/")
//         res.end("Welcome to the homepage")
//     else if (req.url == "/about")
//         res.end("This is the about page")
//     else
//         res.end("Page not found")
// }).listen(3000)

const os = require("os")

console.log("Hostname:", os.hostname())
console.log("Platform:", os.platform())
console.log("Uptime:", os.uptime())
console.log("Total Memory:", (os.totalmem()))
console.log("Free Memory:", (os.freemem()/1024/1024).toFixed(2), "MB")