const os = require("os")

console.log("Hostname:", os.hostname())
console.log("Platform:", os.platform())
console.log("OS Type:", os.type())
console.log("OS Release:", os.release())
console.log("Architecture:", os.arch())
console.log("Uptime:", os.uptime(), "seconds")

console.log("Total Memory:", (os.totalmem()/1024/1024).toFixed(2), "MB")
console.log("Free Memory:", (os.freemem()/1024/1024).toFixed(2), "MB")

console.log("CPU Cores:", os.cpus().length)
console.log("CPU Model:", os.cpus()[0].model)

console.log("Home Directory:", os.homedir())
console.log("Temp Directory:", os.tmpdir())

console.log("User Name:", os.userInfo().username)

console.log("Network Interfaces:", os.networkInterfaces())