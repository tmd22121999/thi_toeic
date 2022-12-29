const { authJwt } = require("../middlewares");
const controller = require("../controllers/history.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/history/all", controller.getAllHistory);
  app.post("/api/history/",[authJwt.verifyToken], controller.addHistory);

  app.get("/api/history/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/history/pid/:parentID", controller.getByPID);

  app.get(
    "/api/history/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/history/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
