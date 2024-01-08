const Joi = require('joi')
const mongoose = require('mongoose');

const userCreateSchema = Joi.object().keys({
  name: Joi.string(),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/),
  email: Joi.string().email(),
  password: Joi.string().max(15).required(),
});

const userUpdateSchema = Joi.object().keys({
  name: Joi.string().optional(),
  profile_image: Joi.string().optional(),
});

const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().optional(),
  password: Joi.string().max(15).required()
});
function isValidId(id) {
  const isValid = mongoose.Types.ObjectId.isValid(id);
if(!isValid) {
  return {error: "Please Check Your Id"}
}
return true
}
module.exports = { userCreateSchema, userUpdateSchema, userLoginSchema, isValidId}