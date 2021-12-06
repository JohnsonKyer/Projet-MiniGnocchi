var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

var base64str = base64_encode('iggy.png');


var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('image', base64str);

var config = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
        'Authorization': 'Client-ID 178ece219d86d47',
        ...data.getHeaders()
    },
    data : data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
