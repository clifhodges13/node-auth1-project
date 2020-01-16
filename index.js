const express = require("express")

const router = require("./router")

const server = express()
server.use("/api", router)
server.use(express.json())

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}.`))