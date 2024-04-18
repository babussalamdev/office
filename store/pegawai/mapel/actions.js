export default {
    async showMapel({ commit }, data) {
        const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=mapel&position=pengajar`)
        commit('setMapel', result)
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
