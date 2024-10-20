const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "/images/"))
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1]

    const newFileName = require("crypto")
     .randomBytes(64)
     .toString("hex")

    cb(null, `${newFileName}.${extension}`)
  }
})

const upload = multer({ storage })

module.exports = upload