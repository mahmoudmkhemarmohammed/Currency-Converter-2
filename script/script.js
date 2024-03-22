// Sunction Sleep For Type Writer
function sleep (ms) {
    return new Promise ( res => setTimeout(res , ms))
}
let sleepTime = 100;
let writerText = ["Currency Converter" , "Developed By M.Mkhemar"];
let currentIndex = 0;
let containerText = document.querySelector(".container .typer h2 .text");
let writer = async () => {
    while (true) {
        let wordIndex = writerText[currentIndex];
        for(let i = 0 ; i < wordIndex.length ; i++){
            containerText.innerText = wordIndex.substring( 0 , i + 1);
            await sleep(sleepTime)
        }
        await sleep(sleepTime * 5)
        for(let i = wordIndex.length ; i > 0; i--) {
            containerText.innerText = wordIndex.substring(0 , i - 1)
            await sleep(sleepTime)
        }
        await sleep (sleepTime * 10)
        if(currentIndex === writerText.length - 1){
            currentIndex = 0;
        }
        else {
            currentIndex++
        }
    }
}
writer()
let btnConverter = document.querySelector(".container .btn button");
let ammount = document.getElementById("inp")
let selectFrom = document.querySelector(".container .inputs .input select#from");
let selectTo = document.querySelector(".container .inputs .input select#to");
let result = document.querySelector(".container .outputs .result .span-result");
btnConverter.onclick = () => {
    fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=9ce71a097d134da990f841fdcfac189f")
    .then ( result => {
        return result.json()
    })
    .then ( data => {
        if(ammount.value !== ''){
            document.querySelector(".container .outputs").style.display = 'block';
            if(selectFrom.value === "USD" && selectTo.value === "EGP"){
                result.innerHTML = `${Math.round(ammount.value * data.rates["EGP"])} ${selectTo.value}`;
            }
            else if(selectFrom.value === "EGP" && selectTo.value === "USD"){
                result.innerHTML = `${Math.floor(ammount.value / data.rates["EGP"])} ${selectTo.value}`;
            }
            else if(selectFrom.value === "USD" && selectTo.value === "SAR"){
                result.innerHTML = `${Math.round(ammount.value * data.rates["SAR"])} ${selectTo.value}`;
            }
            else if(selectFrom.value === "USD" && selectTo.value === "GBP"){
                result.innerHTML = `${Math.round(ammount.value * data.rates["GBP"])} ${selectTo.value}`;
            }
            else if(selectFrom.value === "USD" && selectTo.value === "EUR"){
                result.innerHTML = `${Math.round(ammount.value * data.rates["EUR"])} ${selectTo.value}`;
            }
            document.querySelector(".container .outputs span.EGP").innerHTML = data.rates["EGP"]
            document.querySelector(".container .outputs span.SAR").innerHTML = data.rates["SAR"]
            document.querySelector(".container .outputs span.GBP").innerHTML = data.rates["GBP"]
            document.querySelector(".container .outputs span.EUR").innerHTML = data.rates["EUR"]
        }
    })
}
function check () {
    if(selectFrom.value === "EGP"){
        document.querySelectorAll(".container .inputs .input select#to option").forEach ( op => {
            if(!op.classList.contains("active")){
                op.classList.add("disbled")
            }
        })
    }
    else {
        document.querySelectorAll(".container .inputs .input select#to option").forEach ( op => {
            op.classList.remove("disbled");
        })
    }
}
selectFrom.addEventListener("input" , check)
let theme = document.querySelector(".container .logo .theme i");
theme.onclick = () => {
    document.body.classList.toggle("dark")
    if(document.body.classList.contains("dark")){
        theme.className = 'fa-solid fa-sun';
        localStorage.setItem("theme" , "dark")
    }
    else {
        theme.className = 'fa-solid fa-moon';
        localStorage.setItem("theme" , "light")
    }
}
if(localStorage.theme === "dark"){
    document.body.classList.add("dark")
    theme.className = 'fa-solid fa-sun';
}
else {
    document.body.classList.remove("dark")
    theme.className = 'fa-solid fa-moon';
}