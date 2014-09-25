'use strict';
var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var _ = require('lodash');

var items = [
  {barcode:'1', productSort: {sid: '1', sname: '水果'}, productName: '苹果', productPrice: '10', productUnit: '千克'},
  {barcode:'2', productSort: {sid: '1', sname: '水果'}, productName: '香蕉', productPrice: '5', productUnit: '千克'},
  {barcode:'3', productSort: {sid: '2', sname: '饮料'}, productName: '可乐', productPrice: '5', productUnit: '瓶'},
  {barcode:'4', productSort: {sid: '2', sname: '饮料'}, productName: '雪碧', productPrice: '3', productUnit: '瓶'},
  {barcode:'5', productSort: {sid: '3', sname: '服装'}, productName: 'NIKE鞋', productPrice: '300', productUnit: '双'},
  {barcode:'6', productSort: {sid: '3', sname: '服装'}, productName: '阿迪T恤', productPrice: '200', productUnit: '件'}
];
client.set('items',JSON.stringify(items));

router.get('/', function(req, res) {
  client.get('items',function(err,reply){
    res.send(reply);
  });
});

router.delete('/:barcode', function(req, res) {
  client.get('items',function(err,reply){
    var barcode = req.params.barcode;
    var items = reply;

    var afterDeleteItems = _.find(items, function (item) {
      console.log(items);
      console.log(item.barcode+'==============');
      return item.barcode !== barcode;
    });
    console.log(afterDeleteItems);
//    client.set('items',JSON.stringify(afterDeleteItems),function(err,reply){
//      res.send(reply);
//    });
  });
});

router.put('/:barcode', function(req, res) {
  var item = req.param('item');
  var barcode = req.params.barcode;

  client.get('items', function (err, reply) {
    var items = JSON.parse(reply);
    var index = _.findIndex(items, {'barcode': barcode});

    items[index] = item;

    client.set('items', JSON.stringify(items), function (err, reply) {
      res.send(items);
    });
  });
});

router.post('/',function(req,res){
  var item = req.param('item');
  client.get('items', function (err, reply) {
    var items = JSON.parse(reply);
    item.barcode = parseInt(items[items.length-1].barcode)+1+'';
    items.push(item);
    console.log(items);
    client.set('items', JSON.stringify(items), function (err, reply) {
      res.send(items);
    });
  });

});
module.exports = router;

