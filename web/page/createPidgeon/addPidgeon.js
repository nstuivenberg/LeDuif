/*
TODO
Validate form. Needs to validate with data gotten from back-end. Without server request?
Able to receive error from back end.
Different messages and button/links when inserting or updating
TOCONT
 # Add field for daddy and mommy
 # Let user insert pidgeon ringnumber
 # Let user click on autofill field with available numbers
 # Write the php to do this stuff.
 */

function insertOrUpdate() {
    if(!isInsert()) {
        let urlID = getQueryVariable("pid");
        console.log("URLID " + urlID);
        //let pidgeonToUpdate = getAPidgeon(urlID);
        getOnePidgeonAjaxCall(urlID, processPidgeonDataOnUpdate)
        //console.log("Le pidgeon: " + pidgeonToUpdate);
    }
}

function submitForm() {
    let nickname = document.getElementById("pidgeonName").value;
    let countryOfOrigin = document.getElementById("pidgeonCountryOfOrigin").value;
    let birthyear = document.getElementById("pidgeonBirthyear").value;
    let ringnumber = document.getElementById("pidgeonRingNumber").value;
    let sex = document.getElementById("pidgeonSex").value;

    let pidgeonToAdd = {nickname:nickname, countryOfOrigin:countryOfOrigin,
        birthyear:birthyear, ringnumber:ringnumber, sex:sex};

    if(validateForm(pidgeonToAdd) && isInsert()) {
        sendAjaxPidgeon(pidgeonToAdd, processSendPidgeon);
    } else if(validateForm(pidgeonToAdd) && !isInsert()) {
        pidgeonToAdd["id"] = getQueryVariable("pid");
        updateAjaxPidgeon(pidgeonToAdd, processUpdatePidgeon);
    }
}

/**
 * PLACEHOLDER CODE
 * This function will validate the form before submitting it, in the future
 * @param {Pidgeon} pidgeonToValidate
 * @returns {boolean}
 */
function validateForm(pidgeonToValidate) {
    let pidgeonObject = pidgeonToValidate;
    let isValidated = true;
    //TODO : Add validation
    return isValidated;
}

function processPidgeonDataOnUpdate(pidgeonData) {
    console.log("Le process data: " + pidgeonData.nickname);
    document.getElementById("pidgeonName").value = pidgeonData.nickname;
    document.getElementById("pidgeonCountryOfOrigin").value = pidgeonData.countryOfOrigin;
    document.getElementById("pidgeonBirthyear").value = pidgeonData.birthyear;
    document.getElementById("pidgeonRingNumber").value = pidgeonData.ringnumber;
    document.getElementById("pidgeonSex").value = pidgeonData.sex;
}

function processSendPidgeon(processedPidgeonMessage) {
    console.log("processedpidgeon: " + processedPidgeonMessage);
    if(processedPidgeonMessage === "{\"message\": \"Pidgeon was created\"}") {
        //let message = "Duif met ringnummer: " + pidgeonJSON.ringnumber + " is succevol toegevoerd. Je kunt hieronder nog een duif toevoegen";
        let message = "Success";
        changeIdOfClassAndAddMessage("messageContainer", "messageSucceed", message);
        emptyForm();
    }
}

function processUpdatePidgeon(updatedPidgeonMessage) {
    if(updatedPidgeonMessage === "{\"message\": \"Pidgeon was updated.\"}") {
        let message = "Succesvol geupdate";
        changeIdOfClassAndAddMessage("messageContainer", "messageSucceed", message);
    }
}


function changeIdOfClassAndAddMessage(className, idName, message) {
    let classToChange = document.getElementsByClassName(className)[0];
    classToChange.id = idName;
    let textMessage = document.getElementById("topMessage");
    textMessage.innerHTML = message;
}

function emptyForm() {
    document.getElementById("pidgeonName").value = "";
    document.getElementById("pidgeonCountryOfOrigin").value = "";
    document.getElementById("pidgeonBirthyear").value = "";
    document.getElementById("pidgeonRingNumber").value = "";
    document.getElementById("pidgeonSex").value = "0";
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