const fs = require("fs")

function findAbsolute(n) {
    return new Promise((resolve, reject) =>
         {
        if (!isNaN(n) && Number(n) >= 0) {
            resolve("Absolute value!!")
        } else {
            reject("Invalid")
        }
    })
}

async function findResult(n) {
    try {
        let result = await findAbsolute(n)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file")
        return
    }
    findResult(data.trim())
})