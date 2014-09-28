'use strict';
var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var _ = require('lodash');

var sorts = [
  {sid: '1', sname: '水果'},
  {sid: '2', sname: '饮料'},
  {sid: '3', sname: '服装'},
  {sid: '4', sname: '蔬菜'}
];

client.set('sorts', JSON.stringify(sorts));

router.get('/', function (req, res) {
  client.get('sorts', function (err, reply) {
    res.send(reply);
  });
});

router.post('/', function (req, res) {
  var category = req.param('sort');
  client.get('sorts', function (err, reply) {

    var sorts = JSON.parse(reply);
    var isTheRepeat = '';

    _.forEach(sorts, function (sort) {
      if (sort.sname === category.sname) {
        isTheRepeat = sort.sname;
      }
    });

    if (isTheRepeat.toString() === '') {
      var lastId = sorts[sorts.length - 1].sid;
      category.sid = (parseInt(lastId) + 1).toString();
      sorts.push(category);
      client.set('sorts', JSON.stringify(sorts), function (err, reply) {
        res.send(sorts);
      });
    }

  });

});

router.put('/:sid', function (req, res) {
  var sort = req.param('sort');
  var sid = req.params.sid;

  client.get('sorts', function (err, reply) {
    var sorts = JSON.parse(reply);
    var index = _.findIndex(sorts, {'sid': sid});

    sorts[index] = sort;

    client.set('sorts', JSON.stringify(sorts), function (err, reply) {
      res.send(sorts);
    });
  });
});

router.delete('/:sid', function (req, res) {
  client.get('sorts', function (err, reply) {
    var sid = req.params.sid;
    var sorts = JSON.parse(reply);

    var afterDeleteSorts = _.filter(sorts, function (sort) {
      return sort.sid !== sid;
    });

    client.set('sorts', JSON.stringify(afterDeleteSorts), function (err, reply) {
      res.send(reply);
    });
  });
});
module.exports = router;

