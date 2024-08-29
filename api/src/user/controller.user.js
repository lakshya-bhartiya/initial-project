const UserServices = require("./services.user")

const jwttoken = require("jsonwebtoken")
require('dotenv').config()
console.log(process.env.TOKEN_SECRET)

const userController = {};
userController.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.send({
      satus: "ERR",
      msg: "name,email,password   are required",
      data: null,
    })
  }

  const { data } = await UserServices.getUserByEmail(email)
  console.log(data)

  if (data.length) {
    return res.send({ status: "ERR", msg: "email already exists", data: null })
  }

  try {
    const createdUser = await UserServices.registerUser({
      name,
      email,
      password,
      confirmPassword
    });
    return res.send({
      status: "OK ",
      msg: "user registered successfully",
      data: createdUser.data,
    });
  } catch (error) {
    return res.send({
      status: " ERR",
      msg: "Something went wrong",
      data: null,
    });
  }
};


userController.loginUser = async (req, res) => {

  // const user = await  UserServices.findUserByEmailAndPassword(email, password)

  // if(user){

  //   var token =jwttoken.sign({_id : user._id}, process.env.TOKEN_SECRET);


  //   res.send({status : "OK", msg:"login successfully", data :token})
  // }else{
  //   res.send({status : "ERR", msg:"Invalid email or password", data : null})
  //   console.log("fgg")
  // }
  const { email, password } = req.body

  try {

    const user = await UserServices.findUserByEmailAndPassword(email, password)

    if (!email) {
      return res.send({ status: "ERR", msg: "email is required", data: null })
    } else if (!password) {
      return res.send({ status: "ERR", msg: "password is required", data: null })
    }
    if(user){
      var token = jwttoken.sign({ _id: user._id }, process.env.TOKEN_SECRET);


      return res.send({ status: "OK", msg: "login successfully", data: token })

    }  else{
      return res.send({ status: "ERR", msg: "Invalid email or password", data: null })
    }
   

  } catch (err) {
    console.log(err)
  }

}

userController.getUserByEmail = async (req, res) => {
  const {email} = req.body
  try {
      const user = await UserServices.findByEmail(email)
       if(!user){
          return res.send({ msg: "user not found", data:null, status: false })
       }
      return res.send({ status: "OK", data: user, error: null })
  } catch (err) {
      console.log(err)
      return res.send({ status: "ERR", data: [], error: err })
    }

}

userController.getAllUser = async(req, res) =>{
  try{
    const getUser = await UserServices.findAllUser()
    if(getUser.length){
      return res.send({ status: "OK", data: getUser, error: null })
    }else{
      return res.send({ status: "err", data: null, msg: "user not found" })
    }
  }catch(err){
    return res.send({ status: "err", data: null, error: err })
  }
}



userController.deletedUser = async(req, res)=>{
  const {id} = req.params
  try{
    const getDeletedUser = await UserServices.findDeleted(id,{$set:{isDeleted: true}} )
    if(getDeletedUser === null){
      return res.send({status : "err", msg : "data not found", data: null})
    }else{
      return res.send({status : "ok", msg : "user deleted", error : null})
    }
  }catch(err){
    return res.send({status : "err", msg : "data not deleted", error : err})
  }
}


module.exports = userController;