const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, '0');
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;
const tanggalSatu = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1);
const tanggalSatuFormatted = `${tanggalSatu.getFullYear()}-${(tanggalSatu.getMonth() + 1).toString().padStart(2, '0')}-${tanggalSatu.getDate().toString().padStart(2, '0')}`;

import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    commit('setState', { key: 'start', value: tanggalSatuFormatted })
    commit('setState', { key: 'end', value: date })
    try {
      const result = await this.$apiLaundry.$get(`get-finance?subject=finance&startdate=${state.start}&enddate=${state.end}`)
      if (result) {
        const tahunMulai = 2018;
        const tahunSekarang = new Date().getFullYear();
        const years = Array.from(
          { length: tahunSekarang - tahunMulai + 2 },
          (_, index) => tahunMulai + index
        );
        commit('setPage', { result, years: years })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
