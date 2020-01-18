const express = require("express")
const bcrypt = require("bcryptjs")
const usersModel = require("./user-model")
const restricted = require("../middleware/restricted")

const router = express.Router()

// Register a user
router.post("/register", async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body)
    
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

// Login a user
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await usersModel.findBy({ username }).first()

    if (!user) {
      return res.status(404).json({
        message: "That user doesn't exist.",
      })
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      req.session.user = user

      res.status(200).json({
        message: `Welcome ${user.username}!`,
      })
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      })
    }
  } catch(err) {
    next(err)
  }
})

// GET all users
router.get("/users", restricted(), async (req, res, next) => {
  try {
    const users = await usersModel.find()

    res.json(users)
  } catch(err) {
    next(err)
  }
})

// GET a user by id
router.get("/users/:id", restricted(), async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.params.id)

    if (!user) {
      res.status(404).json({ message: "That user does not exist." })
    } else {
      res.status(200).json(user)
    }
    
  } catch(err) {
    next(err)
  }
})

// Logout a user
router.get("/logout", restricted(), (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      next(err)
    } else {
      res.json({ message: "You are logged out." })
    }
  })
})


module.exports = router