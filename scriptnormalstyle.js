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

// Styling for Overlay Page
function overlayPage(){
    document.getElementById('nextbox').style.display = 'flex';
}

function unoverlayPage(){
    document.getElementById('nextbox').style.display = 'none';
}




