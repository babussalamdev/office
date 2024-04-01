<div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalPegawai
          :updateData="updateData"
          @deleteUpdateData="deleteUpdateData"
        />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">Lulusan</th>
              <th scope="col">Jabatan</th>
              <th scope="col">Pengajar</th>
              <th scope="col">Pengampu</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in walas" :key="index">
              <td class="align-middle">
                <input type="checkbox" />
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Username }}
              </td>
              <td class="text-capitalize align-middle">{{ data.Lulusan }}</td>
              <td class="text-capitalize align-middle">
                {{ data.Jabatan[unit] }}
              </td>
              <td class="text-capitalize align-middle">
                <div class="form-switch">
                  <input
                    :checked="data.Pengajar[unit] === 'on' ? true : false"
                    @change="
                      statusPengajar(
                        data.Username,
                        data.SK,
                        data.Pengajar[unit]
                      )
                    "
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </td>
              <td class="text-capitalize align-middle">
                <div class="form-switch">
                  <input
                    :checked="data.Pengampu[unit] === 'on' ? true : false"
                    @change="
                      statusPengampu(
                        data.Username,
                        data.SK,
                        data.Pengampu[unit]
                      )
                    "
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </td>
              <td class="text-end align-middle">
                <div class="action">
                  <a href="javascript:;" @click="editItem(index)">
                    <i class="bx bx-pencil text-success"></i>
                  </a>
                  <a
                    href="javascript:;"
                    @click="updateItem(data.Username, data.SK, data.Status)"
                    ><button
                      class="btn btn-sm ms-2"
                      :class="
                        data.Status === 'active'
                          ? 'btn-primary'
                          : 'btn-secondary'
                      "
                    >
                      <i class="material-icons"> power_settings_new </i>
                    </button></a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('pegawai/walas', ['walas'])
    }
  }
</script>