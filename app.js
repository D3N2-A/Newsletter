const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  // console.log(req);
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/68c0aa09b7";
  const options = {
    method: "post",
    auth: "D3N2:d886c1ea28915ae21acaf6915445a202-us8",
  };

  const request = https.request(url, options, function (req, res) {
    res.on("data", console.log(JSON.parse(data)));
  });
  request.wirte(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

//d886c1ea28915ae21acaf6915445a202-us8
// 68c0aa09b7
