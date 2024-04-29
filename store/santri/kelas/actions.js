export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-santri?subject=${data.angkatan}&program=${data.program}&opsi=kelas`
        );
        commit('setDatabase', result);
    },

}
