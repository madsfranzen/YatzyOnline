export default class Dice {
  constructor() {
    this.values = [];
    this.values.length = 5;
    this.throwCount = 0;
    this.holdStatus = [false, false, false, false, false];
    this.results = [
      { name: "1s", value: 0, status: false },
      { name: "2s", value: 0, status: false },
      { name: "3s", value: 0, status: false },
      { name: "4s", value: 0, status: false },
      { name: "5s", value: 0, status: false },
      { name: "6s", value: 0, status: false },
      { name: "onePairs", value: 0, status: false },
      { name: "twoPairs", value: 0, status: false },
      { name: "threePairs", value: 0, status: false },
      { name: "fourPairs", value: 0, status: false },
      { name: "fullHouse", value: 0, status: false },
      { name: "smallStraight", value: 0, status: false },
      { name: "largeStraight", value: 0, status: false },
      { name: "chance", value: 0, status: false },
      { name: "yatzy", value: 0, status: false },
    ];
  }

  getValues = () => this.values;

  getThrowCount = () => this.throwCount;

  resetThrowCount = () => (this.throwCount = 0);

  resetDiceHold = () => (this.holdStatus = [false, false, false, false, false]);

  resetResult = () => {
    for (let i = 0; i < this.results.length; i++) {
      this.results[i].status = false;
      this.results[i].value = 0;
    }
  };

  holdDie = (index) => {
    this.holdStatus[index] = !this.holdStatus[index];
    return this.holdStatus[index];
  };

  throwDice = () => {
    this.throwCount++;
    for (let i = 0; i < this.values.length; i++) {
      if (!this.holdStatus[i]) {
        this.values[i] = Math.floor(Math.random() * 6) + 1;
      }
    }
  };

  sameValuePoints = (value) => {
    let frequency = this.frequency();
    return frequency[value] * value;
  };

  yatzyPoints = () => {
    let frequency = this.frequency();
    return frequency.includes(5) ? frequency[0] * 5 + 50 : 0;
  };

  /**
   * Set the 5 face values of the dice.
   * Precondition: 1 <= values[i] <= 6 for i in [0..4].
   * Note: This method is only to be used in tests.
   */
  setValues(values) {
    this.values = values;
  }

  frequency = () => {
    const frequency = Array(7).fill(0);
    this.values.forEach((value) => frequency[value]++);
    return frequency;
  };

  onePairPoints = () => {
    let frequency = this.frequency();
    for (let i = 6; i >= 0; i--) {
      if (frequency[i] >= 2) {
        return i * 2;
      }
    }
    return 0;
  };

  twoPairPoints = () => {
    const frequency = this.frequency();
    let points = 0;
    let pairCount = 0;
    let i = 6;
    while (pairCount != 2 && i > 0) {
      if (frequency[i] >= 2) {
        points += i * 2;
        pairCount++;
      }
      i--;
    }
    if (pairCount == 2) {
      return points;
    } else return 0;
  };

  threeSamePoints = () => {
    const frequency = this.frequency();
    for (let i = 6; i >= 0; i--) {
      if (frequency[i] >= 3) {
        return i * 3;
      }
    }
    return 0;
  };

  fourSamePoints = () => {
    const frequency = this.frequency();
    for (let i = 6; i >= 0; i--) {
      if (frequency[i] >= 4) {
        return i * 4;
      }
    }
    return 0;
  };

  fullHousePoints = () => {
    const frequency = this.frequency();
    let value3 = 0;
    let value2 = 0;
    for (let i = 0; i < frequency.length; i++) {
      if (frequency[i] == 3) {
        value3 = i;
      }
      if (frequency[i] == 2) {
        value2 = i;
      }
      if (value2 != 0 && value3 != 0) {
        return value2 * 2 + value3 * 3;
      }
    }
    return 0;
  };

  smallStraightPoints = () => {
    const frequency = this.frequency();
    for (let i = 1; i < frequency.length - 1; i++) {
      if (frequency[i] != 1) {
        return 0;
      }
    }
    return 15;
  };

  largeStraightPoints = () => {
    const frequency = this.frequency();
    for (let i = 2; i < frequency.length; i++) {
      if (frequency[i] != 1) {
        return 0;
      }
    }
    return 20;
  };

  chancePoints = () => {
    let sum = 0;
    for (let value of this.values) {
      sum += value;
    }
    return sum;
  };

  getResults = () => {
    for (let i = 0; i < 6; i++) {
      !this.results[i].status &&
        (this.results[i].value = this.sameValuePoints(i + 1));
    }

    !this.results[6].status && (this.results[6].value = this.onePairPoints());
    !this.results[7].status && (this.results[7].value = this.twoPairPoints());
    !this.results[8].status && (this.results[8].value = this.threeSamePoints());
    !this.results[9].status && (this.results[9].value = this.fourSamePoints());
    !this.results[10].status &&
      (this.results[10].value = this.fullHousePoints());
    !this.results[11].status &&
      (this.results[11].value = this.smallStraightPoints());
    !this.results[12].status &&
      (this.results[12].value = this.largeStraightPoints());
    !this.results[13].status && (this.results[13].value = this.chancePoints());
    !this.results[14].status && (this.results[14].value = this.yatzyPoints());

    return this.results;
  };
}
