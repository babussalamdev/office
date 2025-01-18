import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-default?type=gedung`)
      if (result) {
        commit('setState', { key: 'listGedung', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async getRuangan({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const type = state.selectedGedung
    try {
      const result = await this.$apiOB.$get(`get-default?value=${type}`)
      if (result) {
        commit('setState', { key: 'ruangan', value: result.ruang })
        commit('setState', { key: 'options', value: result.job })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async inputData({ commit, state, dispatch }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const job = state.value.map((x) => x.name);
    data["Job"] = job.join();
    const value = state.selectedGedung
    try {
      if (job.length > 0) {
        const result = await this.$apiOB.$post(`input-default?value=${value}`, data)
        if (result) {
          commit('setInput', result)
          commit('btn')
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        commit('btn')
        Swal.fire({
          icon: 'error',
          text: 'Job tidak boleh kosong!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async updateRuangan({ commit, state, dispatch }) {
    commit('btn')
    const data = {}
    const job = state.value.map((x) => x.name);
    data["Job"] = job.join();
    const value = state.selectedGedung
    const sk = state.updateData.SK
    try {
      if (job.length > 0) {
        const result = await this.$apiOB.$put(`update-default?value=${value}&sk=${sk}`, data)
        if (result) {
          result['SK'] = sk
          commit('updateRuangan', result)
          commit('btn')
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        commit('btn')
        Swal.fire({
          icon: 'error',
          text: 'Job tidak boleh kosong!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async deleteItem({ commit, state, dispatch }, sk) {
    const i = state.ruangan.findIndex((x) => x.SK === sk)
    const gedung = state.selectedGedung
    const result = await Swal.fire({
      title: state.ruangan[i].Name,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await this.$apiOB.$delete(
        `delete-default?type=${gedung}&sk=${sk}`
      );
      commit('deleteItem', sk);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async updateItem({ commit, state, dispatch }, { sk, status }) {
    dispatch('index/submitLoad', null, { root: true })
    const changeStatus = status === 'active' ? 'inactive' : 'active'
    const gedung = state.selectedGedung
    try {
      const result = await this.$apiOB.$put(`update-default?value=${gedung}&sk=${sk}`, { Status: changeStatus })
      if (result) {
        dispatch('index/submitLoad', null, { root: true })
        commit('updateItem', { sk, changeStatus })
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diupdate!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  },
  async downloadQr({ commit, state, dispatch }, event) {
    commit('btn')
    try {
      const data = state.selectedRooms
      const updatedData = data.map(item => ({
        ...item,
        gedung: state.selectedGedung
      }));
      const file = await this.$apiOB.$post(`input-default?value=qrcode`, updatedData)
      if (file) {
        commit('btn')
        downloadZip(file, `QRCode Ruangan`)
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
}

const downloadZip = (base64String, fileName = "file.zip") => {

  const base64ToBlob = (base64, type = 'application/zip') => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const blob = base64ToBlob(base64String);

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
