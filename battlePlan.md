Uhh alright, so looks like we'll have to implement a solution for the typing thing.

Looks like the easiest way to go about this would be to have some kind of message send to the box that lets people know when someone else is typing. Not a great implementation but it'll work.

For that, I'll add another import and template so that when the chat box is focused, it'll fire an event that will make the sever send out the typing box and inject it into the conversation. Maybe there can be a box below it for typing users. Not sure yet.