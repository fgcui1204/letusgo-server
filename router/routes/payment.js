'use strict';
var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.delete('/', function (req, res) {
  client.del('cartItems', function (err, reply) {
    res.send(reply);
  });
});
