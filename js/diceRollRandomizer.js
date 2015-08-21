var main = function() {
	
	function validDiceCount(userEntry) {
		userEntry = Number(userEntry);
		return (!isNaN(userEntry) && isInteger(userEntry) && userEntry >0 && userEntry <7);
	}
	
	function isInteger(number) {
		return (parseInt(number) === number);
	}
	
	function Alert(header, message, buttonLabel) {
		this.render = function() {
			var winWidth = window.outerWidth;
			var winHeight = window.outerHeight;
			var medScreen = (winWidth > 750 && winWidth < 900);
			var smallScreen = (winWidth <= 750);
			
			var popUpBackground = document.getElementById("popUpBackground");
			popUpBackground.style.display = "block";
			popUpBackground.style.width = winWidth + "px";
			popUpBackground.style.height = winHeight + "px";
			
			var popUpBox = document.getElementById("popUpBox");
			popUpBox.style.display = "block";
			
			var boxWidthPercent;
			if (smallScreen) {
				boxWidthPercent = 0.6;
			} else if (medScreen) {
				boxWidthPercent = 0.4;
			} else {
				boxWidthPercent = 0.3;
			}
			
			popUpBox.style.width = (winWidth * boxWidthPercent) + "px";
			popUpBox.style.height = (popUpBox.clientWidth * 0.5) + "px";
			popUpBox.style.left = (winWidth * (0.5 - boxWidthPercent/2)) + "px";
			popUpBox.style.top = (winHeight * 0.3) + "px";
			
			var popUpBoxHeader = document.getElementById("popUpBoxHeader");
			var popUpBoxMessage = document.getElementById("popUpBoxMessage");			
			popUpBoxHeader.innerHTML = header;
			popUpBoxMessage.innerHTML = message;
			document.getElementById("popUpBoxButton").innerHTML = buttonLabel;
			
			popUpBoxMessage.style.height = (popUpBox.clientHeight - 2 * popUpBoxHeader.clientHeight) + "px";
		}
		
		this.ok = function() {
			document.getElementById("popUpBackground").style.display = 'none';
			document.getElementById("popUpBox").style.display = 'none';
		}
	}
	
	function rollDice(){

		var numDice = document.getElementById("numDice").value;
		if (validDiceCount(numDice)) {
			numDice = Number(numDice);
			var diceDisplay = document.getElementById("diceDisplay");
			diceDisplay.innerHTML = "";
	
			for (var i = 1; i <= numDice; i++) {
				var diceFace = Math.round(Math.random()*5 + 1);
				var imgNode = document.createElement('img');
				imgNode.src = "images/dice/dice-#.png".replace("#", diceFace);
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
		} else {
			var invalidEntry = new Alert("Invalid entry", "Please enter a whole number between 1 and 6.", "OK");
			invalidEntry.render();
			window.addEventListener("resize", invalidEntry.render);
			document.getElementById("popUpBoxButton").onclick = function(){
				invalidEntry.ok();
				window.removeEventListener("resize", invalidEntry.render);
			};
		}
	}
	
	var submitButton = document.getElementById('numDiceSubmit');
	submitButton.onclick = rollDice;
	document.getElementById('numDice').addEventListener("keypress", function(event) {
		if (event.keyCode === 13) {
			submitButton.click();
		}
	});
}();