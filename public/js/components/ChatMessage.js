// Nothing to touch here
// Wait actually, gonna copy this for the typing event component
export default {
    name: 'TheChatMessageComponent',

    props: ['msg'],

    data() {
        return {
            matchedID: this.$parent.socketID == this.msg.id
        }
    },

    template: `
    <article class="chat-messages one-item" :class="{ 'other-messages':matchedID}"> 
        <h1>{{ msg.message.username }}</h1>
        <p>{{ msg.message.content }}</p>
    </article>
    `
}