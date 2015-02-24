var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var htmlparser = require("htmlparser2");
var http = require('http');
var url=require('url');
var cors = require('cors');
var request = require('request');

server.listen(3000);
app.use(cors());
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());

app.use(express.static(__dirname + '/public/dist'));
app.use(app.router);

app.get('/', function (req, res) {
  
  res.sendfile(__dirname + '/index.html');
  
});

function addhttp(url){
    
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
};

//app.post('/', function (req, res) {
//    var requestedUrl = req.body.url;
//    console.log(requestedUrl);
//    var responseObject = new Object();
//    
//    var options = {
//                            host: requestedUrl,
//                            method: 'GET'
//    };
//    
//    var tagMap = {};
//    
//    
//    
//    var get = http.request(options , function( response) {
//        
//        var sourceCode = '';
//
//        response.on('data', function(data) {
//                sourceCode += data;
//        });
//        
//        response.on('end', function() {               
//            
//            var parser = new htmlparser.Parser({
//                onopentag: function(tag, attribs){
//                    if(tagMap[tag])
//                        tagMap[tag] = tagMap[tag]+1;
//                    else
//                        tagMap[tag] = 1;
//                },
//                onclosetag: function(tagname){
//                    //console.log("Detected closing of "+tagname);
//                    
//                }
//            });
//            parser.write(sourceCode);
//            parser.end();
//            responseObject.summary = tagMap;
//            responseObject.source = sourceCode;
//            return res.send(responseObject);
//        });
//    });
//    
//    get.write("");
//    get.end();
//});



app.post('/', function (req, res) {
    var requestedUrl = req.body.url;
    requestedUrl = addhttp(requestedUrl);
    //console.log(requestedUrl);
    var responseObject = new Object();
    
    
    var tagMap = {};
    
  request.get(requestedUrl)
  .on('response', function(response) {
      var data = "";

    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function(){
        var parser = new htmlparser.Parser({
                onopentag: function(tag, attribs){
                    if(tagMap[tag])
                        tagMap[tag] = tagMap[tag]+1;
                    else
                        tagMap[tag] = 1;
                },
                onclosetag: function(tagname){
                    //console.log("Detected closing of "+tagname);
                    
                }
            });
            parser.write(data);
            parser.end();
            responseObject.summary = tagMap;
            responseObject.source = data;
            return res.send(responseObject);
    });
      
    
  }).on('error' , function(err){
      console.log(err);
      return res.status(404).send(err);
  });
    
    
});