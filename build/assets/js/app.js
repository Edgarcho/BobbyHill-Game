(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bear = exports.bear = {
  foodLevel: 10,
  setHunger: function setHunger() {
    var _this = this;

    var hungerInterval = setInterval(function () {
      //bear.setHunger for results
      _this.foodLevel--;
      if (_this.didYouGetEaten() == true) {
        clearInterval(hungerInterval);
        return "You got eaten!";
      }
    }, 1000);
  },
  didYouGetEaten: function didYouGetEaten() {
    if (this.foodLevel > 0) {
      return false;
    } else {
      return true;
    }
  },
  feed: function feed() {
    this.foodLevel = 10;
  }
};

bear.eatSmall = bear.feed(5);
bear.eatMedium = bear.feed(10);
bear.eatLarge = bear.feed(15);
bear.eatYuck = bear.feed(-10);
bear.eatPowerUp = bear.feed(50);
bear.eatSpecialBonus = bear.feed(100);
bear.eatWeirdThing = bear.feed(Math.floor(Math.random() * 20 + 1));

},{}],2:[function(require,module,exports){
"use strict";

var _hungrybear = require("./../js/hungrybear.js");

var fuzzy = _hungrybear.bear;
fuzzy.foodLevel = 10;

$(document).ready(function () {

  fuzzy.setHunger();
  var timer = setInterval(function () {
    $("#food").empty();
    $("#food").append("" + fuzzy.foodLevel);
  }, 1000);

  $("#foodButton").click(function (event) {
    event.preventDefault();
    fuzzy.feed();
  });
});

},{"./../js/hungrybear.js":1}]},{},[2]);
