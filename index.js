var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var htmlparser = require("htmlparser2");
var http = require('http');
var url=require('url');

server.listen(3000);
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());

app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.get('/', function (req, res) {
  console.log(__dirname);
  
  var options = {
                            host: 'www.google.com/id=2',
                            method: 'GET'
    };

    var googleCall = http.request(options, function( response) {
        
        var responseString = '';

        response.on('data', function(data) {
                responseString += data;
        });
             response.on('end', function() {               
                return res.send(responseString);
             });
    });
  
    googleCall.write("");
    googleCall.end();
  
 // res.sendfile(__dirname + '/index.html');
  
});



app.post('/', function (req, res) {
    var requestedUrl = req.body.url;
    
    var options = {
                            host: requestedUrl,
                            method: 'GET'
    };
    
    var tagMap = {};
    
    var get =  http.request(options, function( response) {
        
        var responseString = '';

        response.on('data', function(data) {
                responseString += data;
        });
        
        response.on('end', function() {               
            
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
            parser.write(responseString);
            parser.end();
            
            return res.send(tagMap);
        });
    });
    
    get.write("");
    get.end();
});

