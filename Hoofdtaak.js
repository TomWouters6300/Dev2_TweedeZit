"use strict";

let Lijst;
const LilInsult = document.getElementById("LilInsult");
const BigInsult = document.getElementById("BigInsult");
const checkbox = document.getElementById("Name");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("InsultResult")
var fromVal;
var toVal;
var htmlString;
var Title;


document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault()
  fromVal = from.value;
  toVal = to.value;
  console.log(fromVal, toVal, Title);
  htmlString = `<a href="https://foaas.com/${Title}/${fromVal}/${toVal}">Here's your insult</a>`;
  result.innerHTML = htmlString;
})
checkbox.addEventListener("change", function () {
  if (this.checked) {
    BigInsult.style.display = "inline-block";
    LilInsult.style.display = "none";
    to.style.display = "inline-block";
    Title = BigInsult.value;
    
  } else {
    BigInsult.style.display = "none";
    LilInsult.style.display = "inline-block";
    to.style.display = "none";
    Title = LilInsult.value;
    
  }
})

LilInsult.addEventListener("change", function () {
  Title = LilInsult.value
})
BigInsult.addEventListener("change", function () {
  Title = BigInsult.value
})

const database = firebase.firestore();
const insultCollection = database.collection("thisInsult");

firebase.initializeApp({
  apiKey: 'AIzaSyDXfOI6eNE3vI58BMYq4Las_Fc1NjUOhnE',
  projectId: 'insult-generator-24a79'
});