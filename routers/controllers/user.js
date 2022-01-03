const userModel = require("./../../db/models/user");
const followModel = require("../../db/models/follow");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
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
  const { email, password, username, role, imgProfile } = req.body;
  const nemail = email.toLowerCase();
  const hashpwd = await bcrypt.hash(password, SALT);
  const characters = "0123456789";
  let activeCode = "";
  for (let i = 0; i < 4; i++) {
    activeCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const newUser = new userModel({
    email: nemail,
    password: hashpwd,
    username,
    imgProfile,
    role,
    activeCode,
  });
  newUser;
  newUser
    .save()
    .then((result) => {
      transport
        .sendMail({
          from: "mg7l@hotmail.com",
          to: nemail,
          subject: "kindly confirm your account",
          html: `<h1>Email confirmation</h1> 
            <h2> Hi ${nemail}</h2> 
            <h4> Code: ${activeCode}</h4> 
            <p> Thank you for registeration , kindly confirm your email by insert code on following link</p>
            <a href="http://localhost:3000/active/${result._id}> click here</a>`,
        })
        .catch((err) => console.log(err));
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const verifyAccount = async (req, res) => {
  const { id, code } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.activeCode == code) {
    userModel
      .findByIdAndUpdate(id, { isActive: true, activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code");
  }
};


const logIn = (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const saveEmail = usernameOrEmail.toLowerCase();

  userModel
    .findOne({
      $or: [{ username: usernameOrEmail }, { email: saveEmail }],
    })

    

    .then(async (result) => {
      console.log(result);
      if (result) {
        if (
          (usernameOrEmail == result.email ||
            usernameOrEmail === result.username) &&
          result.isActive == true
        ) {
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
              expiresIn: "60000000000000000000m",
            };

            const token = jwt.sign(payload, SECRETKEY, options);

            res.status(200).json({ result, token });
          } else {
            res
              .status(400)
              .json("invalid email or password or account not active");
          }
        } else {
          res
            .status(400)
            .json("invalid email or password or account not active");
        }
      } else {
        res.status(404).json("not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const checkEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: result.email,
            subject: "Reset your Password",
            html: `<h1>Reset your Password</h1>
        <h2> Hello ${result.username}</h2>
        <h4>Code:${passwordCode}</h4>
        <a href=http://localhost:3000/reset2/${result._id}> Click here</a>`,
          })
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("worng Code...");
  }
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
  const { email, password, username, imgProfile } = req.body;
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { $set: { email, password, username, imgProfile } })
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

module.exports = {
  signUp,
  logIn,
  deleteUser,
  getUsers,
  updateUser,
  verifyAccount,
  checkEmail,
  resetPassword,
};
