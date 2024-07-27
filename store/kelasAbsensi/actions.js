import Swal from "sweetalert2"

export default {
  async changeUnit({ commit }, data) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const asrama = this.$auth.user.Asrama[program]
    const halaqah = this.$auth.user.Halaqah[program]
    const kelas = this.$auth.user.Kelas[program]

    let subject = ''
    if (jabatan === 'musyrif') {
      subject = 'asrama'
    } else {
      subject = 'kelas'
    }

    // const result = await this.$apiSantri.$get(
    //   `get-absensi?subject=${subject}&program=${program}&jabatan=${jabatan}&asrama=${asrama}&halaqah=${halaqah}&kelas=${kelas}&absen=asrama`
    // );
    // const reqSantri = await this.$apiSantri.$get(
    //   `get-absensi-sisalam?subject=kelas&program=${program}&value=${kelas}`
    // );
    // const reqPermissions = this.$apiBase.$get(
    //   `get-settings?sk=${program}&type=buttonAbsensi&value=${jabatan}`
    // )
    const resSelect = await this.$apiBase.$get(
      `get-settings?type=absensikelas`
    )
    // const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])

    // result['select'] = []

    commit('setSelect', resSelect);
  },
  async getDataSantri({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$apiSantri.$get(
      `get-absensi-sisalam?subject=kelas&program=${program}&value=${data}`
    );

    commit('setDataSantri', result);
  },
  setStatus({ commit, state }, data) {
    const waktu = data
    const sk = state[data].split(' ')[1]
    const type = state[data].split(' ')[0]
    const obj = {
      waktu: waktu,
      sk: sk,
      type: type
    }
    // console.log(data)
    console.log(obj)
  },
  async deleteStatus({ commit, state }, datas) {
    const i = state.santri.findIndex((x) => x.SK === datas.sk)
    const data = state.santri[i]
    const time = datas.time
    let sk = ''
    if (time === 'mapelSatu') {
      sk = data.Logs.mapelSatuTime
    } else if (time === 'mapelDua') {
      sk = data.Logs.mapelDuaTime
    } else {
      sk = data.Logs.mapelTigaTime
    }
    const skSantri = datas.sk.replace('#', '%23')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const program = localStorage.getItem("program");
    const req = await this.$apiSantri.$delete(
      `delete-absensi-sisalam?sksantri=${skSantri}&type=${time}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${sk}`
    );
    req['time'] = time
    req["SK"] = datas.sk;
    commit('deleteAbsen', req);
    // const result = await Swal.fire({
    //   title: datas.type + '-' + data.Nama.replace(/\b\w/g, (char) => char.toUpperCase()),
    //   text: `Subject akan dihapus`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: `Ya, Hapus!`,
    // });
    // if (result.isConfirmed) {
    //   const req = await this.$apiSantri.$delete(
    //     `delete-absensi-sisalam?sksantri=${skSantri}&type=halaqah${time}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${sk}`
    //   );
    //   if (req) {
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       text: `Data Berhasil dihapus`,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     req['time'] = time
    //     req["SK"] = datas.sk;
    //     commit('deleteAbsen', req);
    //     // const response = {
    //     //   key,
    //     //   Status: status === "active" ? "inactive" : "active",
    //     // };
    //     // commit("updateSubject", response);
    //   }
    // }
  },
}
