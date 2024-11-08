// DOM elements
const label = document.querySelector("#label")
const score = document.querySelector("#score")
const humanImg = document.querySelector("#human")
const compImg = document.querySelector("#comp")
const buttons = document.querySelector(".choices")
const play = document.querySelector(".play")
const makeMove = document.querySelector("#makeMove")

let humanScore = 0
let computerScore = 0
const choices = ["rock", "scissors", "paper"]
const labelMap = {
  0: "It's a tie!",
  1: "You win this round!",
  2: "You lose this round!"
}
const imgMap = {
  "rock": "images/rock.png",
  "paper": "images/paper.png",
  "scissors": "images/scissors.png"
}

play.addEventListener("click", () => {
  startGame()
})
  
function getComputerChoice() {
  let rand = Math.random();
  if (rand <= 0.33) {
    return "rock"
  }
  else if (rand <= 0.66) {
    return "paper"
  }
  return "scissors"
}

function playRound(human, comp) {
  human = choices.indexOf(human)
  comp = choices.indexOf(comp)

  // Tie
  if (human == comp) {
    return 0
  } 
  // Human wins
  else if ((human  + 1) % 3 == comp) {
    return 1
  }
  // Comp wins
  return 2
}

function updateScore(result) {
  if (result == 1) {
    humanScore++
  }
  else if (result == 2) {
    computerScore++
  }

  score.textContent = `${humanScore}-${computerScore}`
}

function checkEnd() {
  if (humanScore + computerScore === 5) {
    if (humanScore > computerScore) {
      label.textContent = "You won the game!"
    }
    else {
      label.textContent ="You lost the game!"
    }
    endGame()
  }
  return false
}

function startGame() {
  humanScore = 0
  computerScore = 0
  label.textContent = "Fight!"
  score.textContent = `${0}-${0}`
  makeMove.textContent = "Make your move"
  play.textContent = "Restart"
  buttons.removeEventListener("click", game)
  buttons.addEventListener("click", game)
}

function endGame() {
  buttons.removeEventListener("click", game)
  play.textContent = "Play"
  makeMove.textContent = "Click Play to play again"
}

function game(e) {
  let humanChoice = e.target.closest('button').id
  console.log(e.target.closest('button'))
  let compChoice = getComputerChoice()
  let result = playRound(humanChoice, compChoice)
  label.textContent = labelMap[result]
  updateScore(result)
  checkEnd()
  humanImg.setAttribute("src", imgMap[humanChoice])
  compImg.setAttribute("src", imgMap[compChoice])
}

