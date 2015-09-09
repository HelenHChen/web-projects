var main = function() {
	
	function rollDice(){

		var numDice = document.getElementById("numDice").value;
		numDice = Number(numDice);
		var diceDisplay = document.getElementById("diceDisplay");
		diceDisplay.innerHTML = "";

		for (var i = 1; i <= numDice; i++) {
			var diceFace = Math.round(Math.random()*5 + 1);
			var imgNode = document.createElement('img');
			imgNode.src = "../images/dice/dice-#.png".replace("#", diceFace);
			imgNode.id = "diceImg";
			diceDisplay.appendChild(imgNode);
			var breakNode = document.createElement('br');
			if (numDice > 3) {
				switch (numDice) {
					case 4:
						if (i%2 === 0) {
							diceDisplay.appendChild(breakNode);
						};
						break;
					default:
						if (i%3 === 0) {
							diceDisplay.appendChild(breakNode);
							break;
						}
				}
			}
		}
	}
	
	var submitButton = document.getElementById('numDiceSubmit');
	submitButton.onclick = rollDice;
	document.getElementById('numDice').addEventListener("change", rollDice);
}();