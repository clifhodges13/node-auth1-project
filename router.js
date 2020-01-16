const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({ message: "GET/api endpoint successfully called." })
})

router.get("/users", (req, res) => {
  res.status(200).json({ message: "GET/api/users endpoint successfully called." })
})

module.exports = router