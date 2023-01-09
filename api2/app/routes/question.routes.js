const { authJwt } = require("../middlewares");
const controller = require("../controllers/question.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/question/all", controller.getAllQuestion);

  app.post("/api/question", controller.CreateNewQuestion);
  app.post("/api/question/:Id", controller.UpdateQuestion);
  app.delete("/api/question/:ID", controller.DeleteQuestionById);

  app.get("/api/question/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/question/pid/:parentID", controller.getByPID);

  app.get(
    "/api/question/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/question/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
