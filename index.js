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
// PLAYER-CARDS (main game)
const playerCards = document.getElementById("player-cards")
// GLOBAL
let playersArray = []
let selectedColor = ""
const colorsArray = ["#ff00bf", "#C71585", "#ff0000", "#ff4000", "#ffbf00", "#ffd700", "#32CD32", "#008000", "#00bfff", "#00CED1", "#0040ff", "#8000ff", "#bf00ff", "#ccccff", "#808080", "#000000"]
const sushiArray = ["maki", "tempura", "sashimi", "dumpling", "egg-nigiri",	"wasabi-egg-nigiri","salmon-nigiri", "wasabi-salmon-nigiri", "squid-nigiri", "wasabi-squid-nigiri", "pudding"]

// ⬇️ USER INTERFACE ⬇️

// close startGameSection and open playersSetupModal (add players)
addPlayerBtn.addEventListener("click", function() {
    startGameSection.classList.add("none")
    playersSetupModal.classList.remove("none")
    playersSetupModal.classList.add("flex")
    renderColors()
})

// start game - go to 1st player's card
startGameBtn.addEventListener("click", function() {
    console.log("Start game")
    startGameSection.classList.add("none")
    playerCards.classList.remove("none")
    playerCards.classList.add("flex")
    renderCards(playersArray[0])
})

// close playersSetupModal and open startGameSection (done adding players)
addPlayerDoneBtn.addEventListener("click", function() {
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

// store selected color in selectedColor
colorsDiv.addEventListener("click", function(e) {
    if (e.target.dataset.color) {
        selectedColor = e.target.dataset.color
    }
})

// ⬇️ EVENT HANDLERS ⬇️

// handle adding new player to player list
function handleAddNewPlayer() {
    // no blank names
    if (!addPlayerNameInput.value) {
        return
    }

    // have to pick a color
    if (!selectedColor) {
        return
    }

    // check if name exists (no duplicates)
    const duplicate = playersArray.filter(function(player) {
        return player.name === addPlayerNameInput.value
    })

    if (duplicate.length > 0) {
        return
    } else {
        playersArray.push({
            name: addPlayerNameInput.value,
            color: selectedColor,
            maki: 0,
            tempura: 0,
            sashimi: 0,
            dumpling: 0,
            eggNigiri: 0,
            salmonNigiri: 0,
            squidNigiri: 0,
            wasabiEggNigiri: 0,
            wasabiSalmonNigiri: 0,
            wasabiSquidNigiri: 0,
            pudding: 0
        })
        addPlayerNameInput.value = ""
        renderPlayersList()
    }
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
            <div class="player" style="background-color:${player.color};">
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

function renderCards(player) {
    playerCards.innerHTML = `
        <div class="card-header" style="background-color:${player.color};">
            <div class="card-name">${player.name}</div>
            <div class="card-score"></div>
        </div>

        <div id="sushi-cards">

        </div>
    `

    renderSushiCards(player)
}

function renderSushiCards(player) {
    const sushiCards = document.getElementById("sushi-cards")
    sushiCards.innerHTML = ""
    console.log(player)

    sushiArray.forEach(function(sushi) {
        const sushiType = function() {
            if (sushi === "dumpling") {return `${player.dumpling}`} else
            if (sushi === "egg-nigiri") {return `${player.eggNigiri}`} else
            if (sushi === "maki") {return `${player.maki}`} else
            if (sushi === "pudding") {return `${player.pudding}`} else
            if (sushi === "salmon-nigiri") {return `${player.salmonNigiri}`} else
            if (sushi === "sashimi") {return `${player.sashimi}`} else
            if (sushi === "squid-nigiri") {return `${player.squidNigiri}`} else
            if (sushi === "tempura") {return `${player.tempura}`} else
            if (sushi === "wasabi-egg-nigiri") {return `${player.wasabiEggNigiri}`} else
            if (sushi === "wasabi-salmon-nigiri") {return `${player.wasabiSalmonNigiri}`} else
            if (sushi === "wasabi-squid-nigiri") {return `${player.wasabiSquidNigiri}`}
        }

        let sushiQuantity = sushiType()
        console.log(sushiQuantity)

        sushiCards.innerHTML += `
            <div class="sushi ${sushi}">
                <div class="sushi-buttons">
                    <button type="button" id="${sushi}-add">+</button>
                    <button type="button" id="${sushi}-sub">-</button>
                </div>
                <div class="quantity">${sushiQuantity}</div>
                <div class="sushi-name">${sushi}</div>
            </div>
        `
    })
}