export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=struktur&program=${data}`
        );
        commit('setStruktur', result);
    },

}
