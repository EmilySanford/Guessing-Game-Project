$(document).ready(function(){
	var number = randomNumber();
	var arr = [];
	var guessesRemaining = 5;
	$('#submit-button').on('click', checkAnswer);
	$('#number-guess').on('keypress', checkIfEnterKey);
	$('#hint-button').on('click', giveAnswer);
	$('#reset-button').on('click', newGame);


//generate a random number between 1 and 100
function randomNumber(){
	return Math.floor((Math.random() * 100) + 1);
}	

//a separate function to allow guesses via the enter button on the keyboard
function checkIfEnterKey(event){
	if(event.which == 13) {
		checkAnswer();
	}
};

//check if a number has already been guessed
function checkForDuplicates(num){
	for (var i = 0; i < arr.length; i++){
		if (arr[i] === num){
		return true;
		} 
	} return false;
}; 

function checkAnswer(){
	$('#feedback').html("");
	var feedback = "";
	var str = "";
	var userInput = $('#number-guess').val();
	var difference = Math.abs(userInput - number);

	var duplicate = checkForDuplicates(userInput);
	if (duplicate === true){
	$('#feedback').html("You already tried that number!");
	} else if (isNaN(userInput)===true || userInput > 100 || userInput < 0){
		$('#feedback').html("Hmm. That's not a valid input. Try again.")
	} else if (userInput == number){
		$('#feedback').html("Congratulations! You are correct!");
		$('#submit-button').html("Play Again!").on('click', newGame);
		$('#box').addClass('winner');
	} else{
		arr.push(userInput);
		guessesRemaining -= 1;
		str += arr.join("  ");
		$('.previous').show().html("Previous Guesses: " + str);
	
//use absolute value to determine a number's "hotness"
	if (difference < 5){
		feedback = "You're super hot! ";
	} else if (difference < 11){
		feedback = "It's getting hot in here! ";
	} else if (difference < 21){
		feedback = "You're warm. ";
	} else {
		feedback = "You're cold. ";
	}
}
//provide feedback that combines "hotness" with which direction to guess
	if (duplicate === true){
	$('#feedback').html("You already tried that number!");
	} else if (userInput < number){
	$('#feedback').text(feedback + "Guess higher.");
	} 
	else if(userInput > number) {
	$('#feedback').text(feedback + "Guess lower.");
	} 

//ends game when guesses used up
	$('#number-of-guesses').html(guessesRemaining);
	if (guessesRemaining == 0){
		$('#feedback').html("Sorry - you lost this round! Try again.");
		$('h2').html("GAME OVER!");
		$('#submit-button').html("Play Again!").on('click', newGame);
	}

}

function giveAnswer(){
	$('#feedback').html("The answer is " + number);
}


function newGame(){
	arr = [];
	str = "";
	$('.previous').hide();
	$('#box').removeClass('winner');
	number = randomNumber();
	guessesRemaining = 5;
	$('#number-of-guesses').html(guessesRemaining);
	$('h2').html("PICK A NUMBER BETWEEN 1 AND 100");
	$('#feedback').html("A fresh start. Good luck!");
	$('#submit-button').html("Submit Guess").on('click', checkAnswer)
}



});
