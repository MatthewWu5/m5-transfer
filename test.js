// var fs = require('fs')
// http = require('http')
// var Transfer = require('./transfer.js')
// // path = require('path');
// var server = http.createServer(function (req, resp) {
// 	var transfer = new Transfer(req, resp);
// 	var filePath = 'C:\\Users\\wum\\Downloads\\riderRS-163.12057.exe';
// 	transfer.Download(filePath);
// }).listen(8000, function () {
// 	console.log('listening on *:' + 8000);
// });


var app = require('express')()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var multiparty = require('multiparty')

var http = require('http').Server(app)
http.listen(8000, function () {
	console.log('listening on *:' + 8000);
})

app.get("/test", function (req, res) {
	console.log('get request...')
	var expires = new Date()
	expires.setTime(expires.getTime() + 30 * 1000)
	res.setHeader("Cache-Control", "max-age=" + 30)
	//res.setHeader("Expires", expires.toUTCString())
	res.sendFile(__dirname + "/test.html")
})

app.get("/get", function (req, res) {
	console.log('...get it')
	res.sendFile(__dirname + "/test_post.html")
})

app.post("/post", function (req, res) {
	console.log('...get post')
	console.log(req.body)

	//????????????????????? How to parse FormData
	var form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
		//Wrong way
       console.log(fields)
    })

	res.end()
})

app.get("/cross1", function (req, res) {
	//need json.stringify
	//res.send('foo("cross 1")')
	res.send('"cross 1"')
})

app.get("/cross2", function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send('cross 2')
})


