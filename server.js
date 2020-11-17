// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

const convertDateToUnix = input => {
  return input !== undefined ? new Date(input).getTime() : new Date().getTime();
}

const convertUnixToDate = Unix => {
  var x = new Date(Unix);
  const data = {
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days:["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }
  var year = x.getFullYear();
  var month = data.months[x.getMonth()];
  var day = data.days[x.getDay()]
  var date = x.getDate();
  var hour = x.getHours();
  var min = x.getMinutes();
  var sec = x.getDay();
  console.log(x.getDay())
  const time = `${day}, ${date} ${month} ${year}`
  return time
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp", function(req,res) {
  var unix = new Date().getTime();
  var utc = convertUnixToDate(unix)
  res.json({
    unix,
    utc 
  })
})

// your first API endpoint... 
app.get("/api/timestamp/:input", function (req, res) {
  let {input} = req.params;
  let checkWord = /[a-z]/ig
  input.toString();
  if (input.includes("-") && !checkWord.test(input)) {
    console.log('tess')
    input = input.split("-");
    var arr = [];

    arr[0] = input[0] || "1970";
    arr[1] = input[1] || "1";
    arr[2] = input[2] || "1"
    console.log(arr.join('-'))
    let unix = convertDateToUnix(arr.join("-"));
    let date = convertUnixToDate(unix);
    res.json({unix, utc: date})
  }else if (!input.includes("-") && !checkWord.test(input)) {
    let utc = convertUnixToDate(parseInt(input));
    res.json({unix:input, utc})
  }else {
    res.json({error: 'Invalid Date'});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
