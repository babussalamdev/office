<template>
  <div>
    <!-- input database santri -->
    <div class="modal fade" id="InputDataSantri" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputSantri" id="inputSantri">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Data Santri
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input name="Username" type="text" class="form-control" id="username" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <input type="text" name="Password" id="password" v-model="password" class="form-control" required
                    disabled />
                  <span>
                    <button v-if="btn" class="btn btn-success" type="button" id="inputGroupFileAddon04"
                      @click="generatePassword">
                      Generate
                    </button>
                    <button v-else class="btn btn-success btn-sm" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span class="visually-hidden" role="status">Loading...</span>
                    </button>
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label for="nis" class="form-label">NIS</label>
                <input name="Nis" type="text" class="form-control" id="nis" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Santri</label>
                <input name="Nama" type="text" class="form-control" id="nama" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Angkatan</label>
                <select name="Angkatan" class="form-select" aria-label="Default select example" required>
                  <option selected>-- Pilih angkatan --</option>
                  <option v-for="(data, i) in years" :key="i" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="Orangtua" class="form-label">Orang Tua</label>
                <input name="Orangtua" type="text" class="form-control" id="Orangtua" required />
              </div>
              <div class="mb-3">
                <label for="Alamat" class="form-label">Alamat</label>
                <input name="Alamat" type="text" class="form-control" id="alamat" required />
              </div>
              <div class="mb-3">
                <label for="nisn" class="form-label">NISN</label>
                <input name="Nisn" type="text" class="form-control" id="nisn" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  simpan
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- update database santri -->
    <div class="modal fade" id="updateDataSantri" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateSantri" id="updateSantri">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Data Santri
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="nis" class="form-label">NIS</label>
                <input name="Nis" type="text" class="form-control" id="nis" :value="updateData?.Nis" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Santri</label>
                <input name="Nama" type="text" class="form-control" id="nama" :value="updateData?.Nama" required />
              </div>
              <div class="mb-3">
                <label for="Orangtua" class="form-label">Orang Tua</label>
                <input name="Orangtua" type="text" class="form-control" id="ortu" :value="updateData?.Orangtua"
                  required />
              </div>
              <div class="mb-3">
                <label for="Alamat" class="form-label">Alamat</label>
                <input name="Alamat" type="text" class="form-control" id="alamat" :value="updateData?.Alamat" required />
              </div>
              <div class="mb-3">
                <label for="nisn" class="form-label">NISN</label>
                <input name="Nisn" type="text" class="form-control" id="nisn" :value="updateData?.Nisn" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  simpan
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- delete database santri -->
    <div class="modal fade" id="deleteDataSantri" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="deleteSantri" id="deleteSantri">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Non Aktifkan Santri
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <select class="form-select" aria-label="Default select example" name="status" required>
                  <option value="" selected disabled>-- Pilih Alasan --</option>
                  <option value="keluar">Keluar</option>
                  <option value="pindah">Pindah</option>
                </select>
              </div>
              <div class="mb-3">
                <div class="form-floating">
                  <textarea name="alasan" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style="height: 100px" required></textarea>
                  <label for="floatingTextarea2">Beri Catatan</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  simpan
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('santri/database', ['btn', 'years', 'password', 'updateData', 'deleteData'])
  },
  methods: {
    ...mapActions('santri/database', ['inputSantri', 'updateSantri', 'deleteSantri']),
    ...mapMutations('santri/database', ['generatePassword']),
  },
};
</script>

<style scoped></style>
