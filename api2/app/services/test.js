// import Multer from "multer";
const Multer = require("multer");
const fs = require('fs');

const multer = Multer({
    storage: Multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, `${__dirname}/audio-files`);
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
// import { google } from "googleapis"; 

const { google } = require("googleapis");

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/thitoeic-e1759066c41a.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};
const uploadToGoogleDrive = async (file, auth) => {
    const fileMetadata = {
      name: file.originalname,
      parents: ["1lN5HCViv7mVHwK3v05XmnQnRr1TfP1fh"], // Change it according to your desired parent folder id
    };
  
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };
  
    const driveService = google.drive({ version: "v3", auth });
  
    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    return response;
  };
  const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
      console.log("file deleted");
    });
  };

  
const test = {
    multer,
    authenticateGoogle,
    uploadToGoogleDrive,
    deleteFile
  };
  module.exports = test;