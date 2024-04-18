var express = require('express');
var router = express.Router();
var ejscontroller = require("../model/ejscontroller");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/product", ejscontroller.getAllProduct);
module.exports = router;
