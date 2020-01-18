const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const dbConfig = require("./data/db-config")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

const router = require("./users/user-router")

const server = express()
const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 8000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET || "Keep it secret, keep it safe.",
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false // during production, set to true
  },
  store: new KnexSessionStore({
    knex: dbConfig,
    createTable: true,
  })
}))

server.use("/api", router)

// general error message
server.use((err, req, res, next) => {
  console.log("Error:", err)
  res.status(500).json({
    message: "Something went wrong",
  })
})

server.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}.`))