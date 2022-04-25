"use strict";
const axios = require("axios");
import "./style.css";

const booksUrl = `https://openlibrary.org/subjects/`;

const booksDescription = `https://openlibrary.org`;

let output = document.getElementById("output");
let inputInitial = document.getElementById("genre_input");
let input;
let mainSpan;
let descriptionDiv;
let descriptionSpan;
let closeButton;
let research = document.getElementById("research");

function setEmptyInputBox() {
  input = inputInitial.value;
  input = _.toLower(input);
  if (input[0] === " " || input[input.length - 1] === " ") {
    input = _.trimStart(input);
    input = _.trimEnd(input);
  }
  input = _.replace(`${input}`, " ", "_");
  document.getElementById("genre_input").value = "";
  if (output.hasChildNodes() && input !== "") {
    output.innerHTML = "";
  }
}

function getBooksFiltered() {
  axios
    .get(`${booksUrl + input}.json`)
    .then((res) => {
      console.log(res);
      if (res["data"]["work_count"] === 0) {
        alert(
          `That's a bummer! "${_.toUpper(
            input
          )}" does not count as genre. Try again!`
        );
      }

      research.innerHTML = `You searched for :'${_.toUpper(input)}'`;
      showBooksTitleAndAuthors(res);
    })

    .catch((err) =>
      console.err("function getBooksFiltered has been not handles properly")
    );
}

function showBooksTitleAndAuthors(res) {
  let books = res.data["works"];

  books.forEach((book) => {
    let bigContainer = document.createElement("div");
    bigContainer.className = "bigContainer";
    output.appendChild(bigContainer);

    mainSpan = document.createElement("div");
    mainSpan.className = "mainSpan";
    bigContainer.appendChild(mainSpan);

    let titleSpan = document.createElement("h2");
    titleSpan.innerHTML = `${book["title"]}`;
    titleSpan.className = "title";
    mainSpan.appendChild(titleSpan);
    let authorSpan = document.createElement("p");
    authorSpan.className = "author";
    authorSpan.innerHTML = `By ${book["authors"][0]["name"]}`;
    mainSpan.appendChild(authorSpan);

    let buttonDescription = document.createElement("button");
    buttonDescription.innerHTML = "info";
    buttonDescription.className = "buttonDescription";
    bigContainer.appendChild(buttonDescription);

    let key = book["key"];
    console.log(typeof key);
    descriptionDiv = document.createElement("div");
    descriptionDiv.className = "descriptionDiv";
    mainSpan.appendChild(descriptionDiv);

    closeButton = document.createElement("button");
    closeButton.className = "closeButton";
    closeButton.innerHTML = "close";
    descriptionDiv.appendChild(closeButton);
    closeButton.addEventListener("click", closeDescription);

    descriptionSpan = document.createElement("p");
    descriptionSpan.className = "descriptionSpan";
    descriptionDiv.appendChild(descriptionSpan);

    buttonDescription.addEventListener("click", () => {
      if (descriptionDiv.style.visibility === "hidden") {
        descriptionDiv.style.visibility = "visible";
        console.log("getdesription key" + getDescription(key));
        getDescription(key);
      } else {
        descriptionDiv.style.visibility = "hidden";
      }
    });
  });
}

function getDescription(key) {
  axios
    .get(`${booksDescription + key}.json`)
    .then((response) => {
      console.log("this is the response" + response);
      console.log(response);
      let description = response["data"]["description"];
      if (typeof description === "object") {
        descriptionSpan.innerHTML = `${description.value}`;
      } else if (typeof description === "string") {
        descriptionSpan.innerHTML = `${description}`;
      } else {
        descriptionSpan.innerHTML = `We are very sorry but the description isn't available for this one`;
      }
    })
    .catch((err) => console.log(err));
}

function closeDescription() {
  descriptionDiv.style.visibility = "hidden";
}

inputInitial.addEventListener("keydown", logkey);

function logkey(e) {
  if (e.defaultPrevented) {
    return;
  }
  if (e.key === "Enter") {
    setEmptyInputBox();
    getBooksFiltered();
  }
}
