const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  // console.log(req);
  var firstName = req.body.firstName;
  var secondName = req.body.secondName;
  var email = req.body.email;

  var data = {
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

  var JSONdata = JSON.stringify(data);
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

//d886c1ea28915ae21acaf6915445a202-us8
// 68c0aa09b7
