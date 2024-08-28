const userRoute = require("./src/user/routes.user")
const router = require("express").Router()

router.use("/user", userRoute)

module.exports = router