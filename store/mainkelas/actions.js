export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=settingskelas&program=${data}`
        );
        commit('setData', result);
    },
}
