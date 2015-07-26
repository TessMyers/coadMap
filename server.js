var express = require('express');
var fs = require('fs')
var app = express();

// Very likely going to replace this with fully static file server, and control the content via path

app.use(express.static(__dirname + '/'));

app.get('/contents', function(req, res){

  fs.readFile(req.url, function(err, data){
    if (err) {
      console.log('error!', err);
    } else {
      res.end(data);
    }
  })
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});