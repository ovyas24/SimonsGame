var colors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started =false;

$(document).keypress(function (e) { 
    if(!started){
        game();
        started=true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animateButton(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(()=>{
                game();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(()=>{
            $("body").removeClass('game-over');
        },200);
        startOver();
        $("#level-title").text("Game Over!!,Press any key to restart!   ");
    }
}

function game(){
    level+=1;
    $("#level-title").text("level "+level);

    userClickedPattern = [];

    var randNumber  = Math.floor(Math.random()*4);
    var randomChosenColour =colors[randNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();
}

function animateButton(color){
    $("#"+color).addClass("pressed");
    setTimeout(() => {$("#"+color).removeClass('pressed');}, 100);
}

function startOver(){
    started =false;
    level=0;
    userClickedPattern =[];
    gamePattern=[];
}