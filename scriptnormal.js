const tiles = Array.from(document.querySelectorAll(".tile"));
const playbut = document.getElementById('play');
var counter;
var score;
var key = {1:'A1',2:'A2',3:'A3',4:'A4',5:'B1',6:'B2',7:'B3',8:'B4',9:'C1',10:'C2',11:'C3',12:'C4',13:'D1',14:'D2',15:'D3',16:'D4'}


 
function tplay(tile){
    tile.classList.add('boxclick');
    tile.addEventListener('transitionend', function(e) {
        e.target.classList.remove('boxclick');
    });
}

function generateTile (iterator, tileArray){
    
    console.log("a");
    for (let i=0; i<iterator;i++){
        code = (Math.floor(Math.random() * Object.keys(tileArray).length) +1);
        toplay = document.querySelector(`[data-key="${key[code]}"`)
        tplay(toplay);
        tileArray[key[code]]+=1;
    }
    console.log(tileArray);
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

function round(roundNo){
    tilestrokes = generateTrack();
    generateTile(roundNo , tilestrokes)
}

playbut.addEventListener('click',startgame);

function startgame(e){
    e.target.innerHTML='Restart';
    counter = 1;
    score = 0;
    round(counter);
}

