const router = require('express').Router();
const fs = require('fs');

const Gallery = require('../models/gallery.models');
const fileUpload = require('../middlewares/fileUploads');

// endpoint for uploading multiple files to gallery

router.post('/', fileUpload.array('pictures', 5), async (req, res) => {
  try {
    const filePaths = req.files.map(file => {
      return file.path;
    });
    const gallery = await Gallery.create({
      pictures: filePaths,
      user_id: req.body.user_id
    });
    return res.status(201).send(gallery);
  } catch (err) {
    return res.send({ err: err.message });
  }
});

// deleting the photos from gallery

router.delete('/:userId', async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      user_id: req.params.userId
    });
    gallery.pictures.forEach(file => {
      fs.unlink(file, function (err) {
        if (err && err.code == 'ENOENT') {
          console.info("File doesn't exist!");
        } else if (err) {
          console.error("Error occurred while trying to remove file");
        }
      });
    });
    const deletedGallery = await Gallery.findByIdAndDelete(gallery._id);
    return res.status(201).send({ deletedGallery });
  } catch (err) {
    return res.send({ err: err.message });
  }
});


module.exports = router;