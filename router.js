const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({ message: "GET/ endpoint successfully called." })
})

module.exports = router