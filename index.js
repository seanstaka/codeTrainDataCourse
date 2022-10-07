//Import express
const { response } = require('express');
const express = require('express');

// Call the express function to execute functions int he library
const app = express();

// need to listen for anyone connecting to the server
app.listen(3000, () => console.log('listening to 3000'));

// server web page (index.html) use express to host static files
app.use(express.static('public'));

// protect to floating your server with data
app.use(express.json( {limit: '1mb'} ));

// NEW Creating a database
const dataStore = require('nedb');
const database = new dataStore('database.db');
database.loadDatabase();

// recieve data from the client and return the same data for now
app.post('/api', (request, response) => {
    console.log("I got a request");
    const request_data = request.body;
    const timestamp = Date.now();
    request_data.timestamp = timestamp;
    // response.json({
    //     status: 'success',
    //     latitude: request_data.latitude,
    //     longitude: request_data.longitude
    // })
    database.insert(request_data);
    response.json(request_data);
});

app.get('/api', (request, reponse) => {
    database.find({}, (err, data) => {
        if(err) {
            response.end();
            return;
        }
        response.json(data);
    });
});