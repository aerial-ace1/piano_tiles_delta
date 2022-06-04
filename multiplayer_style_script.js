const tilesstyle = Array.from(document.querySelectorAll(".tile"));

// Styling for hover and initial click over tiles
tilesstyle.forEach(tile => tile.addEventListener("mouseover",function(){
    tile.classList.add("boxhover") }));
tilesstyle.forEach(tile => tile.addEventListener("mouseout",function(){
    tile.classList.remove("boxhover") }));
tilesstyle.forEach(tile => tile.addEventListener("click", play));

//Styling for Play Key
const playstyle = document.getElementById('play');
playstyle.addEventListener("mouseover",function(){
    this.classList.add("boxclick");
})
playstyle.addEventListener("mouseout",function(){
    playstyle.classList.remove("boxclick");
})

//Function which activates click animation of tile given tile or tile.event
function play(tile){
    
    // Checking if given object is a tile or tile event
    if( (typeof tile.target) == 'undefined'){
        var transitionTile = tile;
    }
    else{
        var transitionTile = tile.target;
    }

    let audio = document.querySelector('#tilepress');
    audio.currentTime = 0;
    audio.play();

    // Applying transition
    transitionTile.classList.add('boxclick');
    transitionTile.classList.remove('boxhover');
    transitionTile.addEventListener('transitionend', function(e) {
        e.target.classList.remove('boxclick');
    });
    return 0;
}

// Styling for Overlay Page
function overlayPage(){
    document.getElementById('nextbox').style.display = 'flex';
}

function unoverlayPage(){
    document.getElementById('nextbox').style.display = 'none';
}




