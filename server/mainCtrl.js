let friendsList = require("./mockData/MyFriends.json");
let nextId = 15;
module.exports = {
    getFriendsList(req, res) {
        const qObj = req.query;
        function findFriend( input, prop ) {
            const re = new RegExp(input.toLowerCase());
            return friendsList.filter( user => {
              return user[prop].toLowerCase().match(re)
            }) 
        }
        if (qObj.name) {
            const returnedValue = findFriend(qObj.name, 'friend');
            if (returnedValue.length === 0) {
                return res.status(404).send('No match found.')
            }
            return (res
                    .status(200)
                    .send(returnedValue))
          } else if (qObj.email) {
                const returnedValue = findFriend(qObj.email, 'email_address');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.phone) {
                const returnedValue = findFriend(qObj.phone, 'phone');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.location) {
                const returnedValue = friendsList.filter(friend => {
                    return friend.current_location === qObj.location.toUpperCase();
                })
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (Object.keys(qObj).length !== 0) {
            return res    
                    .status(400)
                    .send(`Improper query sent in request: ${Object.keys(qObj)[0]}=${qObj[Object.keys(qObj)[0]]}`)
          }
        res.status(200).send(friendsList);
    },
    getFriendById(req,res) {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send('Error with friend ID.')
        } else {
            let friend = friendsList.find(s => s.id === id)
            if (!friend) return res.status(404).send('friend not found');
            return res.status(200).send(friend);
        }
    },
    updateLocation(req,res) {
        let id = parseInt(req.params.id);
        let newLocation = req.body.current_location.toUpperCase();
        if (!newLocation) return res.status(400).send('Error with new friend Location sent.')
        let possibleLocation = ['IR','USA','TK','CA','KZ','MY']
        if (isNaN(id)) {
            res.status(400).send('Error with friend ID.')
        } else {
            if (possibleLocation.indexOf(newLocation) === -1) return res.status(400).send("Send valid Location. Possible Location: " + possibleLocation);
            let friend = friendsList.find(s => s.id === id);
            friend.current_location = newLocation;
            res.status(200).send(friend);
        }
    },
    addFriend(req,res) {
        let b = req.body;
        if (!b.friend || !b.email_address || !b.phone || !b.current_location) {
            return res.status(400).send('Missing information in body.')
        }
        nextId++;
        let newFriend = {
            id: nextId,
            friend: b.friend,
            email_address: b.email_address,
            phone: b.phone,
            current_location: b.current_location
        }
        friendsList.push(newFriend)
        return res.status(200).send(newFriend);
    },
    removeFriend(req,res) {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send('Error with friend ID.')
        } else {
            // We don't actually want to remove the friend, otherwise the test can only be run once
            // find the friend and return it to fake the functionality
            const friendToRemove = friendsList.find(
              friend => friend.id === id
            )
            if (!friendToRemove) {
                return res.status(404).send('No friend with that ID.')
            }
            res.status(200).send(friendToRemove)
        }
    }
}