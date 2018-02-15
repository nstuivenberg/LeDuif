
let arrayOfPidgeons = [];

function pageLoadFunction () {
    arrayOfPidgeons = getAllPidgeonsAjaxCall(processAllPidgeons);
}

function processAllPidgeons(receivedPidgeons) {
    arrayOfPidgeons = receivedPidgeons.pidgeons;


    let table = document.createElement("div");
    table.className += "tableDiv";

    //TODO: Add heading
    table.appendChild(buildTableHeading());
    
    //TODO: Add rows
    for (let i = 0; i < arrayOfPidgeons.length; i++) {
        table.appendChild(buildTableRow(arrayOfPidgeons[i]));
    }

    document.getElementById("tableHolder").appendChild(table);

}

function buildTableHeading() {
    let tableHeading = document.createElement("div");
    tableHeading.className += "tableHeading";

    let a = arrayOfPidgeons[0];

    Object.keys(a).forEach(function (key) {
        tableHeading.appendChild(buildTableCell(key));
    });

    return tableHeading;
}

function buildTableRow(aPidgeon) {

    let tableRow = document.createElement("div");
    tableRow.className += "tableRow";

    for (let prop in aPidgeon) {
        tableRow.appendChild(buildTableCell(aPidgeon[prop]));
    }

    if (aPidgeon.hasOwnProperty("id")) {
        tableRow.setAttribute("onclick", "redirectToPidgeon(" + aPidgeon["id"] + ")");
    }

    return tableRow;
}

function buildTableCell(text) {

    let leText = "";
    if(text !== "" || text != null || typeof(text) != 'undefined') {
        leText = text;
    }

    let tableCell = document.createElement("div");
    tableCell.className += "tableCell";
    let tableCellText = document.createElement("p");
    tableCellText.innerHTML = leText;

    tableCell.appendChild(tableCellText);

    return tableCell;
}

function redirectToPidgeon(id) {
    location.href = "../createPidgeon/create.html?pid=" + id;
}

function addNewPidgeon() {
    location.href = "../createPidgeon/create.html";
}