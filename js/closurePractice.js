function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

function makeSizer2() {
	document.body.style.fontSize = 16 + 'px';
}

var size12 = new makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

function compareStringCaseInsensitive(string1, string2) {
	var string1LC = string1.toLowerCase();
	var string2LC = string2.toLowerCase();
	var minLength = Math.min(string1.length, string2.length);

	if (string1LC === string2LC) {
		return 0;
	} else {
		var indexComp;
		for (var i = 0; i < minLength; i++) {
			indexComp = string1LC.charCodeAt(i) - string2LC.charCodeAt(i);
			if (indexComp < 0) {
				return -1;
			} else if (indexComp > 0) {
				return 1;
			} else {
				continue;
			}
		}
	}
	
	if (string1.length - string2.length < 0) {
		return -1;
	} else {
		return 1;
	}
}

function compareNames(name1, name2) {
	var lastNameComp = compareStringCaseInsensitive(name1.lastName, name2.lastName);
	if (lastNameComp !== 0) {
		return lastNameComp;
	} else {
		return compareStringCaseInsensitive(name1.firstName, name2.firstName);
	}
}

// for names as strings in "lastName, firstName" format
function compareNames(name1, name2) {
    var name1array = name1.split(", ");
    var name2array = name2.split(", ");
	var lastNameComp = compareStringCaseInsensitive(name1array[0], name2array[0]);
	if (lastNameComp !== 0) {
		return lastNameComp;
	} else {
		return compareStringCaseInsensitive(name1array[1], name2array[1]);
	}
}

var addName = function(array, newName) {
	var nameExists;
	for (var i = 0; i < array.length; i++) {
		nameExists = !Boolean(compareNames(array[i], newName));
		if (nameExists) {
			console.log("name already on list: not added");
			return;
		}
	}
	array.push(newName);
}

function getRelationship(x, y) {
    var errorMessage = 'Can\'t compare relationships because ';
	if (isNaN(x)) {
		if (isNaN(y)) {
			return (errorMessage + x + ' and ' + y + ' are not numbers');
		} else {
			return (errorMessage + x + ' is not a number');
		}
	} else if (isNaN(y)) {
		return (errorMessage + y + ' is not a number');
	} else {
		return compareNumbers(x, y);
	}
}

function compareNumbers(x, y) {
    if (x > y) {
        return ">";
    } else if (x < y) {
        return "<";
    } else {
        return "=";
    }
}

function insertionSort(array, comparatorFunction) {
	if (array.length < 2) {
		return;
	}
	for (var i = 1; i < array.length; i++) {
		var compareElement = array[i];
		for (var j = i; j > 0; j--) {
			var currentElement = array[j - 1];
			if (comparatorFunction(compareElement, currentElement) < 0) {
				array[j] = currentElement;
				array[j - 1] = compareElement;
			} else {
				break;
			}
		}
	}
}

function alphabetizer(names) {
	for (var i = 0; i < names.length; i++) {
		var splitName = names[i].split(" ");
		names[i] = splitName[1] + ", " + splitName[0];
	}
	
	insertionSort(names, compareNames);
}

function totalBytes(results) {
    var stats = Object.getOwnPropertyNames(results.pageStats);
    var bytes = 0;
    for (var i = 0; i < stats.length; i++) {
		if (stats[i].includes("Bytes")) {
	        bytes += Number(results.pageStats[stats[i]]);
			console.log(bytes);
		}
    }
    return bytes;
}

function ruleList(results) {
    var rules = Object.getOwnPropertyNames(results.formattedResults.ruleResults);
    var ruleNames = [];
    for (var i = 0; i < rules.length; i++) {
        var rule = results.formattedResults.ruleResults[rules[i]];
        if (rule.hasOwnProperty("localizedRuleName")) {
            ruleNames.push(rule.localizedRuleName);
        }
    }
    return ruleNames;
}

How numbers are stored in JS (all floating point)
1.25: %1.01 X 2^0
1.5: %1.1 X 2^0
3: %1.1 X 2^1
9: 0 %1.001 X 2^3
