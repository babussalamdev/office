export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-settings?type=options&sk=${data}&category=kelas`
        );
        commit('setSelectKelas', result);
    },
    async loadEkskull({ commit }, data) {
        const result = await this.$axios.$get(
            `get-santri?subject=kelas&program=${data.program}&opsi=ekskull&filter=${data.kelas}`
        );
        commit('setSantri', result);
    },

}
