"use strict";
let boten;
const tbody = document.querySelector("tbody");
leesBoten();
vulRijen();
vulKolommen();
document.getElementById("plaats").onclick = function () {
    if (validatie()) {
        plaatsBoot();
    }
}


async function leesBoten() {
    const response = await fetch("boten.json");
    if (response.ok) {
        boten = await response.json();
        verwerkBoten(boten);
    }
}

function verwerkBoten(boten) {
    const bootSelect = document.getElementById("boot");
    let index = 0;
    for (const boot of boten) {
        const option = document.createElement("option");
        option.innerText = `${boot.naam} (lengte: ${boot.lengte})`;
        option.value = index;
        bootSelect.appendChild(option);
        index++;
    }
}

function vulRijen() {
    const rijSelect = document.getElementById("rij");
    for (let i = 1; i < 11; i++) {
        const option = document.createElement("option");
        option.innerText = i;
        option.value = i;
        rijSelect.appendChild(option);
    }
}

function vulKolommen() {
    const kolomSelect = document.getElementById("kolom");
    for (let i = 0; i < 10; i++) {
        const option = document.createElement("option");
        option.innerText = String.fromCharCode(65 + i);
        option.value = String.fromCharCode(65 + i);
        kolomSelect.appendChild(option);
    }
}

function validatie() {
    let valid = true;
    const bootInput = document.getElementById("boot").value;
    const rijInput = Number(document.getElementById("rij").value);
    let kolomInput = document.getElementById("kolom").value;
    kolomInput = kolomInput.charCodeAt(0) - 64;
    const richtingInput = document.getElementById("richting").value;
    if (bootInput === "") {
        document.getElementById("geenSchip").hidden = false;
        valid = false;
    } else {
        document.getElementById("geenSchip").hidden = true;
    }
    if (rijInput === "") {
        document.getElementById("geenRij").hidden = false;
        valid = false;
    } else {
        document.getElementById("geenRij").hidden = true;
    }
    if (kolomInput === "") {
        document.getElementById("geenKolom").hidden = false;
        valid = false;
    } else {
        document.getElementById("geenKolom").hidden = true;
    }
    if (richtingInput === "") {
        document.getElementById("geenRichting").hidden = false;
        valid = false;
    } else {
        document.getElementById("geenRichting").hidden = true;
    }
    const lengteBoot = boten[bootInput].lengte;
    if (richtingInput === "horizontaal") {
        if ((kolomInput + lengteBoot) > 11) {
            valid = false;
            document.getElementById("teLang").hidden = false;
        } else {
            document.getElementById("teLang").hidden = true;
        }
    }
    if (richtingInput === "verticaal") {
        if ((rijInput + lengteBoot) > 11) {
            valid = false;
            document.getElementById("teLang").hidden = false;
            console.log(rijInput);
            console.log(lengteBoot);
        } else {
            document.getElementById("teLang").hidden = true;
        }
    }
    for (let i = 0; i < lengteBoot; i++) {
        if (richtingInput === "horizontaal") {
            if(tbody.rows[rijInput - 1].cells[kolomInput + i].innerHTML !== "") {
                valid = false;
                document.getElementById("alBezet").hidden = false;
            }
        }
        if (richtingInput === "verticaal") {
            if(tbody.rows[rijInput - 1 + i].cells[kolomInput].innerHTML !== "") {
                valid = false;
                document.getElementById("alBezet").hidden = false;
            }
        }
        
    }
    return valid;
}

function plaatsBoot() {
    const bootInput = document.getElementById("boot");
    const rijInput = document.getElementById("rij").value;
    let kolomInput = document.getElementById("kolom").value;
    kolomInput = kolomInput.charCodeAt(0) - 64;
    const richtingInput = document.getElementById("richting").value;
    const bootLengte = boten[bootInput.value].lengte;
    const afbeelding = boten[bootInput.value].afbeelding;
    for (let i = 0; i < bootLengte; i++) {
        if (richtingInput === "horizontaal") {    
           if (tbody.rows[rijInput - 1].cells[kolomInput + i].innerHTML === "") {
	            tbody.rows[rijInput - 1].cells[kolomInput + i].innerHTML = `<img src = "${afbeelding}">`;
            }
        } else if (richtingInput === "verticaal") {
                tbody.rows[rijInput - 1 + i].cells[kolomInput].innerHTML = `<img src = "${afbeelding}">`;
    }}
    bootInput.remove(bootInput.selectedIndex);

}
