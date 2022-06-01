const tiles = Array.from(document.querySelectorAll(".tile"));
const playbut = document.getElementById('play');
socringBoard = document.getElementsByClassName('value');
var counter;
var score;
var selected;
var tileStrokes;
var userStrokes;
var outcome;
var roundOver = false;
var key = {1:'A1',2:'A2',3:'A3',4:'A4',5:'B1',6:'B2',7:'B3',8:'B4',9:'C1',10:'C2',11:'C3',12:'C4',13:'D1',14:'D2',15:'D3',16:'D4'}


function play(tile){
    tile.target.classList.add('boxclick');
    tile.target.classList.remove('boxhover');
    tile.target.addEventListener('transitionend', function(e) {
        e.target.classList.remove('boxclick');
    });
    return 0;
}
 
function tplay(tile){
    tile.classList.add('boxclick');
    tile.addEventListener('transitionend', function(e) {
        e.target.classList.remove('boxclick');
    });
    return 0;
}

function generateTile (iterator, tileArray){
    
    for (let i=0; i<iterator;i++){
        code = (Math.floor(Math.random() * Object.keys(tileArray).length) +1);
        let toplay = document.querySelector(`[data-key="${key[code]}"`);
        let j = (i*1000) + 1000;
        setTimeout( ()=>{tplay(toplay);}, j);
        tileArray[key[code]]+=1;
    }
    return 0;
}

function generateTrack () {
    
    tilesPresses = {};
    for (let i=0; i<tiles.length;i++){
        var data = tiles[i].getAttribute('data-key');
        tilesPresses[data]=0
    }
    return tilesPresses;
}

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

    if (selected === counter){
        tiles.forEach(tile => tile.removeEventListener("click", userInput));
        outcome = checkTiles(tileStrokes,userStrokes);
        console.log(outcome);
        roundOver = true;
        return 0;
    }
}

function round(roundNo){
    playbut.disabled = true;
    playbut.innerHTML='Playing.....';
    tiles.forEach(tile => tile.removeEventListener('click',play));

    selected = 0;
    tileStrokes = generateTrack();
    userStrokes = generateTrack();
    
    generateTile(roundNo , tileStrokes)
    console.log(tileStrokes);
    tiles.forEach(tile => tile.addEventListener("click", userInput));
    
    if (roundOver === true && selected === roundNo){
        return outcome;
    }
    
}

function reset(){
    socringBoard.innerHTML = '';
    playbut.disabled = false;
    playbut.innerHTML='Play';
}

playbut.addEventListener('click',startgame);
tiles.forEach(tile => tile.addEventListener('click',play));

function startgame(e){
    counter = 2;
    score = 0;
    document.getElementById("scr").innerHTML = `${score}`;
    //loop over
    counter += 1;
    roundOver = false;
    round(counter);
    
}

