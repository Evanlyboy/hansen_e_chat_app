// imports go at the top
import ChatMsg from './components/ChatMessage.js';

var socket = io();

function setUserID({ sID }){
  vm.socketID = sID;
}

// utility functions for socket
function addNewMessage(message) {
  
    vm.messages.push(message);
}

function handleTypingEvent(user){
  console.log('someone is typing...');
}

const { createApp } = Vue

const vm = createApp({
  data() {
    return {
      socketID: '',
      message: '',
      messages: [],
      username: ''
    }
  },

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



  components: {
    newmsg: ChatMsg
  }


}).mount('#app')

socket.addEventListener('connected', setUserID);
socket.addEventListener('new_message', addNewMessage);
socket.addEventListener('typing', handleTypingEvent);
