const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const scoreKeeper = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");
const body = document.querySelector("body")
const header = document.querySelector("header")
const scoreBox = document.querySelectorAll(".score-div")
let gameStarted = true; //
let guesses = 0;
let matches = 0
let bestScore = localStorage["bestScore"] || "NONE SET"
scoreKeeper.innerText = `SCORE: ${guesses}`
bestScoreElement.innerText = `BEST SCORE: ${bestScore}`

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "indigo",
  "violet",
  "teal",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "indigo",
  "violet",
  "teal"
];

const headerColor = setInterval(function () {
    let rand = Math.random();
    let ind = Math.floor(rand * COLORS.length)
    header.style.color
}, 1250)

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, "card");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


let flippedCards = []; // track cards being flipped over


// TODO: Implement this function!
function handleCardClick(event) {
  // if game is not started alert player and return prematurely
  if(!gameStarted){
    window.alert("The game has not been started. Click start game to play")
    return 
  }

  //at most 2 cards can be flipped over
  if(flippedCards.length < 2){
    //if a card has already been flipped AND the card you are clicking is not the prevously flipped card
    // OR if there aren't any flipped cards -  show the card
    if ((flippedCards[0] && flippedCards[0] != event.target) || !flippedCards[0]){
      flippedCards.push(event.target)
      event.target.classList.remove("card")
      event.target.classList.add("show")
    } 
    // if two cards are flipped update number of guesses and check if they are a match
    if(flippedCards.length == 2){
      guesses += 1
      scoreKeeper.innerText = `SCORE: ${guesses}`

      if (flippedCards[0].classList.value == flippedCards[1].classList.value){
        flippedCards[0].removeEventListener("click", handleCardClick);
        flippedCards[1].removeEventListener("click", handleCardClick);
        flippedCards = [];
        matches += 1
        gameover();
      }
      else{
        setTimeout(()=>{
          flippedCards[0].classList.remove("show")
          flippedCards[1].classList.remove("show")
          flippedCards[0].classList.add("card")
          flippedCards[1].classList.add("card")
          
          flippedCards = [];
        }, 1000)
      } 
    }   
  }

}

startButton.addEventListener("click", ()=> { 
  gameStarted=true
  startButton.classList.add("incomplete")

})

restartButton.addEventListener("click", () => {
  gameStarted = true
  for (let i = gameContainer.childElementCount - 1; i >= 0; i--) {
    gameContainer.children[i].remove()
  }

  guesses = 0;
  matches = 0;
  notification1.remove()
  notification2.remove()
  notification3.remove()
  shuffledColors = shuffle(COLORS)
  createDivsForColors(shuffledColors)
  scoreKeeper.innerText = `SCORE: ${guesses}`
  restartButton.classList.add("incomplete")
  
})


const notification2 = document.createElement("h1");

function gameover(){
  if(matches == COLORS.length/2){
    //make reset button available
    restartButton.classList.remove("incomplete")
    // record score and compare with score in local storage- note lower the score the better
    if (localStorage["bestScore"] && localStorage["bestScore"] > guesses){
      localStorage.setItem("bestScore", guesses)
    } else if (!localStorage["bestScore"]){
      localStorage.setItem("bestScore", guesses)
    }
    bestScoreElement.innerText = `BEST SCORE: ${localStorage["bestScore"]}`
    
    // winning notification

    notification2.innerText = "You Win !!!!";
   
    notification2.style.position = "inherit";
    gameContainer.append(notification2)






  }
}



// when the DOM loads
createDivsForColors(shuffledColors);
