import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state }) {
    const program = localStorage.getItem('program')
    const data = await this.$apiBase.$get(`get-settings?type=quran&program=${program}`)
    commit('setKelas', data)
  },
  async submit({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['Program'] = localStorage.getItem('program')
    const kelas = data.Kelas
    const semester = data.Semester
    delete data.Kelas
    delete data.Semester
    try {
      const result = await this.$apiBase.$post(`input-settings?type=quran&kls=${kelas}&smstr=${semester}`, data)
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('inputQuran', result);
      }
    } catch (error) {

    }
  },
  async deleteItem({ commit, state }, key) {
    const i = state.quran.findIndex((x) => x.SK === key)
    const result = await Swal.fire({
      title: `${key.split('#')[1]} semester ${key.split('#')[2]}`,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const sk = key.replace(/#/g, "%23");
      const program = localStorage.getItem("program");
      const result = await this.$axios.$delete(
        `delete-settings?sk=${sk}&type=quran`
      );
      commit('deleteQuran', key);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  },

  // penilaian
  async inputDataPenilaian({ commit, state }, event) {
    // commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const sk = state.updateDataPenilaian.SK.replace(/#/g, '%23')
    const i = state.quran.findIndex((x) => x.SK === state.updateDataPenilaian.SK)
    const dataPenilaian = `${data.nama.trim()}-${data.bobot.trim()}`
    commit('updatePenilaian', { dataPenilaian, i })
    const array = state.penilaian[i]

    // Mengubah array menjadi objek dengan properti sesuai nama dan bobot
    const transformedObject = array.reduce((acc, item) => {
      const [nama, bobot] = item.split('-'); // Memisahkan nama dan bobot berdasarkan tanda '-'
      acc[nama] = parseInt(bobot); // Menambahkan properti ke objek dengan nama sebagai kunci dan bobot sebagai nilai
      return acc;
    }, {});
    data['Penilaian'] = transformedObject;
    data['Nama'] = `${state.updateDataPenilaian.SK.split('#')[1]}${state.updateDataPenilaian.SK.split('#')[2]}`
    delete data.bobot
    delete data.nama
    try {
      const result = await this.$apiBase.$put(`update-settings?sk=${sk}&type=quran`, data)
      commit('updateScore')
      // commit('btn')
    } catch (error) {
      // commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  async delScore({ commit, state }, datas) {
    const i = state.quran.findIndex((x) => x.SK === datas.sk)
    commit('deletePenilaian', { indexMapel: i, indexPenilaian: datas.index })
    const array = state.penilaian[i]
    // Mengubah array menjadi objek dengan properti sesuai nama dan bobot
    const transformedObject = array.reduce((acc, item) => {
      const [nama, bobot] = item.split('-'); // Memisahkan nama dan bobot berdasarkan tanda '-'
      acc[nama] = parseInt(bobot); // Menambahkan properti ke objek dengan nama sebagai kunci dan bobot sebagai nilai
      return acc;
    }, {});

    const data = {}
    data['Penilaian'] = transformedObject
    data['Nama'] = `${datas.sk.split('#')[1]}${datas.sk.split('#')[2]}`
    try {
      const sk = datas.sk.replace(/#/g, '%23')
      const result = await this.$apiBase.$put(`update-settings?sk=${sk}&type=quran`, data)
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
