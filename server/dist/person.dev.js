"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Car = function Car(name, year) {
  _classCallCheck(this, Car);

  this.name = name;
  this.year = year;
};

var toyota = new Car('toyota', 40);
module.exports = Car;