var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var port = process.env.PORT || 80;

http.listen(port, function () {
    console.log('listening on *:' + port);
});

app.get('/d', function (req, res) {
    var file = fs.readFileSync('./filename.txt', 'utf-8')
    if (fs.existsSync(file)) {
        var filename = path.basename(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        var fileStream = fs.createReadStream(file);
        fileStream.pipe(res);
    }
    else {
        res.send('404');
    }
});