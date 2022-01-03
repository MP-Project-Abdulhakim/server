const followModel = require("../../db/models/follow");



const getfollowed = (req, res) => {
  followModel
    .find({})
    .populate("following following")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


// const getfollowed = (req, res) => {
//   const { username } = req.body;
//   followModel
//     .find({ username })
//     // .populate("following")
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });

//   }

const addfollow = (req, res) => {
  const { following } = req.body;
  followModel
    .findOneAndUpdate(
      { username: req.token.userId },
      { $addToSet: { following: following} },
      { upsert: true, new: true }
    )
    .then((result) => {
      followModel
        .findOneAndUpdate(
          { username: following },
          { $addToSet: { followedBy: req.token.userId } },
          { upsert: true }
        )
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



const deletefollow = (req, res) => {
  const { following } = req.body;
  followModel
    .findOneAndUpdate(
      { username: req.token.userId },
      { $pull: { following: following } },
      { upsert: true }
    )
    .then((result) => {
      followModel
        .findOneAndUpdate(
          { username: following },
          { $pull: { followedBy: req.token.userId } },
          { upsert: true }
        )
        .then((result) => {
          res.status(201).json("doneeeee deleted");
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });


    
};


module.exports = { addfollow, deletefollow, getfollowed };
