// Nothing to touch here
export default {
    name: 'TheChatMessageComponent',

    props: ['msg'],

    data() {
        return {
            matchedID: this.$parent.socketID == this.msg.id
        }
    },

    template: `
    <article class="chat-messages" :class="{ 'other-messages' : matchedID}"> 
        <h1>{{ msg.message.name }}</h1>
        <p>{{ msg.message.content }}</p>
    </article>
    `
}