const User = require("./model.user")
const UserServices = {};

const bcrypt = require("bcrypt");
const { use } = require("./routes.user");



UserServices.registerUser = async ({ name, email, password ,confirmPassword}) => {
  try {
    let newUser = await User.create({ name, email, password,confirmPassword });
    return { status: "OK", data: newUser };
  } catch (error) {
    return { status: "ERR", data: null, error: err };
  }
};



UserServices.registerUser = async ({ name, email, password , confirmPassword}) => {
    try {
  
      const hash = bcrypt.hashSync(password, 10)
      console.log(hash)
      let newUser = await User.create({ name, email, password: hash , confirmPassword})
      return { status: "OK", data: newUser }
  
  
    } catch (err) {
      return { status: "ERR", data: null, error: err }
    }
  
  }

UserServices.registerUser = async ({ name, email, password}) => {
  console.log("hhh")
  try {
    const hash = bcrypt.hashSync(password, 10)
    console.log(hash,"hash")
    let newUser = await User.create({ name, email, password:hash});
    return { status: "OK", data: newUser };
  } catch (error) {
    console.log(error)
    return { status: "ERR", data: null, error: err };
  }
};



UserServices.getUserByEmail = async (email) => {
  try {
    const user = await User.find({ email })
    return { status: "OK", data: user, error: null }
  } catch (err) {
    console.log(err)
    return { status: "ERR", data: [], error: err }
  }

}



UserServices.findUserByEmailAndPassword = async (email, password) => {
  try {
    let user = await User.findOne({ email })
      console.log(user, "user")
    if (user) {
      let { password: hash } = user
      
      let isMatched = bcrypt.compareSync(password, hash)

      if(isMatched){
        return user
      }else{
        return false
      }
    } else {
      return false
    }

  } catch (err) {
    return false
  }


}

//find by email
UserServices.findByEmail  = async(matchField) => {
  return User.findOne(...matchField)
}

//find all user
UserServices.findAllUser = async() =>{
  return User.find({})
}

//find deleted user
UserServices.findDeleted = async(id , updateField, )=>{
  return User.findByIdAndUpdate({_id:id}, {...updateField}, {new: true})
}


//update user
UserServices.updateUser = async (id, {name, email, password}) =>{

  try{
    const hash = bcrypt.hashSync(password, 10)
    console.log(hash,"hash")
    return User.findByIdAndUpdate({_id:id}, {name, email, password:hash})
  }catch(err){
    console.log(err)
  }

}



module.exports = UserServices;