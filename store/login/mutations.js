export default {
    typePass(state) {
        state.type = state.type === "password" ? "text" : "password";
    },
    btn(state) {
        state.btnLoad = state.btnLoad ? false : true
    }
}