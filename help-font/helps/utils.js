const fs = require("fs");
const path = require("path");

exports.deleteFiles = (files) => {
  return new Promise((resolve, reject) => {
    for (let item of files) {
      fs.rm(path.join(__dirname, "..", item), { recursive: true }, (err) => {
        if (err) {
          reject(err);
        }
        resolve("good");
      });
    }
  });
};
