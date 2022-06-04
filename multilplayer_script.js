// Standard html elements
var tiles = Array.from(document.querySelectorAll(".tile"));
const playbut = document.getElementById('play');
var time = document.getElementById('seconds');

// Some global variables
var counter;
var selected;
var pattern ={};
var solution ={};
var outcome;
var x;


// Function which stringifys and checks if pattern matches with user input
function checkTiles ( code , input){
    if (JSON.stringify(code) === JSON.stringify(input)){
        return true;
    }
    return false;
}


// Win function updates score, allows user to go to next level
function win(){
    overlayPage();
    let audio = document.querySelector('#win');
    audio.currentTime = 0;
    audio.play();
    document.getElementById('exclaim').innerHTML = 'Yay!'
}

//Loss function allows player to restart
function loss(){
    overlayPage();
    let audio = document.querySelector('#end');
    audio.currentTime = 0;
    audio.play();
    document.getElementById('exclaim').innerHTML = 'Oops!'
}

playbut.addEventListener('click',initial);

// Function which initialises all values and starts the game
function initial(){
    playbut.removeEventListener('click',initial);
    counter = 0;
    selected = 0;
    playbut.innerHTML = 'End Pattern';
    tiles.forEach(tile => tile.addEventListener("click", patternSetting));
    playbut.addEventListener('click',solver);
}

function patternSetting(e){
    play(e);
    clickedTile = e.target.getAttribute('data-key');
    pattern[counter]=clickedTile;
    counter += 1;
    console.log(counter);
}

function patternSelection(e){
    play(e);
    clickedTile = e.target.getAttribute('data-key');
    solution[selected]=clickedTile;
    selected += 1;
    console.log(selected);

    if (selected === counter){
        tiles.forEach(tile => tile.removeEventListener("click", patternSelection));
        outcome = checkTiles(pattern,solution);
        clearInterval(x);
        if (outcome === true){
            win();
        }
        else if (outcome === false) {
            loss();
        }
        else {}
        playbut.innerHTML = 'Set Pattern';
        playbut.disabled = false;
        playbut.addEventListener('click',initial);
}
}


function solver(e){
    timer();
    tiles.forEach(tile => tile.removeEventListener("click", patternSetting));
    playbut.removeEventListener('click',solver);
    playbut.innerHTML = 'Select Pattern'
    playbut.disabled = true;
    tiles.forEach(tile => tile.addEventListener("click", patternSelection));
}


function timer () {
    time.innerHTML = 1;
    x= setInterval( function () {
        let intermediate = time.innerHTML;
        time.innerHTML = parseInt(intermediate) + 1; 
    },1000);
}