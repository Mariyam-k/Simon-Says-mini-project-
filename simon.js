let gameSeq = [];
let userSeq = [];
let btns = ["red","purple","green","yellow"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let highScore = 0;
//
let highScoreDisplay = document.querySelector("h3"); // create element for high score
highScoreDisplay.innerText = `High Score: ${highScore}`;
// document.body.insertBefore(highScoreDisplay, h2.nextSibling); // place it after h2

//started the game
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started !");
        started = true;
    };
    levelUp();
});

//level up the game create a random indx and extract the data from btns array
function levelUp() {
    userSeq =[];
    level++;
    h2.innerText = `Level ${level}`;
    // random index from btns array
    let randIdx = Math.floor(Math.random()*3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameFlash(randbtn);
    gameSeq.push(randcolor);
};
//flash the game button
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
};
//flashbthe user button that was clicked 
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
};


//tracking button pressed by the user 
function btnPress(){
    btn = this;
    userFlash(btn);

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkVal(userSeq.length-1);

};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};


function checkVal(idx){
    if(userSeq[idx]=== gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        };
        
    }else{
        // update high score if current level is greater
        if (level > highScore) {
            highScore = level;
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }

        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key .`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
        },250);
        reset();
    }
};
function reset(){
    level=0;
    gameSeq =[];
    userSeq = [];
    started = false;
}
