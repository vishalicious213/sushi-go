// START-GAME SECTION
const startGameSection = document.getElementById("start-game")
const addPlayerBtn = document.getElementById("add-player-btn")
const startGameBtn = document.getElementById("start-game-btn")
// PLAYERS-SETUP-MODAL
const playersSetupModal = document.getElementById("players-setup-modal")
const modalPlayerList = document.getElementById("modal-player-list")
const addPlayerDoneBtn = document.getElementById("add-player-done-btn")
// ADD-PLAYER-FORM
const addPlayerNameInput = document.getElementById("add-player-name")
const submitPlayerBtn = document.getElementById("submit-player-btn")
// GLOBAL
let playersArray = []

// ⬇️ USER INTERFACE ⬇️

addPlayerBtn.addEventListener("click", function() {
    console.log("Add Players")
    startGameSection.classList.add("none")
    playersSetupModal.classList.remove("none")
    playersSetupModal.classList.add("flex")
})

startGameBtn.addEventListener("click", function() {
    console.log("Start game")
})

addPlayerDoneBtn.addEventListener("click", function() {
    console.log("Done Adding Players")
    playersSetupModal.classList.add("none")
    playersSetupModal.classList.remove("flex")
    startGameSection.classList.remove("none")
    startGameSection.classList.add("flex")
})

submitPlayerBtn.addEventListener("click", function() {
    handleAddNewPlayer()
})

// ⬇️ EVENT HANDLERS ⬇️

function handleAddNewPlayer() {
    // no blank names
    if (!addPlayerNameInput.value) {
        return
    }

    // check if name exists (no duplicates)
    const duplicate = playersArray.filter(function(name) {
        if (name === addPlayerNameInput.value) {
            console.log("Name in use")
            console.log(name === addPlayerNameInput.value)
        } else {
            console.log("Name is ok")
            console.log(name === addPlayerNameInput.value)
        }
        return name === addPlayerNameInput.value
    })

    if (duplicate.length > 0) {
        console.log("Not adding to array")
        console.log(duplicate)
        console.log(playersArray)
        return
    } else {
        console.log("Adding to array")
        playersArray.push(addPlayerNameInput.value)
        addPlayerNameInput.value = ""
        console.log(playersArray)
        renderPlayersList()
    }
}

// ⬇️ RENDER THE APP ⬇️

function renderPlayersList() {
    modalPlayerList.innerHTML = ""

    playersArray.forEach(function(player) {
        modalPlayerList.innerHTML += `
            <div class="player">${player}</div>
        `
    })
}