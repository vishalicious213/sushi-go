const startGameSection = document.getElementById("start-game")
const addPlayerBtn = document.getElementById("add-player-btn")
const startGameBtn = document.getElementById("start-game-btn")
const playersSetupModal = document.getElementById("players-setup-modal")
const addPlayerDoneBtn = document.getElementById("add-player-done-btn")

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