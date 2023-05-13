const currentTime = document.querySelector("h1"),
selectMenu = document.querySelectorAll("select"),
alarmBtn = document.querySelector("button"),
toDisable = document.querySelector(".content");
// toDisable = document.getElementById("contnt")
image = document.querySelector("img")
let alarmTime, isAlarmSet = false,
ringtone = new Audio("./Audio/naat3.mp3")
// console.log(selectMenu)

for (let i = 12; i> 0; i--){
    i = i < 10 ? '0'+i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i>= 0; i--){
    i = i < 10 ? '0'+i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i> 0; i--){
    let amPm = i == 1 ? "AM" : "PM";
    let option = `<option value="${amPm}">${amPm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(()=>{
    // getting hour, mins secs

    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    amPm = "AM";

    if(h >=12){
        h = h-12;
        amPm = "PM"
    }
    // if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;

    //adding 0 before hour, min, sec if this value is less then 10
    h = h<10 ? "0"+h : h;
    m = m<10 ? "0"+m : m;
    s = s<10 ? "0"+s : s;

    currentTime.innerText =`${h}:${m}:${s} ${amPm}`;

    if(alarmTime == `${h}:${m} ${amPm}`){
        // console.log("Alarm Ringing...")
        ringtone.play();
        ringtone.loop = true;
        image.src = "Images/ringing.jpg"
    }

}, 1000)

function setAlarm(){

    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause()
        image.src = "Images/notRinging.jpg"
        toDisable.classList.remove("disable")
        alarmBtn.innerText = "Set Alarm"
        return isAlarmSet = false;

    }

    // getting hour, minute, amPM, select tag value
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please select a valid time to set Alarm.!")
    }
    isAlarmSet = true
    alarmTime = time;
    toDisable.classList.add("disable");
    alert("this is the selected time :"+alarmTime);
    alarmBtn.innerHTML = 'Clear Alarm';
}

alarmBtn.addEventListener("click", setAlarm)