import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    commit('setBeforeRender')
    try {
      const result = await this.$apiLaundry.$get(`get-finance?subject=finance&startdate=${state.start}&enddate=${state.end}`)
      if (result) {
        const tahunMulai = 2023;
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
  },
  async getData({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    commit('changeFormat')
    try {
      const result = await this.$apiLaundry.$get(`get-finance?subject=finance&startdate=${state.start}&enddate=${state.end}`)
      if (result) {
        commit('setGetPage', result)
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
  },
  async addFinance({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    try {
      if (data.Transaction === 'credit') {
        const find = state.datas.inventory.find((x) => x.SK === data.Supplier)
        data['Supplier'] = find.Supplier
        data['InventorySK'] = find.SK
        data['Price'] = '-' + data.Price
        data['QTY'] = Number(data.QTY)
        const result = await this.$apiLaundry.$post(`input-finance?type=${data.Type}`, data)
        if ( result ) {
          commit('setAdd', result)
          commit('btn')
        }
      } else {
        data['Amount'] = Number(data.Amount)
        const result = await this.$apiLaundry.$post(`input-finance?type=${data.Type}`, data)
        if ( result ) {
          commit('setAdd', result)
          commit('btn')
        }
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async deleteItem({ commit, state }) {
    const data = state.updateData
    const result = await Swal.fire({
      title: 'Warning',
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      let result
      if (data.Type === 'inventory') {
        result = await this.$apiLaundry.$delete(
          `delete-finance?transaction=${data.PK}&sk=${data.SK}&type=${data.Type}&inventorySK=${data.InventorySK}`
        );
      } else {
        result = await this.$apiLaundry.$delete(
          `delete-finance?transaction=${data.PK}&sk=${data.SK}&type=${data.Type}`
        );
      }
      commit('deleteItem', result);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}

// const sekarang = new Date();
// const tanggal = sekarang.getDate().toString().padStart(2, '0');
// const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
// const tahun = sekarang.getFullYear();
// const date = `${tahun}-${bulan}-${tanggal}`;
// const tanggalSatu = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1);
// const tanggalSatuFormatted = `${tanggalSatu.getFullYear()}-${(tanggalSatu.getMonth() + 1).toString().padStart(2, '0')}-${tanggalSatu.getDate().toString().padStart(2, '0')}`;
