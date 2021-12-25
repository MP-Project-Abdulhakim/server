const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRETKEY = process.env.SECRETKEY;
const SALT = Number(process.env.SALT);

const getUsers = (req, res) => {
  userModel
    .find({ isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const signUp = async (req, res) => {
  const { email, password, username } = req.body;
  const saveEmail = email.toLowerCase();
  

const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: saveEmail,
    password: hashedPassword,
    username,
    role: "61c47c6f6dd112b240dd6f46",
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



const logIn = (req, res) => {
  const { username, email, password } = req.body;
  // const saveEmail = email.toLowerCase();

  userModel
    // .findOne({ $or: [{ username }, { email: saveEmail }] })

    .findOne({ $or: [{ username }, { email }] })

    .then(async (result) => {
      if (result) {
        if (email == result.email || username === result.username) {
          const notHashedPassword = await bcrypt.compare(
            password,
            result.password
          );
          if (notHashedPassword) {
            const payload = {
              userId: result._id,
              role: result.role,
            };
            const options = {
              expiresIn: "60m",
            };

            const token = jwt.sign(payload, SECRETKEY, options);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        res.status(404).json("not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { $set: { isDeleted: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("user removed");
      } else {
        res.status(200).json("user does not exist");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};


const updateUser = (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { $set: { email: email } })
    .then((result) => {
      if (result) {
        res.status(200).json("updated");
      } else {
        res.status(404).json(err);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


module.exports = { signUp, logIn, deleteUser, getUsers, updateUser };