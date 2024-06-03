const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies";

let dropdown = document.querySelectorAll('.dropDown select');
let amt = document.querySelector('.amount input');
let btn = document.querySelector('.btn');
let from = document.querySelector('.from select');
let to = document.querySelector('.to select');
let msg = document.querySelector('.msg');
window.addEventListener('load', getExchangeRate);

for(let select of dropdown){
    for(key in countryList){
        let newElement = document.createElement('option');
        newElement.innerText = key;
        newElement.value = key;
        if(select.name === 'from' && key === 'USD'){
            newElement.selected = 'selected';
        }
        else if(select.name === 'to' && key === 'INR'){
            newElement.selected = 'selected';
        }
        select.append(newElement);
    }
    select.addEventListener('change', (evt) => {
        changeFlag(evt.target);
    })
}

function changeFlag(element){
    let curr = element.value;
    let countryCode = countryList[curr];
    let newUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let parent = element.parentElement;
    let img = parent.querySelector('img');
    img.src = newUrl;
}

btn.addEventListener('click', getExchangeRate);

async function getExchangeRate(){
    let amtValue = amt.value;
    if(amtValue == 0 || amtValue < 0){
        amt.value = 1;
        amtValue = 1;
    }
    let url = `${BASE_URL}/${from.value.toLowerCase()}.json`;
    let data = await fetch(url);
    let d = await data.json();
    let rate = d[from.value.toLowerCase()][to.value.toLowerCase()];
    let result = rate * amtValue;
    msg.innerText = `${amtValue} ${from.value} = ${result} ${to.value}`;
}