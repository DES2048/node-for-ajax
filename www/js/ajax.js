var container = document.getElementById("phonesContainer");

function showPhonesList(phones){
    var phonesList = document.getElementById("phonesList");
    
    if(phonesList)
        container.removeChild(phonesList);

    if(!phones){
        container.textContent = "Unable to load phones data!"
        return;
    }

    if(!phones.length){
        container.textContent = "No phones yet";
        return;
    }

    var ul = document.createElement("ul");
    ul.setAttribute("id", "phonesList");

    for (var i = 0; i < phones.length; i++) {
        var li = document.createElement("li");
        li.textContent = phones[i].name;
        ul.appendChild(li);
    }

    container.appendChild(ul);
}

function getDataSync(url, callback){

    var xhr = new XMLHttpRequest();

    xhr.open("get", url, false);

    xhr.send();

    callback && callback(xhr);

}

function getDataAsync(url, callback){
    
    var xhr = new XMLHttpRequest();

    xhr.open("get", url, true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState != 4){
            return;
        } else {
            callback && callback(xhr);
        }
    }
}

function phonesCallback(xhr){
    if(xhr.status != 200){
        showPhonesList();
    } else {
        var phones = JSON.parse(xhr.responseText);
        showPhonesList(phones);
    }
}

function loadPhonesAsync() {
    getDataAsync("phones.json", phonesCallback);
}

function loadPhonesSync() {

    getDataSync("phones.json", phonesCallback);

}

