const express = require("express")
const routes = express.Router()
const {login,logout,Signup,authorization} = require("../controller/authController")


// public routes
routes.post('/Signup', Signup)
routes.post('/login',login)
routes.delete('/logout', logout)
routes.post('/authorization', authorization)
// pirvate routes


module.exports = routes
