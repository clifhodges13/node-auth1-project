module.exports = () => {
  return async (req, res, next) => {
    console.log(req.session)
    if(!req.session || !req.session.user) {
      return res.status(401).json({ message: "Invalid Credentials" })
    }

    next()
  }
}