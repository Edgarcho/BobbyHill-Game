export let bear = {
  foodLevel: 10,
  sleepLevel: 10,
  moodLevel: 10,
  setHunger: function() {
    const hungerInterval = setInterval(() => { //bear.setHunger for results
      this.foodLevel--;
      if (this.didYouGetEaten() == true) {
        clearInterval(hungerInterval);
        return "You got eaten!";
      }
    }, 1000);
  },
  setSleep: function() {
    const sleepInterval = setInterval(() => { //bear.setHunger for results
      this.sleepLevel--;
      if (this.didYouGetEaten() == true) {
        clearInterval(sleepInterval);
        return "You got eaten!";
      }
    }, 1000);
  },
  setMood: function() {
    const moodInterval = setInterval(() => { //bear.setHunger for results
      this.moodLevel--;
      if (this.didYouGetEaten() == true) {
        clearInterval(moodInterval);
        return "You got eaten!";
      }
    }, 1000);
  },
  didYouGetEaten: function() {
    if (this.foodLevel > 0 && this.sleepLevel > 0 && this.moodLevel > 0) {
      return false;
    } else {
      return true;
    }
  },
  feed() {
      this.foodLevel = 10;
    },

  putToBed() {
    this.sleepLevel = 10;
  },

  play() {
    this.moodLevel = 10;
  }
};

bear.eatSmall = bear.feed(5);
bear.eatMedium = bear.feed(10);
bear.eatLarge = bear.feed(15);
bear.eatYuck = bear.feed(-10);
bear.eatPowerUp = bear.feed(50);
bear.eatSpecialBonus = bear.feed(100);
bear.eatWeirdThing = bear.feed(Math.floor((Math.random() * 20) + 1));
