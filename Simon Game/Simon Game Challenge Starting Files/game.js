var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animateButton(userChosenColour);
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    }
    else {
        console.log("Wrong!");

        //Wrong move sound
        makeSound("wrong");

        //Game-over flash all over the body of html
        $("body").addClass("game-over");

        //changing the h1 title to game over and restart
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }
}

function nextSequence() {

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //Level increase
    level++;
    $("#level-title").text("Level " + level);

    //Random colour generator
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Button Animation
    //$("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    animateButton(randomChosenColour);

    //Button Sound
    makeSound(randomChosenColour);

}





function makeSound(colour) {
    switch (colour) {
        case "red":
            var red = new Audio("sounds/" + colour + ".mp3");
            red.play();
            break;

        case "blue":
            var blue = new Audio("sounds/" + colour + ".mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio("sounds/" + colour + ".mp3");
            green.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/" + colour + ".mp3");
            yellow.play();
            break;

        case "wrong":
            var wrong = new Audio("sounds/" + colour + ".mp3");
            wrong.play();
            break;

        default:
            console.log(colour);
    }
}

function animateButton(colour) {
    var activeColour = $("#" + colour);
    activeColour.addClass("pressed");
    setTimeout(function () {
        activeColour.removeClass("pressed");
    }, 100);
}

function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}


