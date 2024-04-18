var express = require("express");
var router = express.Router();
var mongoModel = require("../model/apiMongo");

const apiMongoStart = (app) => {
  router.post("/user", mongoModel.addUser);
  router.get("/getUsers", mongoModel.getUsers);
  router.put("/updateUserById/:id", mongoModel.updateUserById);
  router.delete("/deleteUserById/:id", mongoModel.deleteUserById);
  router.get("/getUserById/:id", mongoModel.getUserById);

  return app.use("/api/v2", router);
};
module.exports = apiMongoStart;