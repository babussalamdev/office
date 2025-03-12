import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    if (data === 'root') {
      const result = await this.$axios.$get(
        `get-pegawai`
      );
      commit('setDatabaseAll', result);
      dispatch('index/submitLoad', null, { root: true })
    } else {
      const result = await this.$apiBase.$get(
        `get-pegawai?program=${data}&opsi=struktur`
      );
      commit('setDatabase', result);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async inputPegawai({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = state.value.map((x) => x.name);
    data["Program"] = program.join();
    try {
      const result = await this.$apiBase.$post(
        `input-pegawai?method=single`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('inputPegawaiSingle', result);
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  },
  async updatePegawaiAdmin({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = state.value.map((x) => x.name);
    data["Program"] = program.join();
    const jabatan = state.updateData.Jabatan
    const programs = ["sarpras", "perpus"];

    // perpus and sarpras
    programs.forEach((programType) => {
      if (program.includes(programType) && data.Personalia === "on") {
        const updatedJabatan = {
          ...jabatan,
          [programType]: "personalia"
        };
        data['Jabatan'] = updatedJabatan;
      } else {
        if (!program.includes(programType) && jabatan && jabatan.hasOwnProperty(programType)) {
          const updatedJabatan = { ...jabatan };
          delete updatedJabatan[programType];
          data['Jabatan'] = updatedJabatan;
        } else {
          const updatedJabatan = { ...jabatan };
          delete updatedJabatan[programType];
          data['Jabatan'] = updatedJabatan;
        }
      }
    });

    try {
      const username = state.updateData.Username;
      const sk = state.updateData.SK;
      const result = await this.$apiBase.$put(
        `update-pegawai?subject=root&username=${username}&sk=${sk}`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        data["SK"] = sk;
        commit('btn')
        commit('updatePegawai', data);
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
  async updatePegawai({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem("program");
    data["Program"] = program;
    try {
      const username = state.updateData.Username;
      const id = state.updateData.SK;
      const result = await this.$axios.$put(
        `update-pegawai?subject=Jabatan&username=${username}&sk=${id}`,
        data
      );
      commit('btn')
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil di input",
        showConfirmButton: false,
        timer: 1500,
      });
      result["SK"] = id;
      commit('updatePegawaiJabatan', result);
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
  async updateItem({ commit, state }, sk) {
    const i = state.pegawai.findIndex((x) => x.SK === sk)
    const status = state.pegawai[i].Status
    const user = state.pegawai[i].Username
    const key = state.pegawai[i].SK
    const name = state.pegawai[i].Nama
    const result = await Swal.fire({
      title: name,
      text: `Subject akan di ${status === "active" ? "Non-Aktif" : "Aktif"
        }kan`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Ya, ${status === "active" ? "Non-Aktifkan" : "Aktifkan"
        }`,
    });
    if (result.isConfirmed) {
      await this.$apiBase.$delete(
        `delete-pegawai?username=${user}&sk=${key}&status=${status}`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: `Data Berhasil di ${status === "active" ? "Non-Aktif" : "Aktif"
            }kan`,
          showConfirmButton: false,
          timer: 1500,
        });
        const response = {
          key,
          Status: status === "active" ? "inactive" : "active",
        };
        commit("updateSubject", response);
      }
    }
  },
  async setStatusPengajar({ commit, dispatch }, value) {
    dispatch('index/submitLoad', null, { root: true })
    const user = value.user
    const key = value.key
    const data = {
      Program: value.unit,
      Value: value.condition
    }
    try {
      const result = await this.$apiBase.$put(
        `update-pegawai?subject=Pengajar&username=${user}&sk=${key}`,
        data
      );
      if (result) {
        result['unit'] = value.unit
        result['index'] = value.key
        commit('setStatusPengajar', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      });
    }
  },
  async setStatusPengampu({ commit, dispatch }, value) {
    dispatch('index/submitLoad', null, { root: true })
    const user = value.user
    const key = value.key
    const data = {
      Program: value.unit,
      Value: value.condition
    }
    const result = await this.$apiBase.$put(
      `update-pegawai?subject=Pengampu&username=${user}&sk=${key}`,
      data
    );
    if (result) {
      result['unit'] = value.unit
      result['index'] = value.key
      commit('setStatusPengampu', result)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async setStatusPersonalia({ commit }, value) {
    const user = value.user
    const key = value.key
    const data = {
      Program: value.unit,
      Value: value.condition
    }
    // console.log(data)
    // const result = await this.$axios.$put(
    //     `update-pegawai?subject=Personalia&username=${user}&id=${key}`,
    //     data
    // );
    result['unit'] = value.unit
    result['index'] = value.key
    commit('setStatusPengampu', result)
  },
  async resetPassword({ commit, state }, data) {
    const i = state.pegawai.findIndex((x) => x.SK === data)
    const nama = state.pegawai[i].Nama
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: `Anda akan mereset password akun ${nama}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, reset sekarang!'
      });

      if (result.isConfirmed) {
        const username = state.pegawai[i].Username
        const result = await this.$apiBase.$put(`change-password?username=${username}`)
        if (result) {
          await Swal.fire({
            title: 'Reset Berhasil!',
            text: `Kata sandi baru adalah: ${result.password}`,
            icon: 'success'
          });
        }
      } else {
        await Swal.fire({
          title: 'Dibatalkan',
          text: 'Reset kata sandi Anda dibatalkan.',
          icon: 'error'
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Terjadi kesalahan saat mereset kata sandi.',
        icon: 'error'
      });
      console.error('Error mereset kata sandi:', error);
    }

  }
}

const encryptData = (data) => {
  return data.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');
}
