const {cloudinary} = require('../config/cloudinary')
const multer = require('multer')
//  de luu tam thoi len code
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Storage for img
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/images',
    resource_type: 'image',

    // format: async (req, file) => 'png', // supports promises as well
    // public_id: (req, file) => 'computed-filename-using-request',
  },
});
// Storage for audio
const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/audio',
    resource_type: 'video',
    format: 'mp3', // supports promises as well
    // public_id: (req, file) => 'computed-filename-using-request',
  },
});
// Multer upload
const uploadImage = multer({ storage: imageStorage})
const uploadAudio = multer({ storage: audioStorage})
// Upload fiels both img & audio
const uploadFields = multer().fields([
  {name: 'image', maxCount: 1},
  {name: 'audio', maxCount: 1}
])

module.exports = {
  uploadImage,
  uploadAudio,
  uploadFields
}