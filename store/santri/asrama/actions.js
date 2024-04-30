export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=options&program=${data}&category=kelas`
        );
        commit('setSelectKelas', result);
    },
    async loadAsrama({ commit }, data) {
        const result = await this.$axios.$get(
            `get-santri?subject=kelas&program=${data.program}&opsi=asrama&filter=${data.kelas}`
        );
        commit('setSantri', result);
    },

}
