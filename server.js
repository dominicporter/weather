'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/weather',(req,res)=>{
    var http = require('http');
    var options = {
        host: "api.openweathermap.org",
        path: "/data/2.5/forecast?q=edinburgh,uk&appid=14b4fdb35f2b5da649c374baf80d5196&units=metric"
    };

    let callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.json(JSON.parse(str));
        });
    }

    http.request(options, callback).end();
});

app.use(express.static('build'));

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
