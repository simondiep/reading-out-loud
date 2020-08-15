// commented out words are not recognized by the speech recognition
const WORDS = [
  "at",
  // "bat",
  "cat",
  "pat",
  // "rat",
  // "sat",
  // "an",
  "can",
  "fan",
  "man",
  // "are",
  "ask",
  "as",
  "or",
  "mom",
  "and",
  // "us",
  "pad",
  "sad",
  // "can",
  "fan",
  // "pan",
  // "ran",
  "big",
  "dig",
  "pig",
  "in",
  "pin",
  // "win",
  "did",
  // "hid",
  // "rid",
  "if",
  "her",
  "hi",
  "bye",
  // "bee",
  "see",
  // "cow",
  "how",
  "now",
  // "bun",
  "fun",
  "run",
  "sun",
  // "but",
  "cut",
  "gut",
  "no",
  "yes",
  "on",
  "off",
];

var grammar = "#JSGF V1.0; grammar words; public <words> = " + WORDS.join(" | ") + " ;";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";

const instructionsDiv = document.getElementById("instructions");
const wordToSayDiv = document.querySelector(".word-to-say");
const wordYouSaidDiv = document.querySelector(".word-you-said");
let wordSelected;

setNewRandomWord();

document.onclick = function () {
  recognition.start();
  wordYouSaidDiv.textContent = "...";
  instructionsDiv.textContent = "Say this word";
  // TODO show speech bubble icon
};

recognition.onresult = function (event) {
  const wordSaid = event.results[0][0].transcript;
  wordYouSaidDiv.textContent = wordSaid;
  console.log("wordSelected: ", wordSelected, ", wordSaid: ", wordSaid);
  if (wordSelected === wordSaid.toLowerCase()) {
    // TODO play celebration audio
    // TODO show fun animation
    setNewRandomWord();
  }
};

recognition.onspeechend = function () {
  recognition.stop();
  // TODO show tap icon
  instructionsDiv.textContent = "Tap the screen";
};

function setNewRandomWord() {
  const selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  wordSelected = selectedWord;
  wordToSayDiv.textContent = selectedWord;
  return selectedWord;
}
