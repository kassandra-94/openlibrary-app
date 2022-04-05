"use strict";

let div = document.getElementById("div");
// let output = document.getElementById("output");
let button = document.getElementById("buttonSearch");
let input = document.getElementById("genre_input").value;
console.log(input);

function setInputEmpty() {
  //input = document.getElementById("genre_input").value;
  // console.log(input);
  document.getElementById("genre_input").value = "";
}

console.log(input);
function getBooksFilteredBySubject(sub) {
  return fetch(`https://openlibrary.org/subjects/${sub}.json`); // return promise
}
let dati;
let buttonDescription;

async function convertiJson() {
  const books = await getBooksFilteredBySubject(input);
  console.log(books);
  dati = await books.json();
  console.log(dati);
  console.log(typeof dati);
  let array = dati["works"];
  console.log(typeof array);
  console.log(dati.length);
  let key = array["key"];

  console.log(array);
  for (let i = 0; i < array.length; i++) {
    let subarray = array[i]["authors"];
    let smallContainer = document.createElement("div");
    let bigContainer = document.createElement("div");
    buttonDescription = document.createElement("button");
    output.appendChild(buttonDescription);
    buttonDescription.className = "buttonDescription";
    output.appendChild(bigContainer);
    bigContainer.appendChild(smallContainer);
    bigContainer.className = "bigContainer";
    bigContainer.appendChild(buttonDescription);

    smallContainer.className = "smallContainer";
    let title = document.createElement("h2");
    title.className = "title";
    smallContainer.appendChild(title);
    title.innerHTML = array[i]["title"];
    let key = array[i]["key"];
    console.log(key);

    for (let y = 0; y < subarray.length; y++) {
      let authorsList = document.createElement("ul");
      let authors = document.createElement("li");
      smallContainer.appendChild(authorsList);
      authorsList.appendChild(authors);
      authors.innerHTML = subarray[y]["name"];
    }
  }
}
button.addEventListener("click", () => {
  setInputEmpty();
  convertiJson();
});
