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
const colorsDiv = document.getElementById("colors")
const submitPlayerBtn = document.getElementById("submit-player-btn")
// GLOBAL
let playersArray = []
const colorsArray = ["#ff00bf", "#ff0040", "#ff0000", "#ff4000", "#ffbf00", "#ffff00", "#bfff00", "#008000", "#00bfff", "#0040ff", "#4000ff", "#8000ff", "#bf00ff", "#f2f2f2", "#ccccff", "#000000"]

// ⬇️ USER INTERFACE ⬇️

// close startGameSection and open playersSetupModal (add players)
addPlayerBtn.addEventListener("click", function() {
    console.log("Add Players")
    startGameSection.classList.add("none")
    playersSetupModal.classList.remove("none")
    playersSetupModal.classList.add("flex")
    renderColors()
})

// start game - go to 1st player's card
startGameBtn.addEventListener("click", function() {
    console.log("Start game")
})

// close playersSetupModal and open startGameSection (done adding players)
addPlayerDoneBtn.addEventListener("click", function() {
    console.log("Done Adding Players")
    playersSetupModal.classList.add("none")
    playersSetupModal.classList.remove("flex")
    startGameSection.classList.remove("none")
    startGameSection.classList.add("flex")
})

// add new player to player list
submitPlayerBtn.addEventListener("click", function() {
    handleAddNewPlayer()
})

// delete player from player list
modalPlayerList.addEventListener("click", function(e) {
    if (e.target.dataset.delete) {
        handleDeletePlayer(e.target.dataset.delete)
    }
})

colorsDiv.addEventListener("click", function(e) {
    if (e.target.dataset.color && addPlayerNameInput.value) {
        handleAddColor(addPlayerNameInput.value, e.target.dataset.color)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

// handle adding new player to player list
function handleAddNewPlayer() {
    // no blank names
    if (!addPlayerNameInput.value) {
        return
    }

    // check if name exists (no duplicates)
    const duplicate = playersArray.filter(function(player) {
        return player.name === addPlayerNameInput.value
    })

    if (duplicate.length > 0) {
        return
    } else {
        playersArray.push({name: addPlayerNameInput.value})
        addPlayerNameInput.value = ""
        renderPlayersList()
    }
}

// handle assigning a color to a player
function handleAddColor(name, color) {
    console.log(name, color)
}

// handle deleting player from player list
function handleDeletePlayer(player) {
    const playerToRemove = playersArray.filter(function(playerInArray) {
        return playerInArray.name === player
    })[0]

    const removalIndex = playersArray.indexOf(playerToRemove)
    playersArray.splice(removalIndex, 1)
    renderPlayersList()

}

// ⬇️ RENDER THE APP ⬇️

function renderPlayersList() {
    modalPlayerList.innerHTML = ""

    playersArray.forEach(function(player) {
        modalPlayerList.innerHTML += `
            <div class="player">
                <span>${player.name}</span>
                <span class="delete-button" data-delete="${player.name}">X</span>
            </div>
        `
    })
}

function renderColors() {
    colorsDiv.innerHTML = ""

    colorsArray.forEach(function(color) {
        colorsDiv.innerHTML += `
            <div data-color="${color}" class="color" style="background-color:${color};"></div>
        `
    })
}