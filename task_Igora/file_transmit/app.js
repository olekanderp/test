const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
var request = require('request');
var fs = require('fs');
const splitFile = require('split-file');


const app = express();


app.use(fileUpload());  
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

//початкова сторінка для вибору файла
app.get("/upload", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/form.html");
});
 
app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let dir_file = '/home/pi/testFile/';// директорія щоб зберегти файл
  let file_name = sampleFile.name;//повертає імя файла що завантажуєм
  let newFile = dir_file + file_name; // збираю в одне ціле файл і шлях до файла

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(newFile, function(err) {
    if (err)
      return res.status(500).send(err);
  		//console.log(sampleFile.data)
  		//var contents = fs.readFileSync(dir_file,'base64');
  		//console.log(contents)
    	//res.send('File read!'); 
	console.log(newFile);
	});
  	
res.send("Файл передався успішно");
});

//моніторинг скільки передалося файлів
app.get("/status", urlencodedParser, function (req, res) {
    res.send("Передалося  "  + num_mes*5 + " %");
});

 
app.listen(3000);


