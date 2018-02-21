function formLoader() {
    if(!isInsert()) {
        let urlID = getQueryVariable("pid");
        console.log("URLID " + urlID);
        //let pidgeonToUpdate = getAPidgeon(urlID);
        getOnePidgeonAjaxCall(urlID, processPidgeonDataOnUpdate)
        //console.log("Le pidgeon: " + pidgeonToUpdate);

        changeIdOfClassAndAddMessage("messageContainer", "", "Je kunt hier je duif aanpassen");
    }
}


function processPidgeonDataOnUpdate(pidgeonData) {
    console.log("Le process data: " + pidgeonData.nickname);
    document.getElementById("pidgeonName").value = pidgeonData.nickname;
    document.getElementById("pidgeonCountryOfOrigin").value = pidgeonData.countryOfOrigin;
    document.getElementById("pidgeonBirthyear").value = pidgeonData.birthyear;
    document.getElementById("pidgeonRingNumber").value = pidgeonData.ringnumber;
    document.getElementById("pidgeonSex").value = pidgeonData.sex;
}



function changeIdOfClassAndAddMessage(className, idName, message) {
    let classToChange = document.getElementsByClassName(className)[0];
    classToChange.id = idName;
    let textMessage = document.getElementById("topMessage");
    textMessage.innerHTML = message;
}

function isInsert() {
    if(getQueryVariable("pid") === "insert") {
        return true;
    }
    return false;
}

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return  "insert";
}