"use strict";

//checkbox to toggle insult with 1 or 2 names & getting api and implementing it in html//

class Insults {
  constructor() {
    this.fromVal = '';
    this.toVal = '';
    this.htmlString = '';
    this.Title = '';
    this.LilInsult = document.getElementById("LilInsult");
    this.BigInsult = document.getElementById("BigInsult");
    this.checkbox = document.getElementById("Name");
    this.from = document.getElementById("from");
    this.to = document.getElementById("to");
    this.result = document.getElementById("InsultResult");
    this.addEventListener();
  }
  addEventListener() {
    this.checkbox.addEventListener("change", this.ImproviseAdaptOvercome.bind(this));
    document.getElementById("submit").addEventListener("click", this.Showresult.bind(this));
  }

  ImproviseAdaptOvercome() {
    if (this.checkbox.checked === true) {

      this.BigInsult.style.display = "inline-block";
      this.LilInsult.style.display = "none";
      this.to.style.display = "inline-block";
      document.getElementById('toText').style.display = "inline-block";
      this.to.value = "";
      this.from.value = '';

    } else if (this.checkbox.checked === false) {

      this.BigInsult.style.display = "none";
      this.LilInsult.style.display = "inline-block";
      document.getElementById('toText').style.display = "none";
      this.to.style.display = "none";
      this.to.value = "";
      this.from.value = '';
    }
  }


  Showresult() {
    event.preventDefault();
    this.fromVal = this.from.value;
    this.toVal = this.to.value;
    if (this.toVal !== "") {
      this.htmlString = `<a href="https://foaas.com/${this.BigInsult.value}/${this.fromVal}/${this.toVal}">Here's your insult</a>`;
      Database.saveinsult(this.fromVal, this.BigInsult.value, this.toVal, 0);
    } else {
      this.htmlString = `<a href="https://foaas.com/${this.LilInsult.value}/${this.fromVal}/">Here's your insult</a>`;
      Database.saveinsult(this.fromVal, this.LilInsult.value, this.toVal, 0);
    }

    this.result.innerHTML = this.htmlString;

  }
}



//firebase//


class Firebase {
  constructor(apiKey, projectId) {
    firebase.initializeApp({
      apiKey,
      projectId,
    });
    this.database = firebase.firestore();
    this.showData();
  }
  convertQuerySnapshotToRegularArray(querySnapshot) {
    return querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  }
  showData() {
    this.database.collection("Insults").onSnapshot((doc) => {
      this.data = this.convertQuerySnapshotToRegularArray(doc);
      document.getElementById('message').innerHTML = '';
      this.data.sort(function(a,b){
      return a.fromVal.localeCompare(b.fromVal);
      })
      this.data.forEach(element => {
        console.log(element);
        new Messages(element.fromVal, element.Title, element.count, element.toVal);
      });
    });

  }
  saveinsult(from, title, to, counter) {
    console.log(from, to, title);
    this.database.collection("Insults").doc(`${title}${from}${to}`).set({
      fromVal: from,
      toVal: to,
      Title: title,
      count: counter,
    });
  }
}
const Database = new Firebase('AIzaSyDXfOI6eNE3vI58BMYq4Las_Fc1NjUOhnE', 'insult-generator-24a79');
const myInsult = new Insults();


class Messages {
  constructor(from, title, counter, to) {
    this.from = from;
    this.title = title;
    this.counter = counter;
    this.to = to;
    this.url = `https://foaas.com/${this.title}/${this.from}/${this.to}`
    this.htmlString = '';
    this.toggle = false;
    this.addHtml();
    this.addEventListener();
  }
  addHtml() {

    if (this.to === '') {
      this.htmlString = `<h3 id="insultMessage">a message has been left by ${this.from}</h3>
<p><a href="${this.url}" id="insultLink">The message</a></p>
<img id="${this.url}" class="icon" src="./Img/heart.png" alt="heart">
<p id="count">${this.counter}</p>`
    } else {
      this.htmlString = `<h3 id="insultMessage">a message has been left by ${this.from} for ${this.to}</h3>
<p><a href="${this.url}" id="insultLink">The message</a></p>
<img id="${this.url}" class="icon" src="./Img/heart.png" alt="heart">
<p id="count">${this.counter}</p>`
    }
    document.getElementById('message').insertAdjacentHTML("beforeend", this.htmlString);
  }
  addEventListener() {
    document.getElementById(`${this.url}`).addEventListener('click', this.addLike.bind(this));
  }
  addLike() {
    console.log(event.target.id);
    this.counter += 1;
    Database.saveinsult(this.from, this.title, this.to, this.counter);
  }
}