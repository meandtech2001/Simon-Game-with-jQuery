var buttonColors=["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level=0;
var starter=false;



// computer
$(document).keypress(function(){
    if(!starter){
        $("#level-title").text("Level " + level);
        nextsequence();
        starter=true;
    }
});

//user 
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkanswer(userClickedPattern.length-1); //last index is sent
});

// computer
function nextsequence(){
    userClickedPattern =[]; //this is to consider the whole sequence...if whole sequence is not clicked then it stays like that only..or wrong

    level=level+1;
    $("#level-title").text("Level "+level);
    
    var n=Math.random();
    n=n*4;
    var randomnumber = Math.floor(n);
    var randomChosenColour = buttonColors[randomnumber];
    gamePattern.push(randomChosenColour);
    console.log("computer : "+ gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

//sound for user
function playSound(name){

        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

//animation for user
function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkanswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){ //both arrays last index is checked
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){ //if last index is here 
         setTimeout(function(){
             nextsequence()
        },1000);
      }
        
    }
    
    else{
        var audio  = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
    
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 500);
        
        $("h1").text("Game Over, Press A Key to Restart")
        
        startover();
        
        }
    }
    
//start=over
function startover(){
    level=0;
    gamePattern=[];
    starter=false;    
}
    






    

