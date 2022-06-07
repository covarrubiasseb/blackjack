var game = function () {
  // Deck card names and values
  var deck = [
    'AC', 'AS', 'AD', 'AH',
    '2C', '2S', '2D', '2H',
    '3C', '3S', '3D', '3H',
    '4C', '4S', '4D', '4H',
    '5C', '5S', '5D', '5H',
    '6C', '6S', '6D', '6H',
    '7C', '7S', '7D', '7H',
    '8C', '8S', '8D', '8H',
    '9C', '9S', '9D', '9H',
    '0C', '0S', '0D', '0H',
    'JC', 'JS', 'JD', 'JH',
    'QC', 'QS', 'QD', 'QH',
    'KC', 'KS', 'KD', 'KH'
  ];

  var cardAmount = {
    'A': 'Ace',
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '0': 10,
    'J': 10,
    'Q': 10,
    'K': 10
  };

  var types = {
    'C': 'Club',
    'S': 'Spade',
    'D': 'Diamond',
    'H': 'Heart'
  };

  // Generate random indexes to pull from the card. Makes sure
  // the 2 indexes are not the same
  var card1idx = Math.floor(Math.random() * deck.length);
  var card2idx;

  do {
    card2idx = Math.floor(Math.random() * deck.length);
  }
  while (card2idx === card1idx);

  // Deal the cards and remove them from the deck
  // Then show them to the player with the alert function
  var card1 = deck[card1idx];
  var card2 = deck[card2idx];
  deck.splice(card1idx, 1);
  deck.splice(card2idx, 1);

  // total of the cards (account for aces)
  var total = 0;
  var ace1 = true, ace2 = true;
  if (card1[0] !== 'A') {
    total += cardAmount[card1[0]];
    ace1 = false;
  }

  if (card2[0] !== 'A') {
    total += cardAmount[card2[0]];
    ace2 = false;
  }

  if (total === 0) {
    total = 12;
  } else if (ace1 || ace2) {
    if ((total + 11) <= 21) {
      total += 11;
    } else {
      total++;
    }
  }

  var playerCards = [card1, card2]
  // Handle Hit and Stand
  if (total === 21) {
    // player wins
    alert('Your Cards: ' + cardAmount[card1[0]] + ' ' + types[card1[1]] + ', ' + cardAmount[card2[0]] + ' ' + types[card2[1]]);
    var newGame = confirm('21! You win! Start a new game?');
    if (newGame) {
      game();
    }
  } else {

    while (total < 21) {
      // less than 21

      // show player their full deck
      var deckString = "";
      playerCards.forEach(function(card) {
        deckString += cardAmount[card[0]] + " " + types[card[1]] + " ";
      });

      alert("Your Cards: " + deckString);

      var choice = prompt('Your total is ' + total + '. Hit or Stand?').toLowerCase();

      while (choice !== 'hit' && choice !== 'stand') {
        choice = prompt('Your total is ' + total + '. Please type \'Hit\' or \'Stand\'').toLowerCase();
      }

      switch (choice) {
        case 'hit':
          // deal a new card, remove it from the deck, show it to the player
          var newCardIndex = Math.floor(Math.random() * deck.length);
          var newCard = deck[newCardIndex];
          playerCards.push(newCard);
          deck.splice(newCardIndex, 1);
          alert("You draw " + cardAmount[newCard[0]] + " " + types[newCard[1]]);

          // add the new card to total (account for aces)
          total = 0;
          var aces = 0;
          playerCards.forEach(function (card) {
            if (card[0] === 'A') {
              aces++;
            } else {
              total += cardAmount[card[0]];
            }
          });

          if (aces > 1) {
            while (aces > 1) {
              total++;
              aces--;
            }
          }

          if (aces === 1) {
            if ((total + 11) <= 21) {
              total += 11;
            } else {
              total++;
            }
          }
          
          if (total === 21) {
            // player wins
            var newGame = confirm('21! You win! Start a new game?');
            if (newGame) {
              game();
            }
          } else

          if (total > 21) {
            var newGame = confirm(total + ". You bust! Start a new game?");
            if (newGame) {
              game();
            }
          }
          break;

        case 'stand':
          var newGame = confirm(total + '. Not quite enough. Start a new game?');
          total = 22;
          if (newGame) {
            game();
          }
          break;
      }
    }
  }
};

game();