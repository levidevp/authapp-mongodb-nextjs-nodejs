const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usercollection = require("../models/authModel.js");

const Verify = async (req, res) => {
  const {input,HashDigits} = req.body
    if (input) {
      if (HashDigits) {
      let tokenid
      const { authorization } = req.headers
      if (authorization && authorization.startsWith('Bearer')) {
        try {
          tokenid = authorization.split(' ')[1]
          const match = await bcrypt.compare(input,HashDigits);
          if(match){
            const user = await jwt.verify(tokenid, process.env.secertkey)
            const result = await Usercollection.updateOne({
              email:user.email
          }, {
            Verify: true
          });
          if(result){
            res.send({ "status": "success", "message": "null" })
          }else{
            res.send({ "status": "failed", "message": "Sorry something went wrong" })
          }
          }else{
            res.send({ "status": "failed", "message": "Verify code does not match" })
          }
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": `Unauthorized User ${error}` })
        }
      }if (!tokenid) {
        res.send({ "status": "failed", "message": "Unauthorized User, No Token" })
      }
      }else {
        res.send({
          status: "Failed",
          message: "Unauthorized User, No HashDigits"
        })
      }
    }else {
        res.send({
          status: "Failed",
          message: "please fill the field"
        })
      }
}
const authorization = async (req, res,next) => {
  let token
  const {
    authorization
  } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const userjwt = await jwt.verify(token, process.env.secertkey)
      if (userjwt) {
        if (userjwt.Verify == true) {
          req.user = userjwt
          next()
        } else {
          res.send({
            status: "Failed",
            message: "Email is not Verified"
          })
        }
      } else {
        res.send({
          status: "Failed",
          message: "please give correct id"
        })
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  if (!token) {
    res.status(401).send({
      "status": "Failed",
      "message": "Unauthorized User, No Token"
    })
  }
};



module.exports = {
    Verify,
    authorization,
}