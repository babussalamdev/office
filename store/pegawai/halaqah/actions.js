export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=halaqah&position=Pengampu`)
        commit('setMusyrif', result)
        // if (data === 'admin') {
        //     const result = await this.$axios.$get(
        //         `get-pegawai`
        //     );
        //     commit('setDatabaseAll', result);
        // } else {
        //     const result = await this.$axios.$get(
        //         `get-pegawai?program=${data}`
        //     );
        //     commit('setDatabase', result);

        // }
    },
}
