const express = require('express'); //import the express package
const app = express(); // create an express app
const http = require('http'); //import the node server package
const server = http.createServer(app); // use our app file with the server

//add in the socket.io server stuff
const { Server } = require("socket.io");
const io = new Server(server);

// ------------------ Up until this point is required components ------------------
// ! Listen on port 3000
const port = process.env.PORT || 3000;

app.use(express.static('public'));


// this is the route handler -> listen for incoming requests and send back a response
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// set up the server to listen for incoming connections at this port
server.listen(port, () => {
  console.log(`listening on ${port}`);
});


// socket.io script goes here
//this bit of code is the connection manager. monitors incoming connections and relays messages.

// You do not write this code. Harvested from the internet
io.on('connection', (socket) => {
  // Initial messages to make sure it's working
    console.log('chat user connected:');
    
    socket.emit('connected', { sID: socket.id, message: 'new connection' }); // It looks like socket is for server side shit, and IO is for client side shit

    //step 1 - recieve incoming messasges
    
    socket.on('chat_message', function(msg) { // "function" is irrational
      console.log(msg); // have a look at the message data


      // step 2
      // rebroadcast the current message to everyone connected to our chat service
      // it gets sent to all users, including the original message sender

      
      io.emit('new_message', { id: socket.id, message: msg }); // Ok so now here's the handoff from the server (socket) to the client (io)
    })

    // ------------------ CUSTOM EVENTS PART ------------------
    // catch incoming custom events (in this case the typing event sent from the client)

    // ! So if the server detects something called 'typing_event', then it will make io "emit" 'typing' (event name) and the user that prompted it
    socket.on('typing_event', function(user) {
      io.emit('typing', user);
    })

    //  listen for a typing event and broadcast to all
    //  So far this is the same as above with different words. Maybe 'user_typing' is somehow different.
    socket.on('user_typing', function(user) {
    console.log(user);
    // Client sends the emit of typing and passes a function through it? I'll have to see what "currentlyTyping" is
    io.emit('typing', { currentlytyping: user });
  });

  });
//LKvj79rNb1XY0SMMAAAB