const BASE_URL =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

let i=0;
for(let select of dropdown){
    for (let currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if(select.id === "from" && currCode === "USD"){
        newOption.selected = true;
       }
       else if(select.id === "to" && currCode === "INR"){
        newOption.selected =  true;
       }
       select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
};

const updateFlag =(elem)=>{
    let currCode = elem.value;
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = elem.parentElement.querySelector("img");
    img.setAttribute("src", newSrc);
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.getElementById("amount").value;
    if(amount === " " || amount < 1){
        alert("please enter a valid number or no negative number");
    }
    const base = from.value.toLowerCase();
    const target = to.value.toLowerCase()
    const URL = `${BASE_URL}/${base}.json`;
//     console.log(base);
//    console.log(target);

    let response = await fetch(URL);
    let data = await response.json();
    let rate =data[base][target];
    let finalAmount = (rate*amount).toFixed(2);
    let result = document.querySelector(".result");
    result.innerText = `${amount} ${base} = ${finalAmount} ${target} `.toUpperCase();
    /* console.log( result.innerText); */
});
