const express = require('express');

// express = lightweight
// routers -> organizing our endpoints
// middleware -> allows us to expand and customize

const db = require('./data/db.js');

const server = express();

const { hubs } = db;

// middleware

server.use(express.json());

// creating endpoints

// get = I want to make something available in case anyone needs it
server.get('/', (req, res) => {
    console.log('inside the get request')
    // if not Express
    // specify data type
    //set a status code
    // send a response
    res.send('<h2>Hello World</h2>')
});

// Read

server.get('/hubs', (req, res) => {
    // get the hubs from the db
    hubs.find()
        .then(allHubs => {
            res.send(allHubs);
        })
        .catch(({code, message}) => {
            res.status(code).json({err: message})
        })
    // then send them back

    // regular version of catch
    // .catch(err => {
    //     res.status(500).json(err);
    // })
});

// Create - add a new hub to the list

server.post('/hubs', (req, res) => {
    const newHub = req.body;
    hubs.add(newHub)
        .then(addedHub => {
            res.status(201).json(addedHub);
        })
        .catch(({code, message}) => {
            res.status(code).json({err: message})
        })
})

// Destroy - remove a hub

server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;
    hubs.remove(id)
        .then(removedHub => {
            res.json(removedHub.body);
        })
        .catch(({code, message}) => {
            res.status(code).json({err: message})
        })
})

// Update - alter a hub

server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    hubs.update(id, changes)
        .then(updatedHub => {
            if (updatedHub) {
                res.json(updatedHub)
            } else {
                res.status(404).json({err: 'incorrect id'})
            }
        })
        .catch(({code, message}) => {
            res.status(code).json({err: message})
        })
})

// Find - get one item



// request handler for /now that sends back the current date in string form

server.get('/now', (req, res) => {
    console.log('inside get request for now');
    res.send(Date())
})

// listening

server.listen(9090, () => {
    console.log('Listening on port 9090');
})
