var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var downloadFolder = require('./config').downloadFolder;
var port = process.env.PORT || 8082;

http.listen(port, function () {
    console.log('listening on *:' + port);
});

app.get('/list', function (req, res) {
    if (fs.existsSync(downloadFolder)) {
        var dirList = fs.readdirSync(downloadFolder);
        var returnHtml = '';
        dirList.forEach(function (fileName) {
            returnHtml += `<div><a target="#blank" href="${'/d/' + fileName}">${fileName}</a></div>`;
        });
        res.send(returnHtml);
    }
    else {
        res.send('404');
    }
});


app.get('/d/*', function (req, res) {
    var file = downloadFolder + decodeURI(req.url).replace('/d', '');
    if (fs.existsSync(file)) {
        var fileName = path.basename(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
        res.setHeader('Cache-Control', 'max-age=30')
        var fileStream = fs.createReadStream(file);
        fileStream.pipe(res);
    }
    else {
        res.send('404');
    }
});

// app.get('/d2', function (req, res) {
//     var file = fs.readFileSync('./filename.txt', 'utf-8')
//     if (fs.existsSync(file)) {
//         var filename = path.basename(file);
//         res.setHeader('Content-disposition', 'attachment; filename=' + filename);
//         var fileStream = fs.createReadStream(file);
//         fileStream.pipe(res);
//     }
//     else {
//         res.send('404');
//     }
// });

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + '/test.html')
})

app.get('/*', function (req, res) {
    res.sendFile(__dirname + req.url)
})

app.post('/post', function (req, res) {

})