const tilesstyle = Array.from(document.querySelectorAll(".tile"));

tilesstyle.forEach(tile => tile.addEventListener("mouseover",function(){
    tile.classList.add("boxhover") }));
tilesstyle.forEach(tile => tile.addEventListener("mouseout",function(){
    tile.classList.remove("boxhover") }));


const playstyle = document.getElementById('play');
playstyle.addEventListener("mouseover",function(){
    this.classList.add("boxclick");
})
playstyle.addEventListener("mouseout",function(){
    playstyle.classList.remove("boxclick");
})



tilesstyle.forEach(tile => tile.addEventListener("click", play));

