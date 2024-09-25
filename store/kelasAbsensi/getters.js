export default {
  getSelectedMapel(state) {
    return state.selectedMapel
  },
  getSelectedJam(state) {
    return state.selectedJam
  },
  getSantri(state) {
    return state.santri
  },
  getDate(state) {
    return state.dateNow
  }
  // getPagi(state) {
  //   return state.pagi
  // },
  // getSore(state) {
  //   return state.sore
  // }
    // getKaldik(state) {
    //     const kaldik = state.kaldik.map(({ Nama, Mulai, Berakhir, Warna }) => (
    //         {
    //             title: Nama,
    //             start: Mulai,
    //             end: Berakhir,
    //             backgroundColor: Warna,
    //             borderColor: Warna
    //         }
    //     ))
    //     return kaldik
    // }
}
