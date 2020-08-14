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

//getting api and implementing it in html//

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault()
  fromVal = from.value;
  toVal = to.value;
  console.log(fromVal, toVal, Title);
  htmlString = `<a href="https://foaas.com/${Title}/${fromVal}/${toVal}">Here's your insult</a>`;
  result.innerHTML = htmlString;
})

//checkbox to toggle insult with 1 or 2 names//

class Insults {
  constructor() {
    this.check();
  }
  check() {
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
  }
}
var myInsult = new Insults();

//gets titel value for insult//

class InsultValue {
  constructor() {
    this.value();
  }
  value() {
    LilInsult.addEventListener("change", function () {
      Title = LilInsult.value
    })
    BigInsult.addEventListener("change", function () {
      Title = BigInsult.value
    })
  }

}
var value = new InsultValue();


//firebase//


const database = firebase.firestore();
const insultCollection = database.collection("thisInsult");

firebase.initializeApp({
  apiKey: 'AIzaSyDXfOI6eNE3vI58BMYq4Las_Fc1NjUOhnE',
  projectId: 'insult-generator-24a79'
});

class pushData {
  constructor() {

  }
  dataPush() {
    insultCollection.push(result)
  }
}