const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../userUploads'));
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now();
    cb(null, uniquePrefix + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:

  // To accept the file pass `true`, like so:
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const options = {
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
};


module.exports = multer(options);