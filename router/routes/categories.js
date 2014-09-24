'use strict';
var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var sorts = [
  {sid: '1', sname: '水果'},
  {sid: '2', sname: '饮料'},
  {sid: '3', sname: '服装'},
  {sid: '4', sname: '蔬菜'}
];
client.set('sorts',JSON.stringify(sorts));
router.get('/', function(req, res) {
  client.get('sorts',function(err,reply){
    res.send(JSON.stringify(reply));
  });
});

module.exports = router;

