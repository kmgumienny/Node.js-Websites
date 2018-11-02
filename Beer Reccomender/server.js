
var http = require('http'),
fs = require('fs'),
url = require('url'),
path = require('path'),
qs = require('querystring'),
// XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
port = 8000;

// Data-set to store recommened beers in memory and queried for results page
var results = [];

var server = http.createServer(function(req, res) {
var uri = url.parse(req.url)
if (req.method === 'GET') {
  switch (uri.pathname) {
    case '/':
      sendFile(res, 'public/index.html')
      break;
    case '/index.html':
      sendFile(res, 'public/index.html')
      break;
    case '/baby.html':
      sendFile(res, 'public/baby.html')
      break;
    case '/results.html':
      sendFile(res, 'public/results.html')
      break;
    case '/css/style.css':
      sendFile(res, 'public/css/style.css', 'text/css')
      break;
    case '/js/scripts.js':
      sendFile(res, 'public/js/scripts.js', 'text/javascript')
      break;
    case '/barImage.jpg':
      sendFile(res, 'barImage.jpg')
      break;
    case '/beerTapTrans.png':
      sendFile(res, 'beerTapTrans.png')
      break;
    case '/beerGlass2.png':
      sendFile(res, 'beerGlass2.png')
      break;
    case '/sippyCup.png':
      sendFile(res, 'sippyCup.png')
      break;
    case '/beer.png':
      sendFile(res, 'beer.png')
      break;
    case '/kindergarten.jpg':
      sendFile(res, 'kindergarten.jpg')
      break;
    case '/beer.jpg':
      sendFile(res, 'beer.jpg')
      break;
    case '/babyDrinks':
      chooseDrink(res);
      break;
    case '/babyCry.mp3':
      sendFile(res, "babyCry.mp3");
      break;
    case '/data':
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.end(JSON.stringify(results))
      break;
    default:
      res.end('404 not found')
  }
} else if (req.method === 'POST') {
  console.log("POST request");
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var formData = JSON.parse(body);
    doAPICall(res, formData)
  });

} else {
  get404(req, res);
}
})

server.listen(process.env.PORT || port);
console.log('listening on 8000')

function doAPICall(res, data) {
//save results

//separate the data
//get the data needed for api call
var alcLow = data.Alcohol1;
var alcHigh = data.Alcohol2;
var style ='';
var styleTrue = '';
var category='';
var categoryTrue = '';
var brewer='';
var brewerTrue = '';
var country='';
var countryTrue = '';

if(data.style !== 'Any'){
  style = data.style;
  styleTrue = '&refine.style_name=';
}

if(data.categories !== 'Any'){
  category = data.categories;
  categoryTrue = '&refine.cat_name=';
}

if(data.brewer !== 'Any'){
  brewer = data.brewer;
  brewerTrue = '&refine.name_breweries=';
}

if(data.country !== 'Any'){
  country = data.country;
  countryTrue = '&refine.country=';
}
//organize the data
var apiUrl = 'http://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&rows=6000&facet=style_name&facet=cat_name&facet=name_breweries&facet=country' + categoryTrue + category + countryTrue + country + brewerTrue + brewer + styleTrue + style;
console.log(apiUrl);
//do the api call
parsedData = makeCall(apiUrl, res, alcLow, alcHigh, processResponse);
}

function makeCall(apiUrl, res, alcLow, alcHigh, callback) {
var parsedData;
http.get(apiUrl, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log(data);
    parsedData = JSON.parse(data);
    callback(res, alcLow, alcHigh, parsedData);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}

function processResponse(res, alcLow, alcHigh, parsedData) {
//console.log(parsedData.records[1].fields.descript);
console.log(parsedData.nhits);
var alcByVolumeList = [];
for (var x = 0; x < parsedData.nhits; x++) {
  if (parsedData.records[x].fields.abv >= alcLow && parsedData.records[x].fields.abv <= alcHigh) {
    alcByVolumeList.push(parsedData.records[x]);
  }
}

// Get random beer from returned list
var beer = alcByVolumeList[Math.floor(Math.random()*alcByVolumeList.length)];

// Add beer to results array to be stored in memory
results.push(beer);

// Send response back to client with recommended beer
res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded'});
res.end(JSON.stringify(beer));
}

function get404(req, res) {
//fill in
}
// subroutines
// NOTE: this is an ideal place to add your data functionality

function chooseDrink(res){
var drinks = ["Skim Milk",
              "1% Milk",
              "2% Milk",
              "Whole Milk",
              "Chocolate Milk",
              "Apple Juice",
              "Orange Juice",
              "Cranberry Juice",
              "La Croix Seltzer"];
var rand = drinks[Math.floor(Math.random() * drinks.length)];
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end(rand);
}

function sendFile(res, filename, contentType) {
contentType = contentType || 'text/html';

fs.readFile(filename, function(error, content) {
  res.writeHead(200, {'Content-type': contentType})
  res.end(content, 'utf-8')
})

}
