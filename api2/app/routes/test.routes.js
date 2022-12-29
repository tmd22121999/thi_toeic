const { authJwt } = require("../middlewares");
// const controller = require("../controllers/user.controller");
const {
    multer,
    authenticateGoogle,
    uploadToGoogleDrive,
    deleteFile} = require("../services/test");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.post("/upload-file-to-google-drive", multer.single("file"), async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
      }
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      deleteFile(req.file.path);
      res.status(200).json({ response });
    } catch (err) {
      console.log(err);
  }
}
  );
  
};
