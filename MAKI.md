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
        - -3 for that player
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