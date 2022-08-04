class Card {
  constructor(face, values) {
    this.values = values;
    this.face = face;
  }
  getvalue() {
    if (!isNaN(this.values)) return this.values;
    else return this.values;
  }
  toString() {
    return  `${this.face.substr(0,1)}${this.values}`
  }
}
class Deck {
  // IV: Any variables the class stores should be declared before the constructor 'private deck = [];' for example.

  constructor() {
    let deck = [];
    let values = this.vaules;
    let face = this.face;
    this.deck = deck;
    values = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

    face = ["Spades", "Hearts", "Diamonds", "Clubs"];
    for (let i = 0; i < face.length; i++) {
      for (let j = 0; j < values.length; j++) {
        deck.push(new Card(face[i], values[j])); // IV: Looks good
      }
    }
  }
  getCard() {
    return this.deck.pop(); // IV: Nice functional wrapper. You could access this.deck.pop() from outside this class, but you did the more correct thing of wrapping it in a function. (Though make sure it's public)
  }
}
class Player {
  constructor() {
    (this.handCount = 0),
      (this.hand = []),
      (this.groups = new Map()),
      (this.numberOfPairs = 0);
  }
  toString() {
    return `${this.hand.map((card)=> card.toString()).join(',')}`
  }
  setGroups(person) {
    for (let i = 0; i < this.hand.length; i++) {
      // console.log(`--- this is the current Hand -- ${JSON.stringify(this.hand)}`)
      
      // console.log(`length ${this.hand.length}`)

     
      let value = this.hand[i].getvalue();
      console.log(`the value of card ${value}`)
      // console.log(` # of card in hand--${i} this is the card --${JSON.stringify(this.hand[i])} `);
      // console.log(
        // ` The current player is --${person}'s --the hand's current card value is-- ${value}`
      // );
      // using a Map to set value to 1 if not in map and increment evey instance it shows up
      const count = this.groups.get(value)
      if (!count) {
        // IV: Good candidate to live in the Player object. Let the player calc the groupings it has.
        this.groups.set(value, 1); // IV: Good use of Map. Though i'm not sure why you need a {val:1} instead of just setting it to 1?            // console.log(players[player].groups);
      } else {
        this.groups.set(value, count + 1)};
      var obj = Object.fromEntries(this.groups);
      var jsonString = JSON.stringify(obj);
      
console.log(`this is the current group ${jsonString}`)
      // console.log(`this the groups ${this.groups}`)
    }
  }

  checkForGroupsOf4() {
    // console.log(` this is the groups ${JSON.stringify(this.groups)}`);
    for (let [key, value] of this.groups.entries()) {
      if (value === 4) {
        // console.log(`Aye! I have a set of ${key}`);
        // puts set down of 4 and which is deleted out of hand
        this.numberOfPairs = +1;
        //players[player].groups.delete(key)
        let indexOfObject = this.hand.findIndex((object) => {
          return object.values == key;
        });
        let result = this.hand.filter((x) => {
          return x !== indexOfObject;
        });
        this.hand = result;
      }
    }
  }

  askPlayerForCard(numPlayers, players, player) {
    let randomPlayer = Math.floor(Math.random() * numPlayers);
    // pick the randomPlayer
    if (randomPlayer === player && randomPlayer === 0) {
      randomPlayer = randomPlayer + 1;
    }
    if (randomPlayer === player && randomPlayer === numPlayers - 1) {
      randomPlayer = randomPlayer - 1;
    }
    console.log(`Player ${player} and RandomPlayer ${randomPlayer}`);
    // distingues the current player's card that has values more than 2 instances in hand and get their key aka value
    let returnedKey = this.groups.forEach((value, key) => {
      if (value > 2) {
        return this.groups.get(key);
      }
    });
    console.log(`groups: ${JSON.stringify(this.groups)}`);
    console.log(`returnedKey  ${returnedKey}`);
    // filters the current player's card values in hand
    let result = this.hand.filter((card) => card.values);

    // console.log(randomPlayer);
   
    // Filter random's ( player 2 or 3) hand that has card.value of the 1st player's card with 2+ entries
    let cardTransfer = players[randomPlayer].hand.filter(
      (card) => card.value === result
    );
    // index of the card that player 1 wants from player #2/3
    let indexOfCard = players[randomPlayer].hand.indexOf(cardTransfer);
    // removes the card from the player 2's hand w/ splice, index of the card/transfer
    let cardFromOtherPlayer = players[randomPlayer].hand.splice(indexOfCard, 1)[0];
    
    // I could also do this. let cardFromOtherPlayer = players[randomPlayer].hand.splice(cardTranfser)
    // puts the card from player 2 in player 1's hand
    // console.log(`this is ${cardTransfer}`)
    this.hand.push(cardFromOtherPlayer)
    // the map should update automatically when that function is called
  }
  whoWon(playerWon, player) {
    // first one to 3 pairs win

    if (this.numberOfPairs === 3) {
      playerWon = player;
      gameOver = true;
      // console.log(` this is player won ${playerWon}`);
    }
  }
}

//book is any of four kind, four aces, four kings or so on
class Game {
  constructor() {
    this.deck = new Deck();
    this.players = new Array();
  }
  play(numPlayers) {
    // IV: The rule of thumb should be no functions greater than 10 lines. If it's bigger than that, keep extracting out sub functions.
    let players = this.players;
    let gameOver = false;
    var playerWon = 0;
    let deck = this.deck;

    for (let player = 0; player < numPlayers; player++) {
      this.players.push(new Player());
      //gives each player 7 cards
      // console.log(`--player ${player}`)
      while (players[player].hand.length < 7) {
        // IV: 3 or 7?
        var card1 = deck.getCard();
        players[player].hand.push(card1);
        // console.log(`initial cards ${JSON.stringify(card1)}`)
      }
    }
    
    while ( gameOver !== true) {
      console.log(`deck -- ${JSON.stringify(deck.getCard())}`)
      for (let player = 0; player < numPlayers; player++) {
        console.log(` player ${player} turn is starting`)
        // console.log(`go fish! Pick up a card!`); //IV: At some point you should handle having the player ask another random player for a card.
        let card = deck.getCard();
        if(!card) {
          return gameOver = false }
          console.log( `card added to their hand ${card.toString()}`)
        // console.log(card)
        // console.log(`pushing card ${JSON.stringify(card)}`)
        players[player].hand.push(card);
        players[player].askPlayerForCard(numPlayers, players, player);
        players[player].setGroups(player);
        players[player].checkForGroupsOf4();
        players[player].whoWon(playerWon, player);
        console.log(`--players hand ${players[player].toString()}`)
      }
    }
  }
}

playGame = () => {
  let newGame = new Game();
  newGame.play(2);
};
playGame(2);
