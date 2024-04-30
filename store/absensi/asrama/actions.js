export default {
    async changeUnit({ commit }, data) {
        const program = localStorage.getItem('program')
        const jabatan = this.$auth.user.Jabatan[program]
        const asrama = this.$auth.user.Asrama[program]
        const halaqah = this.$auth.user.Halaqah[program]
        const kelas = this.$auth.user.Kelas[program]
        const result = await this.$axios.$get(
            `get-santri?subject=none&program=${program}&jabatan=${jabatan}&asrama=${asrama}&halaqah=${halaqah}&kelas=${kelas}`
        );
        console.log(result)
        commit('setSantriAsrama', result);
    },

}
