var request = require('request');

var dir_file = 'C:/Users/Саша/Desktop/Princup/task Igora/send_file/form_for_file/file/new_model.h5';
request.post({url:'http://192.168.0.25:1880/file', form: {key:dir_file,name:"123"}}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }

  let names = body.key;
  console.log('Upload successful!  Server responded with:', names);
});