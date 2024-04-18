var express = require('express');
var router = express.Router();
var apimodels = require("../model/apimodels");

const apiStart = (app) => {
     router.get("/getaus", apimodels.getAus);
     router.put("/putnational", apimodels.putNational);

     return app.use("/", router);
};

module.exports = apiStart;
