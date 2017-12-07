var express = require('express');
var router = express.Router();

var records = [];

console.log("Haris: Creating the empty array");

var firstTime = 1;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hariskhan"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE tndb", function (err, result) {
    if (err) console.log(err);
    console.log("Haris: tndb Database created");
	
	var con1 = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con1.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  var sql = "CREATE TABLE records (recordnumber int(11) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50) NOT NULL, recordtype VARCHAR(20) NOT NULL, coverphoto int(11) NOT NULL, comments VARCHAR(20000), filelink VARCHAR(535), coverlink VARCHAR(535))";
	  con1.query(sql, function (err, result) {
		if (err) console.log(err);
		console.log("Haris: records Table created");
			
		var con2 = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "hariskhan",
		  database: "tndb"
		});


		con2.connect(function(err) {
		  if (err) throw err;
		  con2.query("SELECT * FROM records", function (err, result, fields) {   //       Finish creating the array, then pass it to index.jade and try to make sense of it their
			if (err) console.log(err);
			for(i=0; i < result.length; i++)
			{
				records.push({
					recordnumber: result[i].recordnumber,
					title: result[i].title,
					recordtype: result[i].recordtype,
					coverphoto: result[i].coverphoto,
					comments: result[i].comments,
					filelink: result[i].filelink,
					coverlink: result[i].coverlink
				});
				//console.log(records[i]);
			}
			console.log("Haris: Filling the empty array for the first time");	
		  });
		});

	  });
	});
	
	var con3 = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con3.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  var sql = "CREATE TABLE filenumber (currentnumber int(11) AUTO_INCREMENT PRIMARY KEY)";
	  con3.query(sql, function (err, result) {
		if (err) 
			console.log(err);
		else
		{
			console.log("Haris: filenumber Table created");
			var con4 = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "hariskhan",
			  database: "tndb"
			});

			con4.connect(function(err) {
			  if (err) throw err;
			  console.log("Connected!");
			  var sql = "INSERT INTO filenumber (currentnumber) VALUES (1)";
			  con4.query(sql, function (err, result) {
				if (err) console.log(err);
				console.log("Haris: 1 inserted into currentnumber");
			  });
			});
		}			
	  });
	});

  });
});


/* GET home page. */
router.get('/', function(req, res) {
	
	if(firstTime != 1)
	{
		var mysql = require('mysql');

		var con1 = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "hariskhan",
		  database: "tndb"
		});
		

		con1.connect(function(err) {
		  if (err) throw err;
		  con1.query("SELECT * FROM records", function (err, result, fields) {  
			if (err) throw err;
			records = [];
			console.log("Emptying previous array");
			for(i=0; i < result.length; i++)
			{
				records.push({
					recordnumber: result[i].recordnumber,
					title: result[i].title,
					recordtype: result[i].recordtype,
					coverphoto: result[i].coverphoto,
					comments: result[i].comments,
					filelink: result[i].filelink,
					coverlink: result[i].coverlink
				});
				//console.log(records[i]);
			}
			console.log("Filling array again");
			console.log("Getting the updated array");
			res.locals.records = records;
			res.render('index');
		  });
		});
	}

  if(firstTime == 1)
  {
	console.log("Getting the updated array");
	res.locals.records = records;
	firstTime = 0;
	res.render('index');
  }
});


/* GET Hello World page. */
router.get('/helloworld', function(req, res) {	
	var mysql = require('mysql');


	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "hariskhan",
	  database: "tndb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM records", function (err, result, fields) {   //       Finish creating the array, then pass it to index.jade and try to make sense of it their
		if (err) throw err;
		for(i=0; i < result.length; i++)
		{
			records.push({
				recordnumber: result[i].recordnumber,
				title: result[i].title,
				recordtype: result[i].recordtype,
				coverphoto: result[i].coverphoto,
				comments: result[i].comments,
				filelink: result[i].filelink,
				coverlink: result[i].coverlink
			});
			console.log(records[i]);
		}
	  });
	});
	
  res.locals.records = records;
  res.locals.counter = 0;
  res.render('helloworld');
});


module.exports = router;