let rectangle = document.querySelector('.rectangle');
let randomNumber = document.getElementById('number');
let start = document.getElementById('start');
let timeText = document.getElementById('time-text');

// Color Constants
const blueColor = "rgb(0,0,255)";
const pinkColor = "rgb(255,192,203)";
const whiteColor = "rgb(255,255,255)";

function submitData() {
    fetch(window.location.href, {
        method: 'POST',
        body: JSON.stringify({
            data: JSON.parse(sessionStorage.getItem("dataArray")),
        }),
        headers: {
            'Content-Type': 'application/json'
          },
        }).then(()=>{console.log("Submitted to server.js")})
}

function getRandomColor(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function generateNumber(currNum) {
    let tempNum = Math.floor(Math.random() * 10);

    console.log("Curr num inside genNumber: "+currNum);

    // Generates number if condition in while statement is still not met
    while (tempNum === parseInt(currNum) | tempNum === 5 | tempNum === 0) {
        tempNum = Math.floor(Math.random() * 10);
    }
    console.log("Temp num inside genNumber: "+tempNum);

    // Handles storage of array to session storage, for submission later
    let numArray = JSON.parse(sessionStorage.getItem("numArray"));
    numArray.push(tempNum);
    sessionStorage.setItem("numArray", JSON.stringify(numArray));

    return tempNum;
}

function countDownScreen() {
    rectangle.style.background = whiteColor;
    let i = 3;
    let countDown = setInterval(function() {
        if (i === 0) {
            clearInterval(countDown);
        } else {
            randomNumber.innerHTML = i;
            i--;
        }
    }, 1000);
}

function changeRandColorNumber() {
    if (parseInt(sessionStorage.getItem("currIter")) !== 50) {
        // Handles reaction time recording
        timeHandler();

        // Handles changing of color + recording of color shown in screen
        let currColor = rectangle.style.background = getRandomColor([blueColor, pinkColor]);
        let colArray = JSON.parse(sessionStorage.getItem("colArray"));
        colArray.push(currColor);
        sessionStorage.setItem("colArray", JSON.stringify(colArray));

        // Handles changing of numbers + recording of number shown in screen
        let currNum = sessionStorage.getItem("currNum");
        currNum = randomNumber.innerHTML = generateNumber(currNum);
        sessionStorage.setItem("currNum", currNum);

        console.log("Current Generated Number :"+currNum);

        // Keeps track of how many iterations
        let temp = parseInt(sessionStorage.getItem("currIter"))+1;
        sessionStorage.setItem("currIter", temp);
    } else {
        // Get timeArray and numArray from user session and store to a unified data array, to be passed to submitData() as one whole array
        let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
        let numArray = JSON.parse(sessionStorage.getItem("numArray"));
        let colArray = JSON.parse(sessionStorage.getItem("colArray"));
        let keyArray = JSON.parse(sessionStorage.getItem("keyArray"));
    
        let dataArray = [];

        for (i = 0; i < timeArray.length; i++) {
            dataArray.push(timeArray[i]);
        }
        for (i = 0; i < numArray.length; i++) {
            dataArray.push(numArray[i]);
        }
        for (i = 0; i < numArray.length; i++) {
            dataArray.push(colArray[i]);
        }
        for (i = 0; i < numArray.length; i++) {
            dataArray.push(keyArray[i]);
        }
        sessionStorage.setItem("dataArray", JSON.stringify(dataArray));
        // submitData();
        return;
    }
}

function timeHandler() {
    // Fetches current time array in user session and updates it
    let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
    let reactionTime = new Date().getTime() - sessionStorage.getItem("currTime");

    timeArray.push(reactionTime);
    sessionStorage.setItem("timeArray", JSON.stringify(timeArray));

    let currTime = new Date().getTime();
    sessionStorage.setItem("currTime", currTime);

    console.log("Reaction Time: "+reactionTime);
}

// Where all code starts executed
window.onload = function() {
    
    // Initiallize vars and arrays to be used in session
    let currIter = 0;
    let currNum = 0;
    let currTime = new Date().getTime();
    let timeArray = [];
    let numArray = [];
    let colArray = [];
    let keyArray = [];
    
    // Stores initiallized variables to sessionStorage unique to user
    sessionStorage.setItem("currIter", currIter);
    sessionStorage.setItem("currNum", currNum);
    sessionStorage.setItem("currTime", currTime);
    sessionStorage.setItem("timeArray", JSON.stringify(timeArray));
    sessionStorage.setItem("numArray", JSON.stringify(numArray));
    sessionStorage.setItem("colArray", JSON.stringify(colArray));
    sessionStorage.setItem("keyArray", JSON.stringify(keyArray));
    
    // Start the interval every 1.5s
    // countDownScreen();
    let handle = setInterval(changeRandColorNumber, 100);
    // Also execute function immediately to start
    // changeRandColorNumber();

    // Handles keypresses
    window.onkeypress = function(key) {

        // Checks if reached iteration limit
        if (parseInt(sessionStorage.getItem("currIter")) !== 50) {
            // Records keypresses, correct or incorrect
            key = key || window.event;
            let uniCode = key.keyCode || key.which;
            let keyName = String.fromCharCode(uniCode);
            keyArray = JSON.parse(sessionStorage.getItem("keyArray"));
            keyArray.push(keyName);
            sessionStorage.setItem("keyArray", JSON.stringify(keyArray));

            // Resets time and re-executes function
            clearInterval(handle);
            handle = setInterval(changeRandColorNumber, 100);
            changeRandColorNumber();
        }  
    };
};