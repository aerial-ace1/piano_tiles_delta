// Standard html elements
var tiles = Array.from(document.querySelectorAll(".tile"));
const playbut = document.getElementById('play');
nextLevel = document.getElementById('next');
var time = document.getElementById('seconds');

// Some global variables
var counter;
var score;
var selected;
var tileStrokes;
var tileStrokes_Hacker = {};
var userStrokes_Hacker = {};
var outcome;
var roundOver = false;
var key ={};
var hackerMode;
var x;

// Genrating Key for list of tiles. 
for (let i=0; i<tiles.length;i++){
    key[i+1]=tiles[i].getAttribute('data-key');
}

//Generate Leaderboard --
leaderBoard = ['first','second','third'];

for (let i=0; i<3;i++){

    if ( null == localStorage.getItem(leaderBoard[i])){ 
        localStorage.setItem(leaderBoard[i],0); 
    } 
}

updateLeader();


//Function which updates leaderboard --

function updateLeader(){
    for (let i=0; i<3;i++){
        document.getElementById(`${leaderBoard[i]}`).innerHTML = localStorage.getItem(leaderBoard[i]);
    }
}

//Function which takes the user score and add it to the leaderboard --
function playerScore( sessionScore ){
    scoreList = []
    for (let i=0; i<3;i++){
        scoreList.push(localStorage.getItem(leaderBoard[i]));

    }
    scoreList.push(sessionScore);
    scoreList.sort();
    scoreList.reverse();

    for (let i=0; i<3;i++){
        localStorage.setItem(leaderBoard[i],scoreList[i]); 
    }

    updateLeader();
}


// Function to generate JSON Object to keep track of pattern and key strokes
function generateTrack () {
    
    tilesPresses = {};
    for (let i=0; i<tiles.length;i++){
        var data = tiles[i].getAttribute('data-key');
        tilesPresses[data]=0
    }
    return tilesPresses;
}

// Function to generate random tiles and play the pattern
function generateTile (iterator, tileArray){
    
    for (let i=0; i<iterator;i++){
        code = (Math.floor(Math.random() * Object.keys(tileArray).length) +1);
        let toplay = document.querySelector(`[data-key="${key[code]}"`);

        let j = (i*1100);
        setTimeout( ()=>{play(toplay);}, j);

        tileArray[key[code]]+=1;
        tileStrokes_Hacker[i]=key[code];
    }
    console.log(tileArray);
    return 0;
}


// Function which stringifys and checks if pattern matches with user input
function checkTiles ( code , input){
    if (JSON.stringify(code) === JSON.stringify(input)){
        return true;
    }
    return false;
}


// Function which is fired upon listening for user input
function userInput(e){

    //Adds tile to list of input from user
    play(e);
    clickedTile = e.target.getAttribute('data-key');
    userStrokes[clickedTile] += 1;
    userStrokes_Hacker[selected]=clickedTile;
    selected += 1;

    //Checks if number of input tiles is reached and launches a win/loss based on if the pattern matches or not
    if (selected === counter){
        tiles.forEach(tile => tile.removeEventListener("click", userInput));
        clearInterval(x);
        if (hackerMode){
            outcome = checkTiles(tileStrokes_Hacker,userStrokes_Hacker);
        } 
        else{
            outcome = checkTiles(tileStrokes,userStrokes);
        }

        if (outcome === true){
            win();
        }
        else if (outcome ===false) {
            loss();
        }
        else {}
        document.getElementById('hackerTick').disabled = false;
        return 0;
    }
}

// Win function updates score, allows user to go to next level
function win(){
    timing = parseInt(time.innerHTML);
    score += Math.floor(counter/timing *10);
    if (hackerMode) { score += counter*20; }
    else { score += counter*10; }
    counter +=1;

    overlayPage();
    let audio = document.querySelector('#win');
    audio.currentTime = 0;
    audio.play();

    document.getElementById('exclaim').innerHTML = 'Yay!'
    document.getElementById('scr').innerHTML = `${score}`;
    playbut.innerHTML = 'Next Level';
    playbut.disabled = false;
}

//Loss function allows player to restart
function loss(){
    overlayPage();
    let audio = document.querySelector('#end');
    audio.currentTime = 0;
    audio.play();

    document.getElementById('exclaim').innerHTML = 'Oops!'
    document.getElementById('scr').innerHTML = `${score}`;
    playbut.innerHTML = 'Restart';
    playbut.disabled = false;
    playerScore(score);
}

//Onclick function to close overlay and start next game/level depending on outcome
function crossroads() {
    hackerMode = document.getElementById('hackerTick').checked;
    document.getElementById('hackerTick').disabled = true;
    timer();
    unoverlayPage();
    if (outcome){round(counter);}
    else {initial()}
}


// Function which initialises all values and starts the game
function initial(){
    counter = 1;
    score = 0;
    document.getElementById("scr").innerHTML = `${score}`;
    round(counter);
    
}

// Function which conducts each level
function round(roundNo){
    
    //Setting outcome to false and disabling play button and tile animation
    outcome = false;
    playbut.disabled = true;
    playbut.innerHTML='Playing.....';
    playbut.classList.remove("boxclick");
    tiles.forEach(tile => tile.removeEventListener('click',play));

    //Initialising JSON objects for pattern and user input and generating pattern
    selected = 0;
    tileStrokes = generateTrack();
    userStrokes = generateTrack();
    generateTile(roundNo , tileStrokes)

    // Runs an event listener for user input after time required for pattern to display on screen
    setTimeout( ()=>{
        tiles.forEach(tile => tile.addEventListener("click", userInput));},
        roundNo*800);
    return 0;
}


function timer () {
    time.innerHTML = 1;
    x= setInterval( function () {
        let intermediate = time.innerHTML;
        time.innerHTML = parseInt(intermediate) + 1; 
    },1000);
}