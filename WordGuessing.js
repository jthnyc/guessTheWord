let totalGuessCount = 6;
let wrongChar = [];
let totalWinCount = 0;
let totalLoseCount = 0;

let spacingInDom = document.getElementsByClassName("spacing");
let wrongGuessesInDom = document.getElementsByClassName("wrongGuess")
let numOfGuessInDom = document.getElementsByClassName("guessCount")
let totalWinInDom = document.getElementsByClassName("winCount")
let totalLostInDom = document.getElementsByClassName("loseCount")

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // response returns as a long string with return symbol that separates the words
      var response = this.responseText;
      var splittedArray = response.split("\n");

      // use a random index to help select a word from the array
      var randomIdx = Math.floor(Math.random() * splittedArray.length);
      var selectedWord = splittedArray[randomIdx];
      console.log(selectedWord)

      // once we know what the selected word is, create corresponding spacing to show to player
      var selectedWordSpacing = [];
      for (var j=0; j<selectedWord.length; j++) {
        selectedWordSpacing.push("_");
      }
      console.log(selectedWordSpacing);
      document.getElementById("underscores").innerHTML = selectedWordSpacing.join(" ");

      // handle player input
      document.addEventListener('keypress', (event) => {
      var keyChar = String.fromCharCode(event.keyCode);
      console.log(keyChar);  
      var indexOfChar = selectedWord.indexOf(keyChar);

      if (indexOfChar > -1) {
        console.log("correct!")
        selectedWordSpacing[indexOfChar] = keyChar;
        spacingInDom[0].innerHTML = selectedWordSpacing.join(" ");
        console.log(selectedWordSpacing);
      } else {
        console.log("wrong!")
        wrongChar.push(keyChar);
        totalGuessCount--;
        wrongGuessesInDom[0].innerHTML = wrongChar;
        numOfGuessInDom[0].innerHTML = totalGuessCount;
      }
      newFunction(selectedWordSpacing, selectedWord);

    })

    }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://app.linkedin-reach.io/words", true);
  xhttp.send();
}

function newFunction(selectedWordSpacing, selectedWord) {
  if (selectedWordSpacing.join("") === selectedWord) {
    alert('You won!');
    totalWinCount++;
    totalWinInDom[0].innerHTML = totalWinCount;
    selectedWordSpacing = [];
  }
  else if (totalGuessCount === 0) {
    alert('You lost!');
    totalLoseCount++
    totalLostInDom[0].innerHTML = totalLoseCount;
    selectedWordSpacing = [];
  }
}