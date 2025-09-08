/*1 Create a variable called sentence. The value of the variable should be a string that contains the words “not” and “bad”.*/
let sentence = "not the movie is not that bad, i like it";

let wordNot = sentence.indexOf("not");
let wordBad = sentence.indexOf("bad");

// console.log(wordNot);
// console.log(wordBad);

if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  // slice from start to "not" + "good" + slice from after "bad"
  let newSentence = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);
  console.log(newSentence);
} else {
  console.log(sentence);
}
