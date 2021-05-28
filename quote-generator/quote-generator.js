let colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

let quotes = [
  {quote: "You have to write the book that wants to be written. And if the book will be too difficult for grown-ups, then you write it for children.", author: "Madeleine L'Engle"},
  {quote: "If you don't have time to read, you don't have the time (or the tools) to write. Simple as that.", author: "Stephen King"},
  {quote: "We write to taste life twice, in the moment and in retrospect.", author: "Anaïs Nin"},
  {quote: "Substitute 'damn' every time you're inclined to write 'very;' your editor will delete it and the writing will be just as it should be.", author:"Mark Twain"},
  {quote: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.", author:"Toni Morrison"},
  {quote: "One day I will find the right words, and they will be simple.", author: "Jack Kerouac, The Dharma Bums"},
  {quote: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin"},
  {quote: "You never have to change anything you got up in the middle of the night to write.", author: "Saul Bellow"},
  {quote: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray"}
];

function getQuote(){
let randomColor = Math.floor(Math.random()*colors.length);
let randomQuote = Math.floor(Math.random()*quotes.length);
let currentQuote = quotes[randomQuote].quote;
let currentAuthor = quotes[randomQuote].author;
console.log(currentQuote, currentAuthor);

$("body").css("background-color",colors[randomColor]);
$("body").css("color", colors[randomColor]);
$("#new-quote").css("background-color", colors[randomColor]);
$(".button").css("background-color", colors[randomColor]);
$("#text").text(" " + currentQuote);
$("#author").text("- " + currentAuthor);
$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=tezi.app&text=' + currentQuote + ' -' + currentAuthor);
}

//function tweetClick(){ openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=tezi.app&text=' + currentQuote + " -" + currentAuthor);
//}
  
$(document).ready(function() {
  getQuote();
  $("#new-quote").on('click', getQuote);
  //$("#tweet-quote").on('click', tweetClick);  
});