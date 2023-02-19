// imports go at the top
import ChatMsg from './components/ChatMessage.js';

// Initializing the server side thing and connecting it to client
// We're importing io so if socket "emits", it'll go to io
var socket = io();

function setUserID({ sID }){
  vm.socketID = sID;
}

// utility functions for socket
function addNewMessage(message) {
      vm.messages.push(message);
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
      username: ''
    }
  },

  // Ok, two methods that seem to interact with the client through socket.
  methods: {
        dispatchMessage() {
           console.log('send a message to the chat service');

           socket.emit('chat_message', { content: this.message, name: this.username || 'anonymous', id: this.socketID});

           this.message = '';
        },

        dispatchTypingEvent(){
          // send the typing notification to the server
          socket.emit('typing_event', {user: this.username || 'anonymous'});
      }
  },


  // One component
  components: {
    newmsg: ChatMsg
  }


}).mount('#app')

socket.addEventListener('connected', setUserID);
socket.addEventListener('new_message', addNewMessage);
socket.addEventListener('typing', handleTypingEvent);
