let rectangle = document.querySelector('.rectangle');

let randomNumber = document.getElementById('number');
let start = document.getElementById('start');
let timeText = document.getElementById('time-text');
let GameStatus = {
    STOP: 1,
    START: 2,
}
let status = GameStatus.STOP;

function getRandomColor(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function getRandomNumber(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function generateNumber() {
    switch(randomNumber.innerHTML) {
        case 1:
            randomNumber.innerHTML = getRandomNumber([2, 3, 4, 6, 7, 8, 9]);
            break;
        case 2:
            randomNumber.innerHTML = getRandomNumber([1, 3, 4, 6, 7, 8, 9]);
            break;
        case 3:
            randomNumber.innerHTML = getRandomNumber([1, 2, 4, 6, 7, 8, 9]);
            break;
        case 4:
            randomNumber.innerHTML = getRandomNumber([1, 2, 3, 6, 7, 8, 9]);
            break;
        case 6:
            randomNumber.innerHTML = getRandomNumber([1, 2, 3, 4, 7, 8, 9]);
            break;
        case 7:
            randomNumber.innerHTML = getRandomNumber([1, 2, 3, 4, 6, 8, 9]);
            break;
        case 8:
            randomNumber.innerHTML = getRandomNumber([1, 2, 3, 4, 6, 7, 9]);
            break;
        case 9:
            randomNumber.innerHTML = getRandomNumber([1, 2, 3, 4, 6, 7, 8]);
            break;
        default:
            randomNumber.innerHTML = getRandomNumber([1, 2, 3, 4, 6, 7, 8, 9]);
            break;
    }
    return randomNumber.innerHTML;
}

function endGame() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    start.innerHTML = "Start Game";
    status = GameStatus.STOP;

}

function timeout1_function() {
    rectangle.style.background = getRandomColor(["rgb(0,0,255)", "rgb(255,192,203)"]);
    generateNumber();
    console.log("number generated");
    let date1 = new Date();
    timeNow = date1.getTime();
    window.addEventListener('keypress', (event) =>{ 
        if(event.key === "m" | event.key === 'n' | event.key === 'z' | event.key === 'x'){
            let date2 = new Date();
            timeLater = date2.getTime();
            window.playTime = (timeLater - timeNow);
            console.log(timeLater - timeNow);
            // timeout1_function();
            // rectangle.style.background = getRandomColor(["rgb(0,0,255)", "rgb(255,192,203)"]);
            // generateNumber();
        }
    });
}

// function timeout1_function() {


//     // timeout1 = setInterval(function() {
//     //     rectangle.style.background = getRandomColor(["rgb(0,0,255)", "rgb(255,192,203)"]);
//     //     generateNumber();
//         // let date1 = new Date();
//         // timeNow = date1.getTime();
//         // window.addEventListener('keypress', (event) =>{
//         //     if(event.key === "m" | event.key === 'n' | event.key === 'z' | event.key === 'x'){
//         //         let date2 = new Date();
//         //         timeLater = date2.getTime();
//         //         window.playTime = (timeLater - timeNow);
//         //         console.log(timeLater - timeNow);
//         //         // timeout1_function(1500);
//         //     }
//         // });
//     // }, 2000); //time = how long before it executes again
// }

// function timeout2_function(time) {
//     timeout2 = setTimeout(function() {
//         endGame();
//     }, time);
// }


function startGame(){
    let changeTime = 1500;
    let endTime = changeTime + 5000;
    status = GameStatus.START;
    var timeout1 = setInterval(timeout1_function, 1000);
    window.addEventListener('keypress', (event) =>{
        if(event.key === 'm' | event.key === 'n' | event.key === 'z' | event.key === 'x'){
            console.log("successful");
            clearInterval(timeout1);
            timeout1 = setInterval(timeout1_function, 1000);
            
        }
    });
    // timeout2_function(endTime);
    
}

// start.addEventListener('click', function() {
//     if(status === GameStatus.START) {
//         endGame();
//     }else{
//         startGame();
//         this.innerHTML = "Stop Game";
//     }
// });

// window.addEventListener('keypress', (event) =>{
//     if(event.key === 'm' | event.key === 'n' | event.key === 'z' | event.key === 'x'){
//         clear
//         timeout1_function();
//     }
// });

window.onload = function() {
    startGame();
};
