export default {
    async showWalas({ commit }, data) {
        const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=kelas&position=wali kelas`)
        commit('setWalas', result)
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
