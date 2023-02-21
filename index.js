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
// const selectPlayer = document.getElementById("select-player")
// GLOBAL
let playersArray = [
    {
        name: "Vish",
        color: "#000000",
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
    },
    {
        name: "Sue",
        color: "#ff0000",
        maki: 1,
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
    }
]
let selectedColor = ""
const colorsArray = ["#ff00bf", "#C71585", "#ff0000", "#ff4000", "#ffbf00", "#ffd700", "#32CD32", "#008000", "#00bfff", "#00CED1", "#0040ff", "#8000ff", "#bf00ff", "#ccccff", "#808080", "#000000"]
const sushiArray = ["maki", "tempura", "sashimi", "dumpling", "egg-nigiri",	"wasabi-egg-nigiri","salmon-nigiri", "wasabi-salmon-nigiri", "squid-nigiri", "wasabi-squid-nigiri", "pudding"]

// ⬇️ USER INTERFACE ⬇️

// close startGameSection and open playersSetupModal (add players)
addPlayerBtn.addEventListener("click", function() {
    startGameSection.classList.add("none")
    playersSetupModal.classList.remove("none")
    playersSetupModal.classList.add("flex")
    renderPlayersList()
    renderColors()
})

// start game - go to 1st player's card
startGameBtn.addEventListener("click", function() {
    if (playersArray.length === 0) return

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

// handle changing players (called from renderCards())
function handleChangePlayer() {
    const selectPlayer = document.getElementById("select-player")

    // loop through array and add players to drop-down
    for (let i = 0; i < playersArray.length; i++) {
        let playerOption = playersArray[i].name
        let playerElement = document.createElement("option")

        playerElement.textContent = playerOption
        playerElement.value = playerOption
        selectPlayer.appendChild(playerElement)
    }

    // listen for changes to player in drop-down
    selectPlayer.addEventListener("change", function() {
        const selectedPlayer = playersArray.filter(function(playerInArray) {
            return playerInArray.name === selectPlayer.value
        })[0]
        handleSelectPlayer(selectedPlayer)
    })

    // render the selected player
    function handleSelectPlayer(player) {
        renderCards(player)
        handleChangeSelect(player.name)
    }
}

// change the player's name in the drop-down in #select-player (renderCards())
function handleChangeSelect(name) {
    const selectPlayer = document.getElementById("select-player")
    const playerOptions = Array.from(selectPlayer.options)
    const optionToSelect = playerOptions.find(opt => opt.text === name)
    optionToSelect.selected = true
}

function handleSushiCount(player) {
    const sushiCards = document.getElementById("sushi-cards")
    const makiQty = document.getElementById("maki-quantity")
    const tempuraQty = document.getElementById("tempura-quantity")

    sushiCards.addEventListener("click", function(e) {
        // if (e.target.id === `maki-add`) {
        //     player.maki += 1
        //     makiQty.textContent = player.maki
        // } else if (e.target.id === `maki-sub`) {
        //     player.maki -= 1
        //     if (player.maki < 0) {player.maki = 0}
        //     makiQty.textContent = player.maki
        // } else if (e.target.id === `tempura-add`) {
        //     player.tempura += 1
        //     tempuraQty.textContent = player.tempura
        // } else if (e.target.id === `tempura-sub`) {
        //     player.tempura -= 1
        //     if (player.tempura < 0) {player.tempura = 0}
        //     tempuraQty.textContent = player.tempura
        // }
        

        let pieces = ["maki", "tempura", "sashimi", "dumpling"]

        sushiArray.forEach(function(piece) {
            // console.log(piece)
            if (e.target.id === `${piece}-add`) {
                console.log(piece)
                player[piece] += 1
                console.log(player[piece])
                
            }
        })
    })
}

// ⬇️ HELPERS ⬇️

// format sushi names for render onto cards
function formatSushiName(sushi) {
    const sushiName = sushi.toUpperCase().replace(/-/g, " ")
    return sushiName
}

// ⬇️ RENDER THE APP ⬇️

function renderPlayersList() {
    modalPlayerList.innerHTML = ""

    if (playersArray.length === 0) {
        modalPlayerList.innerHTML = "Enter player names and choose player colors."
        return
    }

    playersArray.forEach(function(player) {
        modalPlayerList.innerHTML += `
            <div class="player" style="background-color:${player.color};">
                <span>${player.name}</span>
                <span class="delete-button" data-delete="${player.name}">X</span>
            </div>
        `
    })
}

// render colors for 'add players'
function renderColors() {
    colorsDiv.innerHTML = ""

    colorsArray.forEach(function(color) {
        colorsDiv.innerHTML += `
            <div data-color="${color}" class="color" style="background-color:${color};"></div>
        `
    })
}

// render players for main player screens
function renderCards(player) {
    playerCards.innerHTML = `
        <div class="card-header" style="background-color:${player.color};">
            <select id="select-player" name="select-player"></select>
            <div class="card-score"></div>
        </div>

        <div id="sushi-cards"></div>
    `

    renderSushiCards(player)
    handleChangePlayer()
}

// render players' sushi cards for main player screens
function renderSushiCards(player) {
    const sushiCards = document.getElementById("sushi-cards")
    sushiCards.innerHTML = ""
    // console.log(player)

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
        // console.log(sushiQuantity)

        sushiCards.innerHTML += `
            <div class="sushi ${sushi}">
                <div class="sushi-buttons">
                    <button type="button" id="${sushi}-add">+</button>
                    <button type="button" id="${sushi}-sub">-</button>
                </div>
                <div class="quantity" id="${sushi}-quantity">${sushiQuantity}</div>
                <div class="sushi-name">${formatSushiName(sushi)}</div>
            </div>
        `
    })

    handleSushiCount(player)
}