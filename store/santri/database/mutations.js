import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
export default {
  setDatabase(state, value) {
    state.santri = []
    state.selectBy = 'angkatan'
    state.angkatan = ''
    state.years = value.years
    state.listKelas = value.kelas
  },
  setSantri(state, value) {
    state.santri = value
  },
  inputSantriBulk(state, value) {
    state.santri = [...state.santri, ...value];
    state.santri.sort((a, b) => {
      return a.Nama - b.Nama;
    });
  },
  inputSantriSingle(state, value) {
    state.santri.push(value.lowercaseData)
    state.santri.sort((a, b) => {
      return a.Nama - b.Nama;
    });

    state.password = "";
    $("#inputSantri")[0].reset();
    $("#InputDataSantri").modal("hide");

  },
  editItem(state, value) {
    const index = state.santri.findIndex((x) => x.SK === value)
    $("#updateDataSantri").modal("show");
    state.updateData = state.santri[index];
  },

  updateSantri(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)

    const data = state.santri[i]
    data.Nama = value.Nama;
    data.Nisn = value.Nisn;
    data.Orangtua = value.Orangtua;
    data.Alamat = value.Alamat;

    $("#updateSantri")[0].reset();
    $("#updateDataSantri").modal("hide");
  },
  deleteItem(state, value) {
    const index = state.santri.findIndex((x) => x.SK === value )
    if (state.santri[index].Status !== "active") {
      Swal.fire({
        icon: "warning",
        text: "Data tidak bisa diubah",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      $("#deleteDataSantri").modal("show");
      state.deleteData = state.santri[index];
    }
  },
  deleteSantri(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value);
    state.santri.splice(i, 1);

    $("#deleteSantri")[0].reset();
    $("#deleteDataSantri").modal("hide");
  },
  generatePassword(state) {
    state.btn = false;
    state.password = uuidv4().substr(0, 6);
    state.btn = true;
  },
  setAngkatan(state, value) {
    state.angkatan = value
  },
  setSelectBy(state, value) {
    state.selectBy = value
  },
  setKelas(state, value) {
    state.kelas = value
  },
  resetTable(state, value) {
    state.santri = []
    state.angkatan = ''
    state.kelas = ''
  },
  setState(state, value) {
    state[value.key] = value.value
  },
  btn(state, value) {
    state.btn = state.btn ? false : true
  }
}
