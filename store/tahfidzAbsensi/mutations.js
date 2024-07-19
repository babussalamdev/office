export default {
    setSantriAsrama(state, value) {
        if (value) {
            state.santri = value.resSantri
            state.permissions = value.resPermissions.split(',')
            if (value.select) {
                state.select = value.select
            }
        } else {
            state.select = value
            state.santri = []
            state.permissions = []
        }

    },
    updateAbsen(state, value) {
        const i = state.santri.findIndex((x) => x.SK === value.SK)
        const data = state.santri[i]
        data['StatusAsrama'] = value.StatusAsrama
        data['NoteAsrama'] = value.NoteAsrama
        data['WaktuAsrama'] = value.WaktuAsrama

        const updateData = state.santri.map((item, index) => {
            if (index === i) {
                return data
            }
            return item
        })

        state.santri = updateData
    },
    // setStatus(state, value) {
    //   state[value.name] = value.value
    // },
    setStatusHalaqah(state, value) {
      const i = state.santri.findIndex((x) => x.sk === value.SK)
      const obj = {
        santri: state.santri[i],
        type: value.type
      }
      state.updateData = obj
      $("#modalAbsen").modal("show");
    },
}
