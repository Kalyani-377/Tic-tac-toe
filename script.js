// Select all boxes and buttons
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true = O's turn, false = X's turn

// All possible winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    turnO = true; // O starts first
    enableBoxes(); // clear boxes
    msgContainer.classList.add("hide"); // hide message area
}

// Add click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"; // place O
            turnO = false;
        } else {
            box.innerText = "X"; // place X
            turnO = true;
        }
        box.disabled = true; // disable clicked box
        checkWinner(); // check after every move
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// Enable and clear all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// Show tie message
const showTie = () => {
    msg.innerText = "It's a Tie!";
    msgContainer.classList.remove("hide");
}

// Check for winner or tie
const checkWinner = () => {
    let winnerDeclared = false;

    // Check all winning patterns
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // If all positions are same and not empty
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                winnerDeclared = true;
                showWinner(pos1Val); // show winner
                return; // stop checking
            }
        }
    }

    // If all boxes are filled and no winner
    let allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (!winnerDeclared && allFilled) {
        showTie(); // show tie message
    }
}

// Button events for reset and new game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
