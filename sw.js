const display = document.getElementById("display");
const lapsContainer = document.getElementById("lapsContainer");
document.getElementById("container").appendChild(lapsContainer);

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps=[];

function Start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(Update,10);
        isRunning = true;
    }

}
function Stop() {
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }

}
function Reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false; 
    display.textContent = "00:00:00:00";
    laps=[];
    updateLaps();

}
function Update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours= String(hours).padStart(2,"0");
    minutes= String(minutes).padStart(2,"0");
    seconds= String(seconds).padStart(2,"0");
    milliseconds= String(milliseconds).padStart(2,"0");
    
    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;

}
function Laps(){
    if(isRunning){
        const currentTime = display.textContent;
        laps.push(currentTime);
        updateLaps();

    }
}

function updateLaps() {
    lapsContainer.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapElement = document.createElement("div");
        lapElement.className = "lap";
        lapElement.textContent = `lap ${index + 1} : ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}