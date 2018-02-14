
let arrayOfPidgeons = [];

function pageLoadFunction () {
    arrayOfPidgeons = getAllPidgeonsAjaxCall(processAllPidgeons);
}

function processAllPidgeons(receivedPidgeons) {
    arrayOfPidgeons = receivedPidgeons.pidgeons;


    let table = document.createElement("div");
    table.className += "tableDiv";

    //TODO: Add heading
    
    //TODO: Add rows
}

function buildTableHeading() {
    let tableHeading = document.createElement("div");
    tableHeading.className += "tableHeading";
}

function getAmountOfProperties() {
    let amountOfCells = 0;

    for (let c = 0; c < arrayOfPidgeons.length; c++) {
        let amountofProps = Object.keys(arrayOfPidgeons[c]).length;

        if(amountofProps > amountOfCells) {
            amountOfCells = amountofProps;
        }
    }
    return amountOfCells;
}