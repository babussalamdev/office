export default {
    async showProfile({ commit }, data) {
        const result = await this.$axios.$get(
            `get-pegawai?subject=profile`
        );
        commit('setProfile', result[0]);
    },

}
