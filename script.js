// Array to hold the sequence of button presses
let gameSequence = [];
let canClick = true;
let currentLevel = 0;
let currentIndex = 0;
let isGameOver = false;

// Function to start the game
function startGame() {
  currentIndex = 0;
  currentLevel++;
  document.querySelector("h1").textContent = "Level " + currentLevel;

  // Generate a random button for the sequence
  const randomIndex = Math.floor(Math.random() * 4);
  canClick = false;

  // Add the corresponding button to the game sequence and play the animation and sound
  const color = getColorFromIndex(randomIndex);
  gameSequence.push(color);
  console.log(gameSequence);
  animateButton(color);
  playSound(color);
}

// Function to get the color from the random index
function getColorFromIndex(index) {
  const colors = ["blue", "green", "red", "yellow"];
  return colors[index];
}

// Function to play sound for buttons
function playSound(color) {
  // Construct the audio URL based on the color index (1-based)
  const audio = new Audio(
    `https://s3.amazonaws.com/freecodecamp/simonSound${
      ["blue", "green", "red", "yellow"].indexOf(color) + 1
    }.mp3`
  );
  audio.play();
}

// Function to play a game over sound
function playGameOverSound() {
  const audio = new Audio("sounds/gameOver.mp3");
  audio.play();
}

// Adds animation to the button when pressed
function animateButton(color) {
  document.querySelector(`.${color}`).classList.add("clicked");

  setTimeout(function () {
    document.querySelector(`.${color}`).classList.remove("clicked");
  }, 100);
}

// Function to reset the game when game over occurs
function resetGame() {
  gameSequence = [];
  canClick = true;
  currentLevel = 0;
  currentIndex = 0;
  isGameOver = false;
  document.querySelector("h1").textContent = "Press Any Key to Start";
  console.log(gameSequence);
}

// Add the click event to all the four buttons
document.querySelectorAll(".button").forEach(function (button) {
  button.addEventListener("click", function (event) {
    const clickedButton = this.id;

    if (clickedButton !== gameSequence[currentIndex]) {
      playGameOverSound();

      canClick = false;
      isGameOver = true;
      document.body.classList.add("game-over");
      document.querySelector("h1").textContent =
        "Game Over, Press any key to restart";

      setTimeout(function () {
        document.body.classList.remove("game-over");
      }, 200);
    } else if (clickedButton === gameSequence[currentIndex]) {
      playSound(clickedButton);
      animateButton(clickedButton);
      currentIndex++;

      // If the player completes the sequence, start the next level
      if (gameSequence.length === currentIndex) {
        setTimeout(function () {
          startGame();
        }, 1000);
      }
    }
  });
});

// Start the game when any key is pressed
document.body.addEventListener("keydown", function () {
  if (canClick) {
    startGame();
  }
  if (isGameOver) {
    resetGame();
  }
});
