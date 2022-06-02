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
var key ={};

// Genrating Key for list of tiles.
for (let i=0; i<tiles.length;i++){
    key[i+1]=tiles[i].getAttribute('data-key');
}
console.log(key);



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
    selected += 1;
    console.log(selected);

    //Checks if number of input tiles is reached and launches a win/loss based on if the pattern matches or not
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

// Win function updates score, allows user to go to next level
function win(){
    score += counter*10;
    counter +=1;
    console.log(counter);
    overlayPage();
    document.getElementById('exclaim').innerHTML = 'Yay!'
    document.getElementById('scr').innerHTML = `${score}`;
    playbut.innerHTML = 'Next Level';
    playbut.disabled = false;
}

//Loss function allows player to restart
function loss(){
    overlayPage();
    document.getElementById('exclaim').innerHTML = 'Oops!'
    document.getElementById('scr').innerHTML = `${score}`;
    playbut.innerHTML = 'Restart';
    playbut.disabled = false;
}

//Onclick function to close overlay and start next game/level depending on outcome
function crossroads() {
    unoverlayPage();
    if (outcome){round(counter);}
    else {initial()}
}


// Function which initialises all values and starts the game
function initial(){
    counter = 1;
    score = 0;
    document.getElementById("scr").innerHTML = `${score}`;
    console.log(counter);
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
    console.log(tileStrokes);

    // Runs an event listener for user input after time required for pattern to display on screen
    setTimeout( ()=>{
        tiles.forEach(tile => tile.addEventListener("click", userInput));},
        roundNo*800);
    return 0;
}


