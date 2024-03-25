export default {
    async changeUnit({ commit }, data) {
        if (data === 'all') {
            const result = await this.$axios.$get(
                `get-pegawai`
            );
            commit('setDatabase', result);
        } else {
            const result = await this.$axios.$get(
                `get-pegawai?program=${data}`
            );
            commit('setDatabase', result);

        }
    },

}
