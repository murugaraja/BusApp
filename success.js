var allplaces = [];
var fulldetails;
var fulldetailsObj;
var availableList = [];

// =====0===== Initial call by form 
$(document).ready(function(){
	fulldetailsObj = JSON.parse(bustimingsdata);
	
	for ( var bus in fulldetailsObj) {
		busName = bus;
		routeDetails = fulldetailsObj[bus];
		for ( var route in routeDetails) {
			a = route;
			b = routeDetails[route].toString();
			allplaces.push(a);
		}
	}
})

function myFunction() {
	var allplaces1 = eliminateDuplicates(allplaces);
	allplaces1.sort();
	var sel = document.getElementById('source');
	for (var i = 0; i < allplaces1.length; i++) {
		
		var opt = document.createElement('option');
		opt.innerHTML = allplaces1[i];
		opt.value = allplaces1[i];
		sel.appendChild(opt);
	}
	document.getElementById("destination").innerHTML = document.getElementById("source").innerHTML;
	fetchTime();
}

function getDetails() {
	availableList = [];
	var from = document.getElementById("source").value;
	var to = document.getElementById("destination").value;
	var i = 0;

	for ( var bus in fulldetailsObj) {
		busName = bus;
		routeDetails = fulldetailsObj[bus];
		var bfrom = false;

		var sourceTime;

		for ( var route in routeDetails) {

			a = route;
			b = routeDetails[route].toString();

			if (bfrom== false && from == a) {
				bfrom = true;
				sourceTime = b;
				continue;
			}
			if (bfrom == true) {
				if (to == a) {
					availableList[i] = new Array(2);
					availableList[i][0] = bus;
					availableList[i][1] = sourceTime;
					i++;
				}
			}
		}
	}
	sortTimings();
	makelist();
}

function sorting(a, b) {
	return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
}

function sortTimings() {

	for (i = 0; i < availableList.length - 1; i++) {
		for (j = 0; j < availableList.length - 1; j++) {
			if (availableList.length != 0 && availableList.length != 1) {

				if (sorting(availableList[j][1], availableList[j + 1][1]) > 0) {

					var temp = availableList[j][1];
					var temp1 = availableList[j][0];

					availableList[j][1] = availableList[j + 1][1];
					availableList[j][0] = availableList[j + 1][0];

					availableList[j + 1][1] = temp;
					availableList[j + 1][0] = temp1;
				}
			}
		}
	}
}

function makelist() {

	var listElement = document.getElementById("list");
	listElement.innerHTML = '';
	var numberOfListItems = availableList.length;

	if (numberOfListItems == 0) {
		alert("No result found!");
	} else {
		var listItem = document.createElement("li");
		listItem.className = "list-group-item list-group-item-danger active";
		listItem.innerHTML = " Time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -:- Bus List";
		listElement.appendChild(listItem);
	}

	for (var i = 0; i < numberOfListItems; ++i) {
		var listItem = document.createElement("li");

		if (i % 2 == 0)
			listItem.className = "list-group-item list-group-item-success";
		else
			listItem.className = "list-group-item list-group-item-danger";

		listItem.innerHTML = availableList[i][1] + " -:- "+ availableList[i][0];
		listElement.appendChild(listItem);
	}
}

function eliminateDuplicates(arr) {
	var i, len = arr.length, out = [], obj = {};
	for (i = 0; i < len; i++) {
		obj[arr[i]] = 0;
	}
	for (i in obj) {
		out.push(i);
	}
	return out;
}


function fetchTime() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	document.getElementById("time").innerHTML = h + ":" + m;
}