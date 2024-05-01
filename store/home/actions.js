export default {
    async setMainChart({ commit }, data) {
        const result = await this.$axios.$get(
            `get-dashboard?program=${data}`
        );
        commit('setChart', result);
    },

}