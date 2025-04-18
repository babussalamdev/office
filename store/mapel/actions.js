import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$apiBase.$get(
      `get-settings?sk=${data}&type=opsimapel`
    );
    commit('setMapel', result);
  },
  async getKelas({ commit }, data) {
    const result = await this.$apiBase.$get(
      `get-settings?sk=${data.program}%23${data.kelas}&type=mapel`
    )
    commit('setKelas', result)
  },

  // input
  async inputMapel({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    const hari = state.value.map((x) => x.name)
    data["Program"] = program
    data["Kelas"] = state.selectKelas;
    data["Hari"] = hari.join(', ');
    if (state.value.length === 0) {
      commit('btn')
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Hari tidak boleh kosong",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      try {
        const result = await this.$axios.$post(
          `input-settings?program=${program}&kls=${state.selectKelas}&type=mapel`,
          data
        );
        if (result.message === "Kelas terisi dengan mapel lain") {
          Swal.fire({
            position: "center",
            icon: "warning",
            text: result.message,
            showConfirmButton: false,
            timer: 1500,
          });
          commit('btn')
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil di input",
            showConfirmButton: false,
            timer: 1500,
          });
          commit('btn')
          commit('inputMapel', result);
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
    }
  },
  async editItem({ commit, state }, value) {
    const i = state.mapel.findIndex((x) => x.SK === value)
    commit('setState', { key: 'updateData', value: state.mapel[i] })

    const hari = state.updateData.Hari.split(', ');
    if (hari && hari.length > 0) {
      const mappedArray = hari.map((x) => {
        const option = state.options.find((option) => option.name === x);
        return { name: x, code: option ? option.code : null };
      });
      commit('setState', { key: 'value', value: mappedArray })
    }

    $("#updateDataMapel").modal("show");
  },

  async updateMapel({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const hari = state.value.map((x) => x.name);
    data["Hari"] = hari.join(', ')
    const key = state.updateData.SK.replace(/#/g, "%23");
    const program = localStorage.getItem('program')
    if (state.value.length === 0) {
      commit('btn')
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Hari tidak boleh kosong",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const hasNullCode = state.value.some(element => element.code === null);

      if (hasNullCode) {
        commit('btn')
        Swal.fire({
          position: "center",
          icon: "warning",
          text: "Hari anda salah",
          showConfirmButton: false,
          timer: 1500,
        });
        return
      }
      try {
        const result = await this.$axios.$put(
          `update-settings?sk=${key}&program=${program}&kls=${state.selectKelas}&type=mapel`, data)
        if (result.message === "Kelas terisi dengan mapel lain") {
          Swal.fire({
            position: "center",
            icon: "warning",
            text: result.message,
            showConfirmButton: false,
            timer: 1500,
          });
          commit('btn')
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil di input",
            showConfirmButton: false,
            timer: 1500,
          });
          data["SK"] = key;
          commit('btn')
          commit('updateMapel', data);
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
    }
  },
  async deleteItem({ commit, state }, key) {
    const i = state.mapel.findIndex((x) => x.SK === key)
    const name = state.mapel[i].Nama
    const result = await Swal.fire({
      title: name,
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
        `delete-settings?sk=${sk}&type=mapel`
      );
      commit('deleteMapel', key);
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
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const sk = state.updateDataPenilaian.SK.replace(/#/g, '%23')
    const i = state.mapel.findIndex((x) => x.SK === state.updateDataPenilaian.SK)

    const arrAmount = state.Penilaian[i].map(item => {
      // Pisahkan string pada '-'
      const parts = item.split('-');
      // Ambil bagian setelah '-' dan konversi ke angka
      return parseFloat(parts[1]) || 0;
    }).reduce((acc, curr) => acc + curr, 0);

    const bobotNumber = parseFloat(data.bobot)
    if (!isNaN(bobotNumber) && arrAmount + bobotNumber > 100) {
      Swal.fire({
        icon: "warning",
        text: 'Bobot Penilaian lebih dari 100',
        showConfirmButton: false,
        timer: 1500,
      });
      commit('btn')
      return
    }

    const dataPenilaian = `${data.nama.trim()}-${data.bobot.trim()}`
    commit('updatePenilaian', { dataPenilaian, i })
    const array = state.Penilaian[i]

    // Mengubah array menjadi objek dengan properti sesuai nama dan bobot
    const transformedObject = array.reduce((acc, item) => {
      const [nama, bobot] = item.split('-'); // Memisahkan nama dan bobot berdasarkan tanda '-'
      acc[nama] = parseInt(bobot); // Menambahkan properti ke objek dengan nama sebagai kunci dan bobot sebagai nilai
      return acc;
    }, {});
    data['Penilaian'] = transformedObject;
    data['Nama'] = state.updateDataPenilaian.Nama
    data['Hari'] = state.mapel[i].Hari
    delete data.bobot
    delete data.nama
    try {
      const program = localStorage.getItem('program')
      const result = await this.$apiBase.$put(`update-settings?sk=${sk}&program=${program}&kls=${state.selectKelas}&type=mapel`, data)
      commit('updateScore')
      commit('btn')
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
    const i = state.mapel.findIndex((x) => x.SK === datas.sk)
    commit('deletePenilaian', { indexMapel: i, indexPenilaian: datas.index })
    const array = state.Penilaian[i]
    // Mengubah array menjadi objek dengan properti sesuai nama dan bobot
    const transformedObject = array.reduce((acc, item) => {
      const [nama, bobot] = item.split('-'); // Memisahkan nama dan bobot berdasarkan tanda '-'
      acc[nama] = parseInt(bobot); // Menambahkan properti ke objek dengan nama sebagai kunci dan bobot sebagai nilai
      return acc;
    }, {});

    const data = {}
    data['Penilaian'] = transformedObject
    data['Nama'] = state.mapel[i].Nama
    data['Hari'] = state.mapel[i].Hari
    try {
      const sk = datas.sk.replace(/#/g, '%23')
      const result = await this.$apiBase.$put(`update-settings?sk=${sk}&type=mapel`, data)
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
