if only one high, 6 and allow 2nd place
if more than one high, split and no 2nd place
if 2nd place, 3
if more than one 2nd place, 1 each (up to 3) or 0

// most = 6
// most = 6 (split ties), no 2nd place
// most = 6, 2nd = 3 (split ties)

check if other players have high score
	if no, +6
	if no, mostMaki = true
	if yes get other players
		get # of players
		if 1 player, -6 from player / +3 to both
		if 2 players, -3 from both / +2 to both
		if 3 players, -2 from all / +1 to all
		if 4 players, +1 to last

```javascript
let maxMakiScore = 0
let secondMakiScore = 0
let addMakiPoints = 0 // points to return to current player
let otherHighMakis = []

if (player.maki === 0) {
    console.log("no maki")
    return
}

// get maxMakiScore
// get secondMakiScore

// get players with maxMakiScore highs[]
// get players with secondMakiScore seconds[]

// if highs[] has only 1 player, that player gets 6 points

// if highs[] has 2 players
    // filter through playersArray[] and add both to otherHighMakis[]
    // filter

```

get max maki score

get players with max maki score

- if maxPlayers[] length = 0
    - give player 6 points (points from 0 => 6)
    - add player to maxPlayers[] (length from 0 => 1)
- if maxPlayers[] length = 1
    - check if its current player, if so, return
    - if its another player (points from 6 => 3)
        - -3 for other player
        - +3 for current player
        - add player to maxPlayers[] (length from 1 => 2)
- if maxPlayers[] length = 2
    - check if it includes current player, if so, return
    - other players -1 (points from 3 => 2)
    - player +2
    - add player to maxPlayers[] (length from 2 => 3)
- if maxPlayers[] length = 3
    - check if it includes current player, if so, return
    - other players -1 (points from 2 => 1)
    - player +1
    - add player to maxPlayers[] (length from 3 => 4)
- if maxPlayers[] length = 4
    - check if it includes current player, if so, return
    - player +1
    - add player to maxPlayers[] (length from 4 => 5)


have to figure out how to change current maxPlayers to secondaryPlayers
if new max is achieved and what to do with old secondaryPlayers

---

identify who has current high scores
identify who has current 2nd high scores

save current highs & current 2nds
save previous highs & seconds


if (highs > 0) {
    if (currentHighs = 0) save highs to currentHighs
    if (highs === currentHighs) return 0
    if (highs != currentHighs) {
        if (secondHighs = 0) {
            
            save highs to currentHighs
        }

    }
}



THEN figure out points

```javascript
function calculateMakiScore(player) {
    let maxMakiScore = 0
    let secondMakiScore = 0
    let addMakiPoints = 0
    let subMakiPoints = 0
    let otherHighMakis = []

    if (player.maki === 0) {
        console.log("no maki")
        return
    }

    // get maxMakiScore
    playersArray.map(function(playerInArray) {
        if (playerInArray.maki > maxMakiScore) {
            maxMakiScore = playerInArray.maki
        }
    })
    console.log('maxMakiScore', maxMakiScore)

    // get secondMakiScore
    playersArray.map(function(playerInArray) {
        if (playerInArray.maki > secondMakiScore && playerInArray.maki < maxMakiScore)
            secondMakiScore = playerInArray.maki
    })
    console.log('secondMakiScore', secondMakiScore)

    // get players with maxMakiScore
    const highs = playersArray.filter(function(playerInArray) {
        return playerInArray.maki === maxMakiScore
    })
    console.log('players with maxMakiScore', highs)

    // get players with secondMakiScore
    const seconds = playersArray.filter(function(playerInArray) {
        return playerInArray.maki === secondMakiScore
    })
    console.log('players with secondMakiScore', seconds)

    // check if other players have high score (highs, above)
    // if no, return 6
    if (highs.length === 1) {
        console.log(`${highs[0].name} is only high score`)
        addMakiPoints = 6

        if (otherHighMakis.length > 0 && otherHighMakis[0].name != player.name) {
            console.log("previous highs", otherHighMakis)
            otherHighMakis[0].totalScore -= 6
        }

        // if only 1 high, allow seconds
        if (seconds.length === 1) {
            console.log(`${seconds[0].name} is only 2nd score`)
        }

    }

    // if 1 other, -6 from that player, +3 to both
    if (highs.length === 2) {
        console.log(`highs: ${highs[0].name}, ${highs[1].name}`)
        otherHighMakis = playersArray.filter(function(playerInArray) {
            return playerInArray.maki === maxMakiScore && playerInArray.name != player.name
        })
        console.log("others (2)", otherHighMakis)
        otherHighMakis[0].totalScore -= 3
        addMakiPoints = 3
    }

    // if 2 others, -3 from both, +2 to all 3
    if (highs.length === 3) {
        console.log(`highs: ${highs[0].name}, ${highs[1].name}, ${highs[2].name}`)
        otherHighMakis = playersArray.filter(function(playerInArray) {
            return playerInArray.maki === maxMakiScore && playerInArray.name != player.name
        })
        console.log("others (3)", otherHighMakis)
        otherHighMakis[0].totalScore -= 1
        otherHighMakis[1].totalScore -= 1
        addMakiPoints = 2
    }

    // if 3 others, -2 from all 3, +1 to all 4

    // if 4 players, +1 to last

    return addMakiPoints




    // most = 6
    // most = 6 (split ties), no 2nd place
    // most = 6, 2nd = 3 (split ties)
}
```