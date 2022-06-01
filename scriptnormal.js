// Standard html elements
const tiles = Array.from(document.querySelectorAll(".tile"));
const playbut = document.getElementById('play');
nextLevel = document.getElementById('next');

// Some global variables
var counter;
var score;
var selected;
var tileStrokes;
var userStrokes;
var outcome;
var roundOver = false;
var key = {1:'A1',2:'A2',3:'A3',4:'A4',5:'B1',6:'B2',7:'B3',8:'B4',9:'C1',10:'C2',11:'C3',12:'C4',13:'D1',14:'D2',15:'D3',16:'D4'}


//Function which activates click animation of tile given tile or tile.event
function play(tile){
    
    // Checking if given object is a tile or tile event
    if( (typeof tile.target) == 'undefined'){
        var transitionTile = tile;
    }
    else{
        var transitionTile = tile.target;
    }

    // Applying transition
    transitionTile.classList.add('boxclick');
    transitionTile.classList.remove('boxhover');
    transitionTile.addEventListener('transitionend', function(e) {
        e.target.classList.remove('boxclick');
    });
    return 0;
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
        let j = (i*800);
        setTimeout( ()=>{play(toplay);}, j);
        tileArray[key[code]]+=1;
    }
    return 0;
}


// Function which stringifys and checks if pattern matches with user input
function checkTiles ( code , input){
    if (JSON.stringify(code) === JSON.stringify(input)){
        return true;
    }
    return false;
}



function userInput(e){

    play(e);
    clickedTile = e.target.getAttribute('data-key');
    userStrokes[clickedTile] += 1;
    selected += 1;
    console.log(selected);

    if (selected === counter){
        tiles.forEach(tile => tile.removeEventListener("click", userInput));
        outcome = checkTiles(tileStrokes,userStrokes);
        if (outcome === true){
            win();
        }
        else if (outcome ===false) {
            loss();
        }

        return 0;
    }
}

function win(){
    score += counter*10;
    counter +=1;
    console.log(counter);
    overlayPage();
    document.getElementById('exclaim').innerHTML = 'Yay!'
    document.getElementById('scr').innerHTML = `${score}`;
    nextLevel.innerHTML = 'Next Level';
}

function crossroads() {
    unoverlayPage();
    if (outcome){round(counter);}
    else {startgame()}
}

function loss(){
    overlayPage();
    document.getElementById('exclaim').innerHTML = 'Oops!'
    document.getElementById('scr').innerHTML = `${score}`;
    nextLevel.innerHTML = 'Restart';
}
function round(roundNo){
    
    nextLevel.removeEventListener("click",() => {
        unoverlayPage();
        round(counter);});
    outcome = false;
    playbut.disabled = true;
    playbut.innerHTML='Playing.....';
    tiles.forEach(tile => tile.removeEventListener('click',play));
    console.log("step1")

    selected = 0;
    tileStrokes = generateTrack();
    userStrokes = generateTrack();
    console.log('step2');
    generateTile(roundNo , tileStrokes)
    console.log(tileStrokes);

    setTimeout( ()=>{
        tiles.forEach(tile => tile.addEventListener("click", userInput));},
        roundNo*800);
    return 0;
}

function reset(){
    playbut.disabled = false;
    playbut.innerHTML='Play';
}




playbut.addEventListener('click',startgame);


function startgame(){
    counter = 1;
    score = 0;
    playbut.removeEventListener('click',startgame);
    document.getElementById("scr").innerHTML = `${score}`;
    console.log(counter);
    round(counter);
    
}

