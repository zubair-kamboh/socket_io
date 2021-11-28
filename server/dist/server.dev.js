"use strict";

// os
var os = require('os');

var path = require('path');

var car = require('./car');

var fs = require('fs');

var toyota = new car('toyota', 2015); // console.log(toyota.age())
// console.log(__filename, __dirname)
// fs module

fs.mkdir(path.join(__dirname, 'test'), {}, function (err) {
  if (err) throw err;
  console.log('folder created...');
});