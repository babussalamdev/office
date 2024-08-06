<template>
  <div class="sidebar" :class="!isSidebar ? 'sidebar-open' : ''" ref="sidebar">
    <div class="sidebar-container scrollarea">
      <!-- Logo -->
      <div class="logo animate__animated animate__zoomIn">
        <a href="/">
          <img src="~/assets/img/logo-1.png" />
        </a>
        <span>Sisalam {{ version }}</span>
      </div>
      <!-- Menu -->
      <nav class="menu">
        <!-- Menu Utama -->
        <ul v-if="unit">
          <!-- Dashboard -->
          <li>
            <nuxt-link to="/" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                space_dashboard
              </i>
              <span class="text animate__animated animate__fadeInRight">Dashboard</span>
            </nuxt-link>
          </li>

          <!-- Kaldik -->
          <li v-if="$auth.user.role !== 'root'">
            <nuxt-link to="/kaldik" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                calendar_month
              </i>
              <span class="text animate__animated animate__fadeInRight">Kaldik</span>
            </nuxt-link>
          </li>
          <!-- Kelas-->
          <li v-if="$auth.user.role !== 'root' && $auth.user.Pengajar[unit] !== 'off'">
            <div @click="notClick('listKelas')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  menu_book
                </i>
                <span class="text animate__animated animate__fadeInRight">Kelas</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listKelas" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link to="/kelas/absensi" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi</span>
                </nuxt-link>
              </li>
              <!-- jurnal -->
              <li>
                <nuxt-link to="/kelas/jurnal" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Jurnal</span>
                </nuxt-link>
              </li>
              <!-- nilai -->
              <li>
                <nuxt-link to="/kelas/nilai" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Penilaian</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Asrama -->
          <li v-if="$auth.user.role !== 'root' && permissions?.includes('page asrama')">
            <div @click="notClick('listAsrama')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  account_box
                </i>
                <span class="text animate__animated animate__fadeInRight">Asrama</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listAsrama" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link to="/asrama/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi</span>
                </nuxt-link>
              </li>
              <!-- waktu tidur -->
              <li>
                <nuxt-link to="/asrama/waktutidur"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Waktu Tidur</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Tahfidz -->
          <li v-if="$auth.user.role !== 'root' && $auth.user.Pengampu[unit] !== 'off'">
            <div @click="notClick('listTahfidz')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  accessibility
                </i>
                <span class="text animate__animated animate__fadeInRight">Tahfidz</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listTahfidz" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link to="/tahfidz/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi</span>
                </nuxt-link>
              </li>
              <!-- mutabaah -->
              <li>
                <nuxt-link to="/tahfidz/mutabaah"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Mutabaah</span>
                </nuxt-link>
              </li>
              <!-- nilai -->
              <li>
                <nuxt-link to="/tahfidz/nilai" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Nilai</span>
                </nuxt-link>
              </li>
              <!-- rekap -->
              <li>
                <nuxt-link to="/tahfidz/rekap" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Rekap</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Laundry -->
          <li v-if="$auth.user.role !== 'root' && permissions?.includes('laundry')">
            <div @click="notClick('listLaundry')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  accessibility
                </i>
                <span class="text animate__animated animate__fadeInRight">Laundry</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listLaundry" class="dropdown-list">
              <!-- nota -->
              <li>
                <nuxt-link to="/laundry/nota"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Nota</span>
                </nuxt-link>
              </li>
              <!-- input data -->
              <li>
                <nuxt-link to="/laundry/inputdata"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Input Data</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/laundry/datasantri"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Data Santri</span>
                </nuxt-link>
              </li>
              <!-- nilai -->
              <li>
                <nuxt-link to="/laundry/finance" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Finance</span>
                </nuxt-link>
              </li>
              <!-- rekap -->
              <li>
                <nuxt-link to="/laundry/lembur" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Lembur</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Pelanggaran -->
          <li v-if="$auth.user.role !== 'root' && permissions?.includes('page pelanggaran')">
            <nuxt-link to="/pelanggaran" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                privacy_tip
              </i>
              <span class="text animate__animated animate__fadeInRight">Pelanggaran</span>
            </nuxt-link>
          </li>
          <!-- Report -->
          <li v-if="$auth.user.role !== 'root'">
            <div @click="notClick('listReport')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  account_box
                </i>
                <span class="text animate__animated animate__fadeInRight">Report</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listReport" class="dropdown-list">
              <!-- mapel -->
              <li v-if="permissions?.includes('report mapel')">
                <nuxt-link to="/report/mapel" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Nilai Mapel</span>
                </nuxt-link>
              </li>
              <!-- mapel -->
              <li v-if="permissions?.includes('report mapel')">
                <nuxt-link to="/report/lagger" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Lagger Mapel</span>
                </nuxt-link>
              </li>
              <!-- tahfidz -->
              <li v-if="permissions?.includes('report tahfidz')">
                <nuxt-link to="/report/tahfidz"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Tahfidz</span>
                </nuxt-link>
              </li>
              <!-- tahfidz -->
              <li v-if="permissions?.includes('report ekskull')">
                <nuxt-link to="/report/ekskull"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Ekskull</span>
                </nuxt-link>
              </li>
              <!-- absensi -->
              <li v-if="permissions?.includes('report absensi')">
                <nuxt-link to="/report/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi Kelas</span>
                </nuxt-link>
              </li>
              <!-- pelanggaran -->
              <li v-if="permissions?.includes('report pelanggaran')">
                <nuxt-link to="/report/pelanggaran"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Pelanggaran</span>
                </nuxt-link>
              </li>
            </ul>
          </li>

          <!-- Settings -->
          <li>
            <div @click="notClick('listSettings')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  settings
                </i>
                <span class="text animate__animated animate__fadeInRight">Settings</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listSettings" class="dropdown-list">
              <!-- Absensi Menu -->
              <li v-if="$auth.user.role !== 'root' && permissions?.includes('setup absensi')">
                <nuxt-link to="/settings/absensi" class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi</span>
                </nuxt-link>
              </li>
              <li v-if="$auth.user.role !== 'root' && permissions?.includes('setup pelanggaran')">
                <nuxt-link to="/settings/pelanggaran"
                  class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Pelanggaran</span>
                </nuxt-link>
              </li>
              <!-- Santri Menu -->
              <li v-if="$auth.user.role !== 'root'">
                <div @click="notClickSub('santri')"
                  class="dropdown d-flex align-items-center justify-content-between gap-2">
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight">Santri</span>
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu santri -->
                <ul v-if="santriSubList" class="dropdown-list">
                  <!-- data -->
                  <li v-if="permissions?.includes('data santri')">
                    <nuxt-link to="/santri/database"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Data</span>
                    </nuxt-link>
                  </li>
                  <!-- kelas -->
                  <li v-if="permissions?.includes('kelas')">
                    <nuxt-link to="/santri/kelas" class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Kelas</span>
                    </nuxt-link>
                  </li>
                  <!-- asrama -->
                  <li v-if="permissions?.includes('asrama')">
                    <nuxt-link to="/santri/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Asrama</span>
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li v-if="permissions?.includes('halaqah')">
                    <nuxt-link to="/santri/halaqoh"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Halaqah</span>
                    </nuxt-link>
                  </li>
                  <!-- ekskull -->
                  <li v-if="permissions?.includes('ekskull')">
                    <nuxt-link to="/santri/ekskull"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Ekskull</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Pegawai Menu -->
              <li>
                <div @click="notClickSub('pegawai')"
                  class="dropdown d-flex align-items-center justify-content-between gap-2">
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight">Pegawai</span>
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu pegawai -->
                <ul v-if="pegawaiSubList" class="dropdown-list">
                  <!-- data -->
                  <li v-if="
                    personalia === 'on' || $auth.user.role === 'root'
                  ">
                    <nuxt-link to="/pegawai/database"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Data</span>
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li v-if="$auth.user.role !== 'root' && permissions?.includes('pengampu')">
                    <nuxt-link to="/pegawai/halaqoh"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Halaqah</span>
                    </nuxt-link>
                  </li>
                  <!-- wali kelas -->
                  <li v-if="$auth.user.role !== 'root' && permissions?.includes('wali kelas')">
                    <nuxt-link to="/pegawai/walas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Wali Kelas</span>
                    </nuxt-link>
                  </li>
                  <!-- musyrif -->
                  <li v-if="$auth.user.role !== 'root' && permissions?.includes('musyrif')">
                    <nuxt-link to="/pegawai/musyrif"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Musyrif</span>
                    </nuxt-link>
                  </li>
                  <!-- mapel -->
                  <li v-if="$auth.user.role !== 'root' && permissions?.includes('pengajar')">
                    <nuxt-link to="/pegawai/mapel"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Mapel</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Database Menu -->
              <li v-if="$auth.user.role !== 'root'">
                <div @click="notClickSub('database')"
                  class="dropdown d-flex align-items-center justify-content-between gap-2">
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight">Database</span>
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu pegawai -->
                <ul v-if="databaseSubList" class="dropdown-list">
                  <!-- Utama -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link to="/settings/periode"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Periode</span>
                    </nuxt-link>
                  </li>
                  <!-- Kaldik -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link to="/settings/kaldik"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Kaldik</span>
                    </nuxt-link>
                  </li>
                  <!-- Halaqah -->
                  <li v-if="permissions?.includes('setup halaqah')">
                    <nuxt-link to="/settings/halaqah"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Halaqah</span>
                    </nuxt-link>
                  </li>
                  <!-- Asrama -->
                  <li v-if="permissions?.includes('setup asrama')">
                    <nuxt-link to="/settings/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Asrama</span>
                    </nuxt-link>
                  </li>
                  <!-- Kelas -->
                  <li v-if="permissions?.includes('setup kelas')">
                    <nuxt-link to="/settings/kelas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Kelas</span>
                    </nuxt-link>
                  </li>
                  <!-- Mapel -->
                  <li v-if="permissions?.includes('setup mapel')">
                    <nuxt-link to="/settings/mapel"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Mapel</span>
                    </nuxt-link>
                  </li>
                  <!-- Struktur -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link to="/settings/struktur"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Struktur</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p v-else></p>
      </nav>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { mapState, mapMutations } from "vuex";

export default {
  // props: ["isSidebar"],
  data() {
    return {
      version: 0,
    }
  },
  created() {
    this.version = process.env.version;
  },
  computed: {
    ...mapState("index", ["unit", "permissions", "pengajar", "pengampu", "personalia",]),
    ...mapState("sidebar", ["activeMenu", "listAsrama", "listTahfidz", "listSettings", "listKelas", "listReport", 'listLaundry',
      "absensiSubList", "santriSubList", "pegawaiSubList", "databaseSubList", 'isSidebar']),
  },

  methods: {
    ...mapMutations("sidebar", ["notClick", "notClickSub"]),
    // Method untuk menampilkan/menyembunyikan sub-menu saat menu utama diklik
    isRouteActive(route) {
      const currentPath = this.$route.path;
      return currentPath === route;
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/sidebar.css);
</style>
