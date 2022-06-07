const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const https = require("https");
const { response } = require("express");
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

  const url = "https://us9.api.mailchimp.com/3.0/lists/b7fc3e6132";
  const options = {
    method: "post",
    auth: "D3N2:57c43fdef1d5b6b4e1d72942f4001439-us9",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

//57c43fdef1d5b6b4e1d72942f4001439-us9
// b7fc3e6132
