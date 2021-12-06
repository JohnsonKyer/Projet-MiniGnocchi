var fs = require('fs');
var axios = require('axios');
var FormData = require('form-data');
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// var base64str = base64_encode('cyanbig.png');
// console.log(base64str)

function uploadImage(file){
    return new Promise((resolve, reject) => {
    var data = new FormData();
    data.append('image', file);
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
            const image = {
                link: response.data.data.link
            }
            console.log(response.data.data.link);
            resolve(image)
        })
        .catch(function (error) {
            console.log(error);
            reject(error)
        });
    });
}

module.exports = {uploadImage}
