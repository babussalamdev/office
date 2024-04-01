export default {
    setUnit(state, value) {
        state.unit = value?.program
        state.pengajar = value?.result.Pengajar
        state.pengampu = value?.result.Pengampu
        state.personalia = value?.result.Personalia
        state.permissions = value?.result.Permissions.split(',')
    },
    admin(state) {
        state.unit = 'admin'
        state.permissions = 'admin'
    },
    removeAll(state) {
        state.unit = ''
        state.permissions = ''
        state.pengajar = ''
        state.pengampu = ''
        state.personalia = ''
    }
}