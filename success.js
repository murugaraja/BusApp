    var fulldetails = '{"w2" : {"cmpudur" : "02:00 am","kp" : "03:00 am","desure" : "04:00 am"},"narayana" : {"cmpudur" : "01:00 am","kp" : "02:00 am","desure" : "03:00 am"},"w2r" : {"desure" : "04:00 pm","kp" : "06:00 pm","cmpudur" : "08:00 pm"},"narayanar" : {"desure" : "01:00 pm","kp" : "02:00 pm","cmpudur" : "03:00 pm"}}'; 
    
    var fulldetailsObj = JSON.parse(fulldetails);
    var allplaces = [];

    for ( var bus in fulldetailsObj) {
        busName = bus;
        routeDetails = fulldetailsObj[bus];
        for ( var route in routeDetails) {
            a = route;
            b = routeDetails[route].toString();
            allplaces.push(a);
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

    function myFunction() {
        var allplaces1 = eliminateDuplicates(allplaces);
        var sel = document.getElementById('source');
        for (var i = 0; i < allplaces1.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = allplaces1[i];
            opt.value = allplaces1[i];
            sel.appendChild(opt);
        }
document.getElementById("source1").innerHTML = document.getElementById("source").innerHTML;
        fetchTime();
    }

    function fetchTime() {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        document.getElementById("time").innerHTML = h + ":" + m;
    }
    var availableList = [];

    function getDetails() {

        availableList = [];

        var from = document.getElementById("source").value;
        var to = document.getElementById("source1").value;

        var i = 0;

        for ( var bus in fulldetailsObj) {
            busName = bus;
            routeDetails = fulldetailsObj[bus];
            var bfrom;

            var sourceTime;

            for ( var route in routeDetails) {

                a = route;
                b = routeDetails[route].toString();

                if (from == a) {
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
                    bfrom = false;
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

	if(numberOfListItems==0){
		alert("No result found!");
	}

        for (var i = 0; i < numberOfListItems; ++i) {
            var listItem = document.createElement("li");

	    if(i%2==0)
            listItem.className = "list-group-item list-group-item-success";
            else
            listItem.className = "list-group-item list-group-item-danger";

            listItem.innerHTML = availableList[i][1] + " -:- " + availableList[i][0];
            listElement.appendChild(listItem);
        }
    }