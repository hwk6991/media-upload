/* Hello, World! program in node.js */

var http = require("http");
var formidable = require('formidable'); 
var fs = require('fs');
var mysql = require('mysql'); 

http.createServer(function (request, response) {

	if(request.url == '/fileupload'){
		
	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  con.query("CREATE DATABASE testingmysqldb", function (err, result) {
		if (err) throw err;
		console.log("Database created");
	  });
	});
	
	
		
	var form = new formidable.IncomingForm();
		var error = false;
		form.parse(request, function (err, fields, files) {
			
		  var oldpath = files.filetoupload.path;
		  var newname = 'myNewName';
		  var newpath = 'C:/Users/Khan/TestingNodeJs/' + 'newname' + '.jpg';
		  fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
				else error = false;
		  });
		  var oldpath1 = files.covertoupload.path;
		  var newpath1 = 'C:/Users/Khan/TestingNodeJs/' + files.covertoupload.name;
		  fs.rename(oldpath1, newpath1, function (err) {
			if (err) throw err;
				else error = false;
		  });
		 
		  
		  if(error == false)
		  {
			    response.write('File uploaded and moved!');
				response.end();
		  }
	 });
		
	} else {
		fs.readFile('index.html', function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
		  });
	}
	
}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
