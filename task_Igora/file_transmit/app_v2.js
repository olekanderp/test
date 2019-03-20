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


app.get("/upload", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/form.html");
});
 
app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let dir_file = 'C:/Users/Саша/Desktop/Princup/task Igora/send_file/form_for_file/file/new_model.h5';

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(dir_file, function(err) {
    if (err)
      return res.status(500).send(err);
  		//console.log(sampleFile.data)
  		//var contents = fs.readFileSync(dir_file,'base64');
  		//console.log(contents)
    	//res.send('File read!'); 
    	splitFile.splitFile(dir_file, 20)
			  .then((names) => {
			    console.log(names);

			    for(var i = 0; i <= names.length; i++){
			    	var contents = fs.readFileSync(names[i],'base64');
			    	f_request(contents,names[i])			    
			    	}

			  })
			  .catch((err) => {
			    console.log('Error: ', err);
			  });

			

	});

		  	
res.send('File successful!'); 
});



		function f_splitFile (){
		}

		function f_request (cont,path_f){
			request.post({url:'http://192.168.0.25:1880/file', form:{file:cont, name_file:path_f}}, function(err,httpResponse,body){
								if (err) {
								return console.error('upload failed:', err);
								}
								console.log('Upload successful!  Server responded with:', body.name_file);
								}) 	
		}  
  
app.listen(3000);


