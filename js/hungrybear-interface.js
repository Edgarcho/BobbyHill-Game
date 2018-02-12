import { bear } from './../js/hungrybear.js';

let fuzzy = bear;
fuzzy.foodLevel = 10;

$(document).ready(function() {

  fuzzy.setHunger();
  let timer = setInterval(() => {
    $("#food").empty();
    $("#food").append(`${fuzzy.foodLevel}`);
  }, 1000);

  $("#foodButton").click(function(event){
        event.preventDefault();
        fuzzy.feed();
      })

});
