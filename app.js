const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let uName = document.getElementById("username");
let pName = document.getElementById("pass");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEye = () => {
  eyeL.style.cssText = `
    left: 0.6em;
    top: 0.6em;
  `;

  eyeR.style.cssText = `
    right: 0.6em;
    top: 0.6em;
  `;
};

let normalHand = () => {
  handL.style.cssText = `
    height: 2.81em;
    top: 8.4em;
    left: 7.5em;
    transform: rotate(0deg);
  `;
  handR.style.cssText = `
    height: 2.81em;
    top: 8.4em;
    right: 7.5em;
    transform: rotate(0deg);
  `;
};

uName.addEventListener("focus", () => {
  eyeL.style.cssText = `
  left: 0.75em;
  top: 1.12em;
  `;
  eyeR.style.cssText = `
  right: 0.75em;
  top: 1.12em;
  `;
  normalHand();
});

pName.addEventListener("focus", () => {
  handL.style.cssText = `
    height: 6.56em;
    top: 3.87em;
    left: 11.75em;
    transform: rotate(-155deg);
  `;
  handR.style.cssText = `
    height: 6.56em;
    top: 3.87em;
    right: 11.75em;
    transform: rotate(155deg);
  `;
  normalEye();
});

document.addEventListener("click", (e) => {
  let clickedElement = e.target;
  if (clickedElement != uName && clickedElement != pName) {
    normalEye();
    normalHand();
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var email = req.body.mail;
  var password = req.body.pass;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          PASS: password,
        },
      },
    ],
  };
  const url = "https:us8.api.mailchimp.com/3.0/lists/3ae94958da";
  const options = {
    method: "post",
    auth: "prejith:596c2644d7ee42491eccec1178ec923c-us8",
  };
  var jsonData = JSON.stringify(data);
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server running at port 3000");
});

// 3ae94958da
// 596c2644d7ee42491eccec1178ec923c-us8
