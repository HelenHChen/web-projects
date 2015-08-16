var changeSquaresModule = function () {
	var rowElement = '<div class="row" id="row%data%"></div>';
	var leftRightCol = '<div class="col-xs-1"></div>';
	var squareElement = '<div class="col-xs-2"><div class="square center" id="square%data%"></div></div>';
	var placeholder = "%data%"

	var numRows = 3;
	var numCols = 5;
	var squareSizePercent = 0.99;

	function populateRow(rowNum) {
		var rowString = '#row' + rowNum;
		$(rowString).append(leftRightCol);
		var squareNumStart = rowNum * numCols;
		for (var i = squareNumStart; i < squareNumStart + numCols; i++) {
			var insertSquare = squareElement.replace(placeholder, i);
			$(rowString).append(insertSquare);
		}
		$(rowString).append(leftRightCol);
	}

	function setSquareSize(percentOfParent) {
		var columnInnerWidth = $('.col-xs-2').innerWidth();
		var squarePadding = (columnInnerWidth * (1 - percentOfParent)) / 2;
		var squareElementWidth = columnInnerWidth * percentOfParent;
		$('.square').css("width", percentOfParent*squareElementWidth);
		$('.square').css("height", percentOfParent*squareElementWidth);
	
		$('.col-xs-2').css("padding", squarePadding);
	}

	function populatePage() {
		for (var i = 0; i < numRows; i++) {
			var insertRow = rowElement.replace(placeholder, i);
			$('.container-fluid').append(insertRow);
			populateRow(i);
		}
		setSquareSize(squareSizePercent);
	}

	function getRGBValArray(element) {
		var rgbString = window.getComputedStyle(element).getPropertyValue("background-color");
		var color = rgbString.replace(/[^0-9 ]/ig, "");
		//var color = rgbString.replace(/rgb\(/ig,"");
		//color = color.replace(/[,)]/ig,"");
		color = color.split(" ");
	
		for (var i = 0; i < color.length; i++) {
			color[i] = parseInt(color[i]);
		}
	
		return color;
	}

	function getColorHexString(RGBArray) {
		var colorHex = '#';
		for (var i = 0; i < 3; i++) {
			var appendHex = RGBArray[i].toString(16);
			if (appendHex.length < 2) {
				appendHex = "0" + appendHex
			}
			colorHex += appendHex;
		}
		return colorHex;
	}

	function changeSquareColor(element) {
		return function() {
			var color = getRGBValArray(element);
			var incrementVal = 51;
			color[2] += incrementVal;
			for (var i = 2; i > 0; i--) {
				if (color[i]>255) {
					color[i] = 0;
					color[i-1] += incrementVal;				
				}
			}
			if (color[0]>255) {
				color[0] = 0;
			}
		
			element.style.backgroundColor = getColorHexString(color);
		}
	}

	function changeSquareGrey(element) {
		return function() {
			var color = getRGBValArray(element);
			var incrementVal = 16;
			var power = color[0] + incrementVal;
			if (power >= 255) {
				power = 0;
			}
			for (var i = 0; i < 3; i++) {
				color[i] = power;
			}
		
			element.style.backgroundColor = getColorHexString(color);
		}
	}

	function createMouseOverListener(colorChangeFunction) {
		return function() {
			for (var i = 0; i < numRows*numCols; i++) {
				var elem = document.getElementById('square'+i);
				elem.onmouseover = colorChangeFunction(elem);
			}
		}
	}

	populatePage();
	window.onresize = function() {setSquareSize(squareSizePercent)};
	document.getElementById('greyShades').onclick = createMouseOverListener(changeSquareGrey);
	document.getElementById('multiColor').onclick = createMouseOverListener(changeSquareColor);
	document.getElementById('greyShades').click();
}();