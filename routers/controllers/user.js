const userModel = require("./../../db/models/user");
require("dotenv").config();


const SECRETKEY = process.env.SECRETKEY;


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



const logIn = (req, res) => {
  const { username, email, password } = req.body;
  const saveEmail = email.toLowerCase();

  userModel
    .findOne({ email: saveEmail })
    .then(async (result) => {
      if (result) {
        if (saveEmail == result.email || username === result.username) {
          const savePass = (password, result.password);

          if (savePass) {
            const payload = {
              userId: result._id,
            };
            const token = (payload);
            res.status(200).json({ result });
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