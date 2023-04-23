
const fs = require("fs")
const path = require("path")

exports.deleteFiles = (files) => {
    for (let item of files) {
        fs.rm(path.join(__dirname, "..", item), { recursive: true }, err => {
            if (err) {
                console.log(err)
            }
        })
    }
}