const tilesstyle = Array.from(document.querySelectorAll(".tile"));

function play(tile){
    tile.target.classList.add('boxclick');
    tile.target.addEventListener('transitionend', function(e) {
        e.target.classList.remove('boxclick');
    });
}

tilesstyle.forEach(tile => tile.addEventListener("mouseover",function(){
    tile.classList.add("boxhover") }));
tilesstyle.forEach(tile => tile.addEventListener("mouseout",function(){
    tile.classList.remove("boxhover") }));
tilesstyle.forEach(tile => tile.addEventListener("click", function(e) {
    play(e);
    e.target.classList.remove('boxhover');
}));

const playstyle = document.getElementById('play');
playstyle.addEventListener("mouseover",function(){
    this.classList.add("boxclick");
})
playstyle.addEventListener("mouseout",function(){
    playstyle.classList.remove("boxclick");
})

