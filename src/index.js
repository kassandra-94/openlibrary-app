"use strict";
const axios = require("axios");
import "./style.css";

const booksUrl = `https://openlibrary.org/subjects/`;

const booksDescription = `https://openlibrary.org`;

let output = document.getElementById("output");
let button = document.getElementById("buttonSearch");
let inputInitial = document.getElementById("genre_input");
let input;
let key;
let mainSpan;
let descriptionDiv;
let descriptionSpan;

function setInputEmpty() {
  input = inputInitial.value;
  console.log(input);
  document.getElementById("genre_input").value = "";
  if (output.hasChildNodes() && input !== "") {
    output.innerHTML = "";
  }
}

function getBooksFiltered() {
  axios
    .get(`${booksUrl + input}.json`)
    .then((res) => showBooksTitleAndAuthors(res))
    .catch((err) => console.error(err));
}

function showBooksTitleAndAuthors(res) {
  let data = res.data;
  let books = data["works"];
  let keys = books["key"];
  console.log(keys);
  console.log(books);

  books.forEach((book) => {
    let bigContainer = document.createElement("div");
    bigContainer.className = "bigContainer";
    output.appendChild(bigContainer);

    mainSpan = document.createElement("span");
    mainSpan.className = "mainSpan";
    bigContainer.appendChild(mainSpan);

    let titleSpan = document.createElement("span");
    titleSpan.innerHTML = `${book["title"]}`;
    titleSpan.className = "title";
    mainSpan.appendChild(titleSpan);
    let authorSpan = document.createElement("span");
    authorSpan.innerHTML = `${book["authors"][0]["name"]}`;
    mainSpan.appendChild(authorSpan);

    let buttonDescription = document.createElement("button");
    buttonDescription.className = "buttonDescription";
    bigContainer.appendChild(buttonDescription);

    let key = book["key"];
    descriptionDiv = document.createElement("div");
    descriptionDiv.className = "descriptionDiv";
    mainSpan.appendChild(descriptionDiv);

    let closeButton = document.createElement("button");
    closeButton.className = "closeButton";
    descriptionDiv.appendChild(closeButton);

    descriptionSpan = document.createElement("p");
    descriptionDiv.appendChild(descriptionSpan);

    buttonDescription.addEventListener("click", () => {
      if (descriptionDiv.style.visibility === "hidden") {
        descriptionDiv.style.visibility = "visible";
        closeButton.style.visibility = "visible";
        getDescription(key);
      } else {
        descriptionDiv.style.visibility = "hidden";
        closeButton.style.visibility = "hidden";
      }
    });
  });
}

function getDescription(key) {
  axios
    .get(`${booksDescription + key}.json`)
    .then((response) => {
      console.log(response);
      console.log(response["data"]["description"]);
      let description = response["data"]["description"];

      if (typeof description === "object") {
        descriptionSpan.innerHTML = `${response["data"]["description"].value}`;
      } else if (typeof description === "string") {
        descriptionSpan.innerHTML = `${response["data"]["description"]}`;
      } else if (typeof description === "null") {
        descriptionSpan.innerHTML = `We are very sorry but the description isn't available for this one`;
      }
    })
    .catch((err) => console.log(err));
}

button.addEventListener("click", () => {
  setInputEmpty();
  getBooksFiltered();
});
