// imports go at the top
import ChatMsg from './components/ChatMessage.js';
// Importing the new component here
import TypeEvent from './components/TypingEvent.js';

// Gonna slap some date and time on here.
// Require won't fucking work for some reason so we're doing it this way. Goddamn Node.js is so difficult to work with
// import moment from '/node_modules/moment'; //gonna kms
//     moment().format();



// Initializing the server side thing and connecting it to client
// We're importing io so if socket "emits", it'll go to io
var socket = io();

function setUserID({ sID }){
  vm.socketID = sID;
}


// utility functions for socket
function addNewMessage(message) {
      vm.messages.push(message); //idk what this does
      // vm.time.push(moment.calendar());
}

// This is the important event
function handleTypingEvent(user){
  console.log('someone is typing...');
}

// ------------------ Create Vue Instance Here ------------------
const { createApp } = Vue

const vm = createApp({
  data() {
    return { // variables as you know
      socketID: '',
      message: '',
      messages: [],
      username: '',
      typingEventMessage: 'is typing',
      time: ''
    }
  },

  // Ok, two methods that seem to interact with the client through socket.
  methods: {
        dispatchMessage() {
           console.log('send a message to the chat service');

           socket.emit('chat_message', {content: this.message, time: this.time, username: this.username || 'Anonymous', id: this.socketID}); //this comes from the template in ChatMessage.js

           this.message = '';
        },

        dispatchTypingEvent(){
          // send the typing notification to the server
          socket.emit('typing_event', {user: this.username || 'Anonymous'});
          socket.emit('chat_message', {content: this.typingEventMessage, username: this.username || 'Anonymous', id: this.socketID}); // Ok so if we copy the above and paste it here with some changes, it also works
          // Ok cool, looks like this works
      }
  },


  // One component
  // Two components
  components: {
    newmsg: ChatMsg,
    typemsg: TypeEvent
  }


}).mount('#app')

socket.addEventListener('connected', setUserID);
socket.addEventListener('new_message', addNewMessage);
socket.addEventListener('typing', handleTypingEvent);
