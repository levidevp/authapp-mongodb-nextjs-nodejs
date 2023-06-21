const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usercollection = require("../models/authModel.js");
const {
  sendEmail
} = require("../utils/sendEmail.js");



const Signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
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
        const token = await jwt.sign({
          email: saveduser.email,
          firstname: saveduser.firstname,
          lastname: saveduser.lastname
        }, process.env.secertkey)

        const Digits = (100000 + Math.floor(Math.random() * 900000)).toString();
        const HashDigits = await bcrypt.hash(Digits, salt)
        res.send({
          "status": "success",
          "token": token,
          "HashDigits": HashDigits
        })
        // sending email
        const emaildata = {
          to: saveduser.email,
          subject: "Verification Wolfer",
          text: `this is your verification code for our website ${Digits}`,
        }
        sendEmail(emaildata.to, emaildata.subject, emaildata.text);
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
      if (user.Verify == true) {
        const match = await bcrypt.compare(password, user.password)
        if ((user.email == email) && match) {
          const token = jwt.sign({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            Verify: user.Verify
          }, process.env.secertkey)
          res.send({
            status: "success",
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
          message: "Email is not Verified"
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

const resetlink = async (req, res) => {
  const {
    email
  } = req.body
  if (email) {
    const user = await Usercollection.findOne({
      email: email
    })
    if (user) {
      try {
        const token = jwt.sign({ userid: user._id }, process.env.secertkeya, { expiresIn: '15m' })
        const link = `http://localhost:3000/reset/${token}`
        const emaildata = {
          to: user.email,
          subject: "Reset Password",
          text: `To reset password the <a herf=${link}>Click here</a>`,
        }
        sendEmail(emaildata.to, emaildata.subject, emaildata.text);
        res.send({
          status: "success",
          message: link
        })
      } catch (error) {
        console.log("----------------------------");
        console.log(error);
        console.log("---------------------------");
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
      message: "please fill the field"
    })
  }
};

const changepassword = async (req, res) => {
  const {
    passworda,
    password_confirmation
  } = req.body
  const {
    token
  } = req.query
  try {
    const jwtid = await jwt.verify(token, process.env.secertkeya)
    if (jwtid.userid) {
      if (passworda && password_confirmation) {
        if (passworda === password_confirmation) {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(passworda, salt)
          await Usercollection.findByIdAndUpdate(jwtid.userid, {
            $set: {
              password: newHashPassword
            }
          })
          res.send({
            "status": "success",
            "message": jwtid.userid
          })
          
        } else {
          res.send({   
            "status": "Failed",
            "message": "New Password and Confirm New Password doesn't match"
          })
        }
      } else {
        res.send({
          "status": "Failed",
          "message": "All Fields are Required"
        })
      }
    } else {
      res.send({
        "status": "Failed",
        "message": "jwt virify does not match"
      })
    }
  } catch (error) {
    res.send({
      "status": "Failed",
      "message": "Invalid Token"
    })
    console.log(error);
  }
}
const User = async (req, res) => {
  try {
    res.send({ "status": "success","user": req.user ,})
  } catch (error) {
    console.log("----------------------------");
    console.log(error);
    console.log("---------------------------");
  }
};






module.exports = {
  Signup,
  login,
  sendEmail,
  resetlink,
  changepassword,
  User,
}