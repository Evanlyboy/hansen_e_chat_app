export default {
    name: 'TypingEvent',

    props: ['userTyping'],

    data() {
        return {
            // matchedID: this.$parent.socketID == this.userTyping.id
        }
    },

    template: `
    <div class="chatMessages" :class="{ 'other-messages' : matchedID}">
        <p>{{ userTyping.typingEventMessage.user }}</p>
    </div>
    `
}