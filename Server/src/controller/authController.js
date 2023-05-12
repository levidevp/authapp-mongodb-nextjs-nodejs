const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usercollection = require("../models/authModel.js");


const Signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body
  if (firstname && lastname && email && password) {
    const user = await Usercollection.findOne({
      email: email
    })
    if (!user) {
      try {
        const salt = await bcrypt.genSalt(10)
        const Hashpassword = await bcrypt.hash(password, salt)
        const NewUser = new Usercollection({
          firstname,
          lastname,
          email,
          password: Hashpassword,
        })
        await NewUser.save()
        const saveduser = await Usercollection.findOne({
          email: email
        })
        // creating token
        const token = jwt.sign({
          email: saveduser.email, firstname: saveduser.firstname, lastname: saveduser.lastname 
        }, process.env.secertkey)
        res.send({
          "status": "success",
          "token": token
        })
      } catch (error) {
        console.log("----------------------------");
        console.log(error.message);
        console.log("---------------------------");
      }
    } else {
      res.send({
        "status": "Failed",
        "message": "Email already exists"
      })
    }
  } else {
    res.send({
      "status": "Failed",
      "message": "please fill all field"
    })
  }
}


const login = async (req, res) => {
  const {
    email,
    password
  } = req.body
  if (email && password) {
    const user = await Usercollection.findOne({
      email: email
    })
    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if ((user.email == email) && match) {
        const token = jwt.sign({
          email: user.email, firstname: user.firstname, lastname: user.lastname 
        }, process.env.secertkey)
        res.send({
          status: "success",
          message: "lasmlcm",
          token: token
        })
      } else {
        res.send({
          status: "Failed",
          message: "Email or password is not correct"
        })
      }
    } else {
      res.send({
        status: "Failed",
        message: "Email is not registored"
      })
    }
  } else {
    res.send({
      status: "Failed",
      message: "please fill all field"
    })
  }
};
const authorization = async (req, res) => {
  if (req.body.tokenid) {
    try {
      const userjwt = await jwt.verify(req.body.tokenid, process.env.secertkey)
      if (userjwt) {
        res.send({
          status: "success",
          user:userjwt
        })
      } else {
        res.send({
          status: "Failed",
          message: "please give correct id"
        })
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    res.send({
      status: "Failed",
      message: "pleasae fill all field"
    })
  }
};


const logout = async (req, res) => {
  try {
    console.log("logout");
  } catch (error) {
    console.log("----------------------------");
    console.log(error);
    console.log("---------------------------");
  }
};


module.exports = {
  Signup,
  login,
  logout,
  authorization,
}