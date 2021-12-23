const userModel = require("./../../db/models/user");
require("dotenv").config();


const SECRETKEY = process.env.SECRETKEY;



const signUp = async (req, res) => {
  const { email, password, username } = req.body;
  const saveEmail = email.toLowerCase();
  const savePass = password

  const newUser = new userModel({
    email: saveEmail,
    password: savePass,
    username,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};




module.exports = { signUp };