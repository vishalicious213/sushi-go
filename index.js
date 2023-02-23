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
        round1: 0,
        round2: 0,
        round3: 0,
        totalScore: 0,
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
        pudding: 0,
        mostMaki: false,
        secondMaki: false
    },
    {
        name: "Sue",
        color: "#ffbf00",
        round1: 0,
        round2: 0,
        round3: 0,
        totalScore: 0,
        maki: 0,
        tempura: 1,
        sashimi: 0,
        dumpling: 0,
        eggNigiri: 0,
        salmonNigiri: 0,
        squidNigiri: 0,
        wasabiEggNigiri: 0,
        wasabiSalmonNigiri: 0,
        wasabiSquidNigiri: 0,
        pudding: 0,
        mostMaki: false,
        secondMaki: false
    },
    {
        name: "Mika",
        color: "#ff0000",
        round1: 0,
        round2: 0,
        round3: 0,
        totalScore: 0,
        maki: 0,
        tempura: 0,
        sashimi: 1,
        dumpling: 0,
        eggNigiri: 0,
        salmonNigiri: 0,
        squidNigiri: 0,
        wasabiEggNigiri: 0,
        wasabiSalmonNigiri: 0,
        wasabiSquidNigiri: 0,
        pudding: 0,
        mostMaki: false,
        secondMaki: false
    }
]
let selectedColor = ""
let round = 1
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
            round1: 0,
            round2: 0,
            round3: 0,
            totalScore: 0,
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
            pudding: 0,
            mostMaki: false,
            secondMaki: false
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

// increment / decrement sushi, per player
function handleSushiCount(player) {
    const sushiCards = document.getElementById("sushi-cards")

    sushiCards.addEventListener("click", function(e) {
        let newPiece = ""

        // use JS names to find object data for multi-word names
        sushiArray.forEach(function(piece) {
            if (piece === "egg-nigiri") {newPiece = "eggNigiri"}
            if (piece === "wasabi-egg-nigiri") {newPiece = "wasabiEggNigiri"}
            if (piece === "salmon-nigiri") {newPiece = "salmonNigiri"}
            if (piece === "wasabi-salmon-nigiri") {newPiece = "wasabiSalmonNigiri"}
            if (piece === "squid-nigiri") {newPiece = "squidNigiri"}
            if (piece === "wasabi-squid-nigiri") {newPiece = "wasabiSquidNigiri"}

            if (e.target.id === `${piece}-add`) {
                if (player[piece] >= 0) {
                    player[piece] += 1
                    document.getElementById(`${piece}-quantity`).textContent = player[piece]
                } else { // use newPiece for multi-word names
                    player[newPiece] += 1
                    document.getElementById(`${piece}-quantity`).textContent = player[newPiece]
                }
                handleScore(player)
            }

            if (e.target.id === `${piece}-sub`) {
                if (player[piece] >= 0) {
                    player[piece] -= 1
                    if (player[piece] < 0) {player[piece] = 0}
                    document.getElementById(`${piece}-quantity`).textContent = player[piece]
                } else { // use newPiece for multi-word names
                    player[newPiece] -= 1
                    if (player[newPiece] < 0) {player[newPiece] = 0}
                    document.getElementById(`${piece}-quantity`).textContent = player[newPiece]
                }
                handleScore(player)
            }
        })
    })

    // handleScore(player)
}

function handleScore(player) {
    const cardScore = document.getElementById("card-score")
    let total = 0

    let eggNigiriScore = player.eggNigiri
    let salmonNigiriScore = player.salmonNigiri * 2
    let squidNigiriScore = player.squidNigiri * 3
    let wasabiEggNigiriScore = player.wasabiEggNigiri * 3
    let wasabiSalmonNigiriScore = player.wasabiSalmonNigiri * 6
    let wasabiSquidNigiriScore = player.wasabiSquidNigiri * 9
    let dumplingScore = calculateDumplingScore(player.dumpling)
    let tempuraScore = calculateTempuraScore(player.tempura)
    let sashimiScore = calculateSashimiScore(player.sashimi)
    let makiScore = calculateMakiScore(player)

    let scores = [eggNigiriScore, salmonNigiriScore, squidNigiriScore, wasabiEggNigiriScore, wasabiSalmonNigiriScore, wasabiSquidNigiriScore, dumplingScore, tempuraScore, sashimiScore, makiScore]

    scores.forEach(function(score) {
        total += score
    })

    console.log('total', total)
    // calculateMakiScore(player)

    player.totalScore = total
    cardScore.textContent = player.totalScore

    // maki: 0, most = 6, 2nd = 3, split ties
        // most = 6
        // most = 6 (split ties), no 2nd place
        // most = 6, 2nd = 3 (split ties)
    // pudding: 0
}

// ⬇️ HELPERS ⬇️

// format sushi names for render onto cards
function formatSushiName(sushi) {
    const sushiName = sushi.toUpperCase().replace(/-/g, " ")
    return sushiName
}

function calculateDumplingScore(count) {
    let points = 0

    if (count === 1) {
        points = 1
    } else if (count === 2) {
        points = 3
    } else if (count === 3) {
        points = 6
    } else if (count === 4) {
        points = 10
    } else if (count >= 5) {
        points = 15
    }

    return points
}

function calculateTempuraScore(count) {
    const pieces = Math.floor(count / 2)
    return (pieces * 5)
}

function calculateSashimiScore(count) {
    const pieces = Math.floor(count / 3)
    return (pieces * 10)
}

function calculateMakiScore(player) {
    let maxMakiAmount = 0
    let secondMakiAmount = 0
    let currentHighPlayers = []
    let currentSecondPlayers = []

    if (player.maki === 0) {
        console.log("no maki")
        return 0
    }

    // get maxMakiScore
    playersArray.map(function(playerInArray) {
        if (playerInArray.maki > maxMakiAmount) {
            maxMakiAmount = playerInArray.maki
        }
    })
    console.log('maxMakiAmount', maxMakiAmount)

    // get secondMakiScore
    playersArray.map(function(playerInArray) {
        if (playerInArray.maki > secondMakiAmount && playerInArray.maki < maxMakiAmount)
            secondMakiAmount = playerInArray.maki
    })
    console.log('secondMakiAmount', secondMakiAmount)

    if (player.maki < secondMakiAmount) {
        console.log("not enough maki")
        return 0
    }

    // get players with maxMakiScore
    const highs = playersArray.filter(function(playerInArray) {
        return playerInArray.maki === maxMakiAmount
    })
    console.log('players with maxMakiAmount', highs)

    // get players with secondMakiScore
    const seconds = playersArray.filter(function(playerInArray) {
        return playerInArray.maki === secondMakiAmount
    })
    console.log('players with secondMakiAmount', seconds)

    // if someone has a high score
    if (highs.length > 0) {
        if (currentHighPlayers.length === 0) {
            currentHighPlayers.push(highs[0])
            return 6
        }
    }



    // highs has players & currentHighPlayers is empty
    // if (highs.length > 0 && currentHighPlayers.length === 0) {
    //     currentHighPlayers.push(highs[0])
    //     console.log("highs", highs[0])
    //     console.log("curHi's", currentHighPlayers)
    // }



    return 0
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
            <div id="card-score">${player.totalScore}</div>
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