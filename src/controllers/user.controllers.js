const router = require('express').Router();
const fs = require('fs');

const User = require('../models/user.models');
const fileUpload = require('../middlewares/fileUploads');

// endpoint for creating a user

router.post('/', fileUpload.single('profile_pic'), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      profile_pic: req.file.path
    });
    return res.status(201).send(user);
  } catch (err) {
    return res.send({ err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(201).send(user);
  } catch (err) {
    return res.send({ err });
  }
});




// endpoint for updating user

router.patch('/:id', fileUpload.single('profile_pic'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    fs.unlink(user.profile_pic, function (err) {
      if (err && err.code == 'ENOENT') {
        console.info("File doesn't exist!");
      } else if (err) {
        console.error("Error occurred while trying to remove file");
      }
    });
    const updateUser = await User.findByIdAndUpdate(req.params.id,
      {
        first_name: req.body.first_name,
        profile_pic: req.file.path
      },
      { new: true });
    return res.status(201).send(updateUser);
  } catch (err) {
    return res.send({ err });
  }
});

// endpoint to delete a user

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    fs.unlink(user.profile_pic, function (err) {
      if (err && err.code == 'ENOENT') {
        console.info("File doesn't exist!");
      } else if (err) {
        console.error("Error occurred while trying to remove file");
      }
    });
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    return res.status(201).send({ deletedUser });
  } catch (err) {
    return res.send({ err });
  }
});


module.exports = router;