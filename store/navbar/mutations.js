export default {
    changeUnit(state, data) {
        state.unit = data
    },
    removeUnit(state, data) {
        state.unit = ''
    },
    viewProfile(state) {
        state.profile = !state.profile;
    },
    toggleNotification(state) {
        state.notif = !state.notif;
        state.notificationOpened = !state.notificationOpened;
        // Reset notification status when opened
        if (state.notificationOpened) {
            state.notifications = [];
        }
    },
    falseData(state, data) {
        state[data] = false
    },
}