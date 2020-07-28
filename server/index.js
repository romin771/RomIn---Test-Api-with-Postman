const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json());
app.use(cors());


// Get all Friends, or search using query
app.get('/api/friends', mainCtrl.getFriendsList);
// Get one of the friends by ID
app.get('/api/friends/:id', mainCtrl.getFriendById);
// Update one ftiend's location by ID, send new location in body
app.put('/api/friends/:id', mainCtrl.updateLocation);
// Add a new friend, send info in body
app.post('/api/friends', mainCtrl.addFriend);
// Remove a friend by ID
app.delete('/api/friends/:id', mainCtrl.removeFriend)



const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))