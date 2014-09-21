'use strict';
var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var items = [
  {barcode:'1', productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克'},
  {barcode:'2', productSort: '水果', productName: '香蕉', productPrice: '5', productUnit: '千克'},
  {barcode:'3', productSort: '饮料', productName: '可乐', productPrice: '5', productUnit: '瓶'},
  {barcode:'4', productSort: '饮料', productName: '雪碧', productPrice: '3', productUnit: '瓶'},
  {barcode:'5', productSort: '服装', productName: 'NIKE鞋', productPrice: '300', productUnit: '双'},
  {barcode:'6', productSort: '服装', productName: '阿迪T恤', productPrice: '200', productUnit: '件'}
];
client.set('items',JSON.stringify(items));
router.get('/', function(req, res) {
  //TODO: Need to implement.
  client.get('items',function(err,reply){
    res.send(JSON.stringify(reply));
  });
});

module.exports = router;

