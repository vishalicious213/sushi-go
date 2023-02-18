// START-GAME SECTION
const startGameSection = document.getElementById("start-game")
const addPlayerBtn = document.getElementById("add-player-btn")
const startGameBtn = document.getElementById("start-game-btn")
// PLAYERS-SETUP-MODAL
const playersSetupModal = document.getElementById("players-setup-modal")
const addPlayerDoneBtn = document.getElementById("add-player-done-btn")
// ADD-PLAYER-FORM
const addPlayerNameInput = document.getElementById("add-player-name")
const submitPlayerBtn = document.getElementById("submit-player-btn")

// ⬇️ USER INTERFACE ⬇️

addPlayerBtn.addEventListener("click", function() {
    console.log("Add Players")
    startGameSection.classList.add("none")
    playersSetupModal.classList.remove("none")
    playersSetupModal.classList.add("flex")
})

addPlayerDoneBtn.addEventListener("click", function() {
    console.log("Done Adding Players")
    playersSetupModal.classList.add("none")
    playersSetupModal.classList.remove("flex")
    startGameSection.classList.remove("none")
    startGameSection.classList.add("flex")
})

submitPlayerBtn.addEventListener("click", function(e) {
    e.preventDefault()
    console.log(addPlayerNameInput.value)
})