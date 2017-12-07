var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var fileUpload = require('express-fileupload');

var http = require("http");
var formidable = require('formidable'); 
var fs = require('fs');
var mysql = require('mysql'); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use(fileUpload())

var recordnumber = 0;

var filetitle = '';
var filecomments = '';

var isError = false;
var isCover = true;

app.post('/uploadImage', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM filenumber", function (err, result, fields) {
		if (err) 
		{
			isError = true;
			throw err;
		}
		recordnumber = result[0].currentnumber;
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let coverToUpload = req.files.imageCoverToUpload;
			
			if(coverToUpload == undefined)
			{
				console.log("Cover was not input");
				isCover = false;
			}
			else
			{
				console.log(coverToUpload);
				// Use the mv() method to place the file somewhere on your server 
				coverToUpload.mv('public/covers/'+recordnumber+'.jpg', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded1!');
				});
			}			
			
			
			
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let fileToUpload = req.files.imageToUpload;
			
		 	if(fileToUpload == undefined)
			{
				console.log("File was not input");
				return res.redirect('/');
			}
			else
			{
				// Use the mv() method to place the file somewhere on your server 
				fileToUpload.mv('public/files/'+recordnumber+'.jpg', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded2!');
				});
			}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con1 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con1.connect(function(err) {
			  if (err) throw err;
			  console.log("Connected!");
			  
			  filetitle = req.body.title;
			  filecomments = req.body.comments; 
			  
			  var isThereCover;
			  var coverlink;
			  var filelink;
			  
			  if(isCover == false)
			  {
				  isThereCover = 0;
				  coverlink = '';
			  }
				 
			  if(isCover == true)
			  {
				  isThereCover = 1;
				  coverlink = 'public/covers/'+recordnumber+'.jpg';
			  }
				  
			  filelink = 'public/files/'+recordnumber+'.jpg';
			  			  
			  var sql1 = "INSERT INTO records (recordnumber, title, recordtype, coverphoto, comments, filelink, coverlink) VALUES (?, ?, 'image', ?, ?, ?, ?)";
			  con1.query(sql1, [ recordnumber, filetitle, isThereCover, filecomments, filelink, coverlink ], function(err, rows, fields) {
					if (err) throw err;
					console.log("1 record inserted");
			  });
			  
			  isCover = true;
			  
			});  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con2 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con2.connect(function(err) {
			  if (err) throw err;
			  var sql2 = "UPDATE filenumber SET currentnumber = ?";
			  con2.query(sql2, recordnumber+1, function (err, rows, fields) {
				if (err) throw err;
				console.log(result.affectedRows + " record(s) updated");
				return res.redirect('/');
			  });
			});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  
		
	  });
	});
	
   
  
  //return res.redirect('/');
});



app.post('/uploadAudio', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');


	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM filenumber", function (err, result, fields) {
		if (err) 
		{
			isError = true;
			throw err;
		}
		recordnumber = result[0].currentnumber;
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let coverToUpload = req.files.audioCoverToUpload;
			
			if(coverToUpload == undefined)
			{
				console.log("Cover was not input");
				isCover = false;
			}
			else
			{
				// Use the mv() method to place the file somewhere on your server 
				coverToUpload.mv('public/covers/'+recordnumber+'.jpg', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded1!');
				});
			}			
			
			
			
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let fileToUpload = req.files.audioToUpload;
			
		 	if(fileToUpload == undefined)
			{
				console.log("File was not input");
				return res.redirect('/');
			}
			else
			{
				// Use the mv() method to place the file somewhere on your server 
				fileToUpload.mv('public/files/'+recordnumber+'.mp3', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded2!');
				});
			}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con1 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con1.connect(function(err) {
			  if (err) throw err;
			  console.log("Connected!");
			  
			  filetitle = req.body.title;
			  filecomments = req.body.comments; 
			  
			  var isThereCover;
			  var coverlink;
			  var filelink;
			  
			  if(isCover == false)
			  {
				  isThereCover = 0;
				  coverlink = '';
			  }
				 
			  if(isCover == true)
			  {
				  isThereCover = 1;
				  coverlink = 'public/covers/'+recordnumber+'.jpg';
			  }
				  
			  
			  
			  filelink = 'public/files/'+recordnumber+'.mp3';
			  			  
			  var sql1 = "INSERT INTO records (recordnumber, title, recordtype, coverphoto, comments, filelink, coverlink) VALUES (?, ?, 'audio', ?, ?, ?, ?)";
			  con1.query(sql1, [ recordnumber, filetitle, isThereCover, filecomments, filelink, coverlink ], function(err, rows, fields) {
					if (err) throw err;
					console.log("1 record inserted");
			  });
			  
			  isCover = true;
			});  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con2 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con2.connect(function(err) {
			  if (err) throw err;
			  var sql2 = "UPDATE filenumber SET currentnumber = ?";
			  con2.query(sql2, recordnumber+1, function (err, rows, fields) {
				if (err) throw err;
				console.log(result.affectedRows + " record(s) updated");
				return res.redirect('/');
			  });
			});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  
		
	  });
	});
	
   
  
  //return res.redirect('/');
});


app.post('/uploadVideo', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');


	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM filenumber", function (err, result, fields) {
		if (err) 
		{
			isError = true;
			throw err;
		}
		recordnumber = result[0].currentnumber;
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let coverToUpload = req.files.videoCoverToUpload;
			
			if(coverToUpload == undefined)
			{
				console.log("Cover was not input");
				isCover = false;
			}
			else
			{
				// Use the mv() method to place the file somewhere on your server 
				coverToUpload.mv('public/covers/'+recordnumber+'.jpg', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded1!');
				});
			}			
			
			
			
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let fileToUpload = req.files.videoToUpload;
			
		 	if(fileToUpload == undefined)
			{
				console.log("File was not input");
				return res.redirect('/');
			}
			else
			{
				// Use the mv() method to place the file somewhere on your server 
				fileToUpload.mv('public/files/'+recordnumber+'.mp4', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded2!');
				});
			}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con1 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con1.connect(function(err) {
			  if (err) throw err;
			  console.log("Connected!");
			  
			  filetitle = req.body.title;
			  filecomments = req.body.comments; 
			  
			  var isThereCover;
			  var coverlink;
			  var filelink;
			  
			  if(isCover == false)
			  {
				  isThereCover = 0;
				  coverlink = '';
			  }
				 
			  if(isCover == true)
			  {
				  isThereCover = 1;
				  coverlink = 'public/covers/'+recordnumber+'.jpg';
			  }
				  
			  
			  
			  filelink = 'public/files/'+recordnumber+'.mp4';
			  			  
			  var sql1 = "INSERT INTO records (recordnumber, title, recordtype, coverphoto, comments, filelink, coverlink) VALUES (?, ?, 'video', ?, ?, ?, ?)";
			  con1.query(sql1, [ recordnumber, filetitle, isThereCover, filecomments, filelink, coverlink ], function(err, rows, fields) {
					if (err) throw err;
					console.log("1 record inserted");
			  });
			  
			  isCover = true;
			});  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con2 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con2.connect(function(err) {
			  if (err) throw err;
			  var sql2 = "UPDATE filenumber SET currentnumber = ?";
			  con2.query(sql2, recordnumber+1, function (err, rows, fields) {
				if (err) throw err;
				console.log(result.affectedRows + " record(s) updated");
				return res.redirect('/');
			  });
			});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  
		
	  });
	});
	
   
  
  //return res.redirect('/');
});


app.post('/uploadHyperlink', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');


	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM filenumber", function (err, result, fields) {
		if (err) 
		{
			isError = true;
			throw err;
		}
		recordnumber = result[0].currentnumber;
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
			let coverToUpload = req.files.hyperlinkCoverToUpload;
			
			if(coverToUpload == undefined)
			{
				console.log("Cover was not input");
				isCover = false;
			}
			else
			{
				// Use the mv() method to place the file somewhere on your server 
				coverToUpload.mv('public/covers/'+recordnumber+'.jpg', function(err) {
					if (err)
					{
						isError = true;
						return res.status(500).send(err);
					}
					  
					//res.send('File uploaded1!');
				});
			}			
			
			
			
			filehyperlink = req.body.hyperlink; 
			
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con1 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con1.connect(function(err) {
			  if (err) throw err;
			  console.log("Connected!");
			  
			  filetitle = req.body.title;
			  filecomments = req.body.comments; 
			  
			  var isThereCover;
			  var coverlink;
			  var filelink;
			  
			  if(isCover == false)
			  {
				  isThereCover = 0;
				  coverlink = '';
			  }
				 
			  if(isCover == true)
			  {
				  isThereCover = 1;
				  coverlink = 'public/covers/'+recordnumber+'.jpg';
			  }
				  
			  
			  
			  filelink = filehyperlink;
			  			  
			  var sql1 = "INSERT INTO records (recordnumber, title, recordtype, coverphoto, comments, filelink, coverlink) VALUES (?, ?, 'hyperlink', ?, ?, ?, ?)";
			  con1.query(sql1, [ recordnumber, filetitle, isThereCover, filecomments, filelink, coverlink ], function(err, rows, fields) {
					if (err) throw err;
					console.log("1 record inserted");
			  });
			  
			  isCover = true;
			});  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			var con2 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});
			
			con2.connect(function(err) {
			  if (err) throw err;
			  var sql2 = "UPDATE filenumber SET currentnumber = ?";
			  con2.query(sql2, recordnumber+1, function (err, rows, fields) {
				if (err) throw err;
				console.log(result.affectedRows + " record(s) updated");
				return res.redirect('/');
			  });
			});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  
		
	  });
	});
	
   
  
  //return res.redirect('/');
});

app.post('/deleteRecord', function(req, res) {
  
	var recordToDelete = req.body.recordnumber;
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  var sql = "DELETE FROM records WHERE recordnumber = ?";
	  con.query(sql, recordToDelete, function (err, result) {
		if (err) throw err;
		console.log("Number of records deleted: " + result.affectedRows);
		return res.redirect('/');
	  });
	});
  
  //return res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
