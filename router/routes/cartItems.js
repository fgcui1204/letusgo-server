'use strict';
var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.get('/', function(req, res) {
  client.get('cartItems',function(err,reply){
    res.send(JSON.stringify(reply));
  });
});

module.exports = router;

