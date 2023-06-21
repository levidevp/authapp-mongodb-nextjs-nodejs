const express = require("express")
const routes = express.Router()
const {
    login,
    Signup,
    resetlink,
    changepassword,
    User,
} = require("../controller/authController.js")
const {
    Verify, authorization,
} = require("../middleware/verifymiddleware.js")



// public routes
routes.post('/Signup', Signup)
routes.post('/login', login)
routes.post('/Verify', Verify)
routes.post('/resetlink', resetlink)
routes.post('/changepassword', changepassword)

// middleware to protect private routes
routes.post('/User', authorization)

// pirvate routes
routes.post('/User', User)

module.exports = routes