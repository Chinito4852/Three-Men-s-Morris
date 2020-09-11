let gameState = "playing";
let phase = "";
let currentPlayer = 0;
let p1PiecesOnBoard = 0;
let p2PiecesOnBoard = 0;
let chosePieceToMove = false;
let pieceToMove = 0;
const MAX_PIECES = 3;

const startGame = function() {
    currentPlayer = 1;
}

const switchPlayer = function() {
    if (currentPlayer == 1) currentPlayer = 2;
    else if (currentPlayer == 2) currentPlayer = 1;
    updateTurnText();
}

const updateTurnText = function() {
    if (currentPlayer == 1) {
        $("#turn-text").text("Player 1's Turn");
        $("#turn-text").removeClass("p2");
        $("#turn-text").addClass("p1");
    }
    else if (currentPlayer == 2) {
        $("#turn-text").text("Player 2's Turn");
        $("#turn-text").removeClass("p1");
        $("#turn-text").addClass("p2");
    }
}

const checkGame = function() {
    // A player wins the game if they have a row or column of pieces
    if (pieceAtCircle(1) == pieceAtCircle(2) && pieceAtCircle(1) == pieceAtCircle(3) && (pieceAtCircle(1) != '0'))
        return pieceAtCircle(1);
    else if (pieceAtCircle(4) == pieceAtCircle(5) && pieceAtCircle(4) == pieceAtCircle(6) && (pieceAtCircle(4) != '0'))
        return pieceAtCircle(4);
    else if (pieceAtCircle(7) == pieceAtCircle(8) && pieceAtCircle(7) == pieceAtCircle(9) && (pieceAtCircle(7) != '0'))
        return pieceAtCircle(7);
    else if (pieceAtCircle(1) == pieceAtCircle(4) && pieceAtCircle(1) == pieceAtCircle(7) && (pieceAtCircle(1) != '0'))
        return pieceAtCircle(1);
    else if (pieceAtCircle(2) == pieceAtCircle(5) && pieceAtCircle(2) == pieceAtCircle(8) && (pieceAtCircle(2) != '0'))
        return pieceAtCircle(2);
    else if (pieceAtCircle(3) == pieceAtCircle(6) && pieceAtCircle(3) == pieceAtCircle(9) && (pieceAtCircle(3) != '0'))
        return pieceAtCircle(3);
    else return '0';
}

// Function to return the player who has a piece at the circle specified by circleNumber
const pieceAtCircle = function(circleNumber) {
    if ($(`#c${circleNumber}`).hasClass("p1")) return "p1";
    else if ($(`#c${circleNumber}`).hasClass("p2")) return "p2";
    else return '0';
}

const circleIsEmpty = function(circleNumber) {
    return pieceAtCircle(circleNumber) == '0';
}

const circlesAreAdjacent = function(c1, c2) {
    if (c1 == 1) {
        if (c2 == 2 || c2 == 4) return true;
    }
    else if (c1 == 2) {
        if (c2 == 1 || c2 == 3 || c2 == 5) return true;
    }
    else if (c1 == 3) {
        if (c2 == 2 || c2 == 6) return true;
    }
    else if (c1 == 4) {
        if (c2 == 1 || c2 == 5 || c2 == 7) return true;
    }
    else if (c1 == 5) {
        if (c2 == 2 || c2 == 4 || c2 == 6 || c2 == 8) return true;
    }
    else if (c1 == 6) {
        if (c2 == 3 || c2 == 5 || c2 == 9) return true;
    }
    else if (c1 == 7) {
        if (c2 == 4 || c2 == 8) return true;
    }
    else if (c1 == 8) {
        if (c2 == 5 || c2 == 7 || c2 == 9) return true;
    }
    else if (c1 == 9) {
        if (c2 == 6 || c2 == 8) return true;
    }
    return false;
}

const hasEmptyAdjacentSpace = function(circleNumber) {
    if (circleNumber == 1) {
        if (circleIsEmpty(2) || circleIsEmpty(4)) return true;
    }
    else if (circleNumber == 2) {
        if (circleIsEmpty(1) || circleIsEmpty(3) || circleIsEmpty(5)) return true;
    }
    else if (circleNumber == 3) {
        if (circleIsEmpty(2) || circleIsEmpty(6)) return true;
    }
    else if (circleNumber == 4) {
        if (circleIsEmpty(1) || circleIsEmpty(5) || circleIsEmpty(7)) return true;
    }
    else if (circleNumber == 5) {
        if (circleIsEmpty(2) || circleIsEmpty(4) || circleIsEmpty(6) || circleIsEmpty(8)) return true;
    }
    else if (circleNumber == 6) {
        if (circleIsEmpty(3) || circleIsEmpty(5) || circleIsEmpty(9)) return true;
    }
    else if (circleNumber == 7) {
        if (circleIsEmpty(4) || circleIsEmpty(8)) return true;
    }
    else if (circleNumber == 8) {
        if (circleIsEmpty(5) || circleIsEmpty(7) || circleIsEmpty(9)) return true;
    }
    else if (circleNumber == 9) {
        if (circleIsEmpty(6) || circleIsEmpty(8)) return true;
    }
    return false;
}

const reset = function() {
    phase = "";
    p1PiecesOnBoard = 0;
    p2PiecesOnBoard = 0;
    chosePieceToMove = false;
    pieceToMove = 0;
    finishedMove = false;
    currentPlayer = 1;
    resetBoard();
    updateTurnText();
    gameState = "playing";
}

const resetBoard = function() {
    for (var i = 1; i <= 9; ++i) {
        $(`#c${i}`).removeClass("p1");
        $(`#c${i}`).removeClass("p2");
    }
}

$(document).ready(function() {
    // Click handler for circles
    $(".circle").click(function() {
        // Do nothing if the game is not active
        console.log($(this).data().number);

        // Allow the player to make a move (if it is valid), then check if the game has been won
        if (gameState === "playing") {
            if (currentPlayer === 1) {
                if (p1PiecesOnBoard < MAX_PIECES) {
                    // The player is allowed to place a piece on any empty circle
                    if (circleIsEmpty($(this).data().number)) {
                        $(this).addClass("p1");
                        p1PiecesOnBoard++;
                        switchPlayer();
                    }
                }
                else {
                    // The player must click on one of their pieces, then click on an 
                    // empty adjacent space.
                    if (!chosePieceToMove) {
                        if ($(this).hasClass("p1") && hasEmptyAdjacentSpace($(this).data().number)) {
                            // The chosen piece must have at least one empty adjacent space
                            pieceToMove = $(this).data().number;
                            $(this).addClass("chosen");
                            chosePieceToMove = true;
                        }
                    }
                    else {
                        if ($(this).data().number == pieceToMove) {
                            // Allow the player to choose a different piece to move
                            $(`#c${pieceToMove}`).removeClass("chosen");
                            pieceToMove = 0;
                            chosePieceToMove = false;
                        }
                        else if (circleIsEmpty($(this).data().number) && circlesAreAdjacent($(this).data().number, pieceToMove)) {
                            // Move the piece if the chosen circle is empty and adjacent
                            $(`#c${pieceToMove}`).removeClass("chosen");
                            $(`#c${pieceToMove}`).removeClass("p1");
                            $(this).addClass("p1");
                            pieceToMove = 0;
                            chosePieceToMove = false;
                            switchPlayer();
                        }
                    }
                }
            }
            else if (currentPlayer === 2) {
                if (p2PiecesOnBoard < MAX_PIECES) {
                    // The player is allowed to place a piece on any empty circle
                    if (circleIsEmpty($(this).data().number)) {
                        $(this).addClass("p2");
                        p2PiecesOnBoard++;
                        switchPlayer();
                    }
                }
                else {
                    // The player must click on one of their pieces, then click on an 
                    // empty adjacent space.
                    if (!chosePieceToMove) {
                        if ($(this).hasClass("p2") && hasEmptyAdjacentSpace($(this).data().number)) {
                            // The chosen piece must have at least one empty adjacent space
                            pieceToMove = $(this).data().number;
                            $(this).addClass("chosen");
                            chosePieceToMove = true;
                        }
                    }
                    else {
                        if ($(this).data().number == pieceToMove) {
                            // Allow the player to choose a different piece to move
                            $(`#c${pieceToMove}`).removeClass("chosen");
                            pieceToMove = 0;
                            chosePieceToMove = false;
                        }
                        else if (circleIsEmpty($(this).data().number) && circlesAreAdjacent($(this).data().number, pieceToMove)) {
                            // Move the piece if the chosen circle is empty and adjacent
                            $(`#c${pieceToMove}`).removeClass("chosen");
                            $(`#c${pieceToMove}`).removeClass("p2");
                            $(this).addClass("p2");
                            pieceToMove = 0;
                            chosePieceToMove = false;
                            switchPlayer();
                        }
                    }
                }
            }
            // Check if the game has been won
            if (checkGame() != '0') {
                gameState = "finished";
                alert(`${checkGame() == "p1" ? "Player 1" : "Player 2"} wins!\nClick Reset to start a new game`);
            }
            
        }
    });
    startGame();
});