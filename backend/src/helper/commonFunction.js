const userModel = require('../models/userModel')
 const uniqueEmail = async (email) => {
    const user = await userModel.findOne({ email: email });
    if (!user) {
        return { error: "user not  exist" }
    }
    return { data: user }
};

function isValidId(id) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
  if(!isValid) {
    return {error: "Please Check Your Id"}
  }
  return true
  }
module.exports={uniqueEmail, isValidId}