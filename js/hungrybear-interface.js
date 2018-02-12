import { bear } from './../js/hungrybear.js';

let fuzzy = bear;
//fuzzy.foodLevel = 10;
//fuzzy.sleepLevel = 10;
//fuzzy.moodLevel = 10;
$(document).ready(function() {
  fuzzy.setHunger();
  fuzzy.setSleep();
  fuzzy.setMood();
  let timer = setInterval(() => {
    if(fuzzy.didYouGetEaten()){
    $('.picture').empty().append('<img src="./img/purse.jpg">' + '<h2>Bobby is upset</h2>')
    $("#food").empty();
    $("#sleep").empty();
    $("#mood").empty();
  }
    $("#food").empty().append(`${fuzzy.foodLevel}`);
    $("#sleep").empty().append(`${fuzzy.sleepLevel}`);
    $("#mood").empty().append(`${fuzzy.moodLevel}`);
  }, 1000);

  let clear = setInterval(() => {
    if(fuzzy.didYouGetEaten()) {
      clearInterval(timer);
    }
  }, 1000);

  $("#foodButton").click(function(event){
    event.preventDefault();
    fuzzy.feed();
    });

  $("#sleepButton").click(function(event){
    event.preventDefault();
    fuzzy.putToBed();
    });

  $("#playButton").click(function(event){
    event.preventDefault();
    fuzzy.play();
    });



});
