let suits = ["Spades", "Diamonds", "Hearts", "Clubs"];
let values = [
    {word:"Ace", number:10},
    {word:"Two", number:2},
    {word:"Three", number:3},
    {word:"Four", number:4},
    {word:"Five", number:5},
    {word:"Six", number:6},
    {word:"Seven", number:7},
    {word:"Eight", number:8},
    {word:"Nine", number:9},
    {word:"Ten", number:10},
    {word:"Jack", number:10},
    {word:"Queen", number:10},
    {word:"King", number:10}
]

function createDeck(){
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push({
                suit: suits[i],
                value: values[j]
            });
        }
    }
    return deck;
}

function shuffleDeck(deck){
    for (let i = 0; i < deck.length; i++) {
        let rnd = Math.trunc(Math.random() * 52);
        let tmp = deck[i];
        deck[i] = deck[rnd];
        deck[rnd] = tmp;
    }
}

textArea = document.getElementById('text-area');

hitBtn = document.getElementById('hit-btn');
stayBtn = document.getElementById('stay-btn');
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';

let deck,
    dealerCards,
    dealerPoints,
    playerCards, 
    playerPoints;

newGameBtn = document.getElementById('new-game-btn');
newGameBtn.addEventListener('click', function(){
    newGameBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';

    deck = createDeck();
    shuffleDeck(deck);

    dealerCards = [deck.shift(), deck.shift()];
    playerCards = [deck.shift(), deck.shift()];
    dealerPoints = 0;
    playerPoints = 0;
    updateStatus();
});

function updateStatus(){
    dealerPoints = updatePoints(dealerCards);
    playerPoints = updatePoints(playerCards);
    
    let dealerCardsString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardsString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsString += getCardString(playerCards[i]) + '\n';
    }

    textArea.innerText = "Dealer cards:\n" + dealerCardsString + "Points: " + dealerPoints + 
        "\n\nPlayer cards:\n" + playerCardsString + "Points: " + playerPoints;
}

function getCardString(card){
    return card.value.word + " of " + card.suit;
}

function updatePoints(cards){
    let points = 0;
    for(let i = 0; i < cards.length; i++){
        points += cards[i].value.number;
    }
    return points;
}

hitBtn.addEventListener('click', function(){
    playerCards.push(deck.shift());
    updateStatus();
    checkForGameOver();
});

stayBtn.addEventListener('click', function(){
    while(dealerPoints < playerPoints && dealerPoints <= 21){
        dealerCards.push(deck.shift());
        dealerPoints = updatePoints(dealerCards);
    }
    updateStatus();
    if(dealerPoints > 21 || dealerPoints < playerPoints){
        textArea.innerText += "\n PLAYER WON";
    }
    else{
        textArea.innerText += "\n DEALER WON";
    }
    newGameBtn.style.display = 'inline';
    hitBtn.style.display = 'none';
    stayBtn.style.display = 'none';
})

function checkForGameOver(){
    if (playerPoints > 21){
        textArea.innerText += "\n DEALER WON"
        newGameBtn.style.display = 'inline';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    }
    if (playerPoints === 21){
        textArea.innerText += "\n PLAYER WON"
        newGameBtn.style.display = 'inline';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    }
}