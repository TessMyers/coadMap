var express = require('./client/node_modules/express/lib/express.js');
var fs = require('fs')
var app = express();

app.use('/',express.static(__dirname + '/client'));

app.get('/content/*', function(req, res){

  fs.readFile(__dirname + req.url, function(err, data){
    if (err) {
      console.log('error!', err);
    } else {
      res.type('json');
      res.send(data);
    }
  })
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});