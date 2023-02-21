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

---

```javascript
let maxMakiScore = 0
let secondMakiScore = 0

if (player.maki === 0) {
    console.log("no maki")
    return
}

// get maxMakiScore
// get secondMakiScore

// get players with maxMakiScore highs[]
// get players with secondMakiScore seconds[]
```