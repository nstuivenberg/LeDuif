//TODO Change function below.
function getAllPidgeons() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var receivedJSON = JSON.parse(this.responseText);

            var amount = receivedJSON["pidgeons"].length;

            if(amount > 0) {
                pidgeonArray = receivedJSON["pidgeons"];
                for(var i = 0; i < pidgeonArray.length; i++) {
                    var table = document.getElementById("dataTable");
                    var row = table.insertRow(-1);
                    var cell1 =  row.insertCell(0);
                    cell1.innerHTML = pidgeonArray[i].id;
                    var cell2 =  row.insertCell(1);
                    cell2.innerHTML = pidgeonArray[i].nickname;
                    var cell3 =  row.insertCell(2);
                    cell3.innerHTML = pidgeonArray[i].countryOfOrigin;
                    var cell4 =  row.insertCell(3);
                    cell4.innerHTML = pidgeonArray[i].birthyear;
                    var cell5 =  row.insertCell(4);
                    cell5.innerHTML = pidgeonArray[i].ringnumber;
                    if(pidgeonArray[i].sex == 0) {
                        row.style = "background-color:#ccc;";
                    }
                    var cell6 = row.insertCell(5);
                    cell6.innerHTML = '<a href="#">Edit</a>'
                }
            }
        }
    };
    xhttp.open("GET", "/api/pidgeon/read.php", true);
    xhttp.send();
}