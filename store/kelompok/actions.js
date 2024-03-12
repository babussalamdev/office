export default {
    async changeUnit({ commit }, data) {
        const { halaqah, asrama } = await this.$axios.$get(
            `get-database?subject=settingskelompok&program=${data}`
        );
        commit('setData', { halaqah, asrama });
        // get-database?kelas=settings&program=${data}
    },
}
