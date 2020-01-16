const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const router = require("./users/user-router")

const server = express()
const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 8000

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api", router)

// general error message
server.use((err, req, res, next) => {
  console.log("Error:", err)
  res.status(500).json({
    message: "Something went wrong",
  })
})

server.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}.`))