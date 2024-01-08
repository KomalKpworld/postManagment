const userModel = require("../models/userModel")
const { uniqueEmail } = require("../helper/commonFunction")
const { userCreateSchema, userLoginSchema, isValidId } = require("../validations/userValiation")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
    try {
        const data = req.body;
        if (Object.keys(req.body) == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data", data: null })
        }
        const { error, value } = userCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, msg: error.details[0].message, data: null });
        }
        const { name, email, password, phone_number } = data;
        const emailUnique = await uniqueEmail(email)
        if (emailUnique.data) {
            return res.status(400).send({ status: false, msg: "email already exsit", data: null })
        }
        const hash = bcrypt.hashSync(password, 10);
        const user = await userModel.create({
            name: name,
            email: email,
            password: hash,
            phone_number: phone_number,
        });
        return res.status(201).send({ status: true, msg: "user created successfully", data: user });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "internal server error" })
    }
}
const login = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data
        if (Object.keys(req.body) == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data", data: null })
        }
        const { error, value } = userLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, msg: error.details[0].message, data: null });
        }
        const user = await uniqueEmail(email)
        if (user.error) {
            return res.status(400).send({ status: false, msg: "user not found" });
        }
        const match = await bcrypt.compare(password, user.data.password)
        const token = jwt.sign({ user: user.data._id  }, "login")
        if (!match) {
            return res.status(401).send({ status: false, msg: "user fabriation error" });
        }
        return res.status(200).send({ status: true, msg: "login successfully", data: token });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "internal server error" })
    }
}

module.exports = { signUp, login }