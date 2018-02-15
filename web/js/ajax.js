function getOnePidgeonAjaxCall(pidgeonId, callback) {
    let url = "/api/pidgeon/read_one.php?id=" + pidgeonId;
    let methodType = "GET";

    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log("Successful xhr");
                let resp = xhr.responseText;
                let respJson = JSON.parse(resp);
                callback(respJson);
            } else {
                console.log("xhr failed");
            }
        } else {
            console.log("xhr process is still going strong");
        }
    }
    console.log("request sent successfully");
}

function getAllPidgeonsAjaxCall(callback) {
    let url = "/api/pidgeon/read.php";
    let methodType = "GET";

    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resp = xhr.responseText;
                let respJson = JSON.parse(resp);
                callback(respJson);
            } else {
                console.log("xhr failed");
            }
        } else {
            console.log("xhr process is still going strong");
        }
    }
    console.log("GETALL: request sent successfully");
}

function sendAjaxPidgeon(pidgeonJSON, callback) {
    let url = "/api/pidgeon/create.php";
    let methodType = "POST";

    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.response;
            callback(response);
        }
    };
    let data = JSON.stringify(pidgeonJSON);
    xhr.send(data);
}

function updateAjaxPidgeon(pidgeonJSON, callback) {
    let url = "/api/pidgeon/update.php";
    let methodType = "POST";
    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.response;
            callback(response);
        }
    };
    let data = JSON.stringify(pidgeonJSON);
    xhr.send(data);
}
