<template>
  <div class="sidebar" :class="!isSidebar ? 'sidebar-open' : ''" ref="sidebar">
    <div class="sidebar-container scrollarea">
      <!-- Logo -->
      <div class="logo animate__animated animate__zoomIn">
        <a href="/">
          <img src="~/assets/img/logo-1.png" />
        </a>
        <span>Sistem Ma'had</span>
      </div>
      <hr class="mb-3" />
      <!-- Menu -->
      <nav class="menu">
        <!-- Menu Utama -->
        <ul v-if="unit">
          <!-- Dashboard -->
          <li>
            <nuxt-link
              to="/"
              class="text-decoration-none d-flex align-items-center gap-2"
            >
              <i class="material-icons animate__animated animate__fadeInRight">
                space_dashboard
              </i>
              <span class="text animate__animated animate__fadeInRight"
                >Dashboard</span
              >
            </nuxt-link>
          </li>

          <!-- Kaldik -->
          <li v-if="$auth.user.role !== 'administrator'">
            <nuxt-link
              to="/kaldik"
              class="text-decoration-none d-flex align-items-center gap-2"
            >
              <i class="material-icons animate__animated animate__fadeInRight">
                calendar_month
              </i>
              <span class="text animate__animated animate__fadeInRight"
                >Kaldik</span
              >
            </nuxt-link>
          </li>

          <!-- Kelas-->
          <li v-if="pengajar === 'on'">
            <div
              @click="kelas"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  menu_book
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Kelas</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listKelas" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link
                  to="/kelas/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Absensi</span
                  >
                </nuxt-link>
              </li>
              <!-- jurnal -->
              <li>
                <nuxt-link
                  to="/kelas/jurnal"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Jurnal</span
                  >
                </nuxt-link>
              </li>
              <!-- nilai -->
              <li>
                <nuxt-link
                  to="/kelas/nilai"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Nilai</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Asrama -->
          <li v-if="permissions.includes('asrama')">
            <div
              @click="asrama"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  account_box
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Asrama</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listAsrama" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link
                  to="/asrama/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Absensi</span
                  >
                </nuxt-link>
              </li>
              <!-- waktu tidur -->
              <li>
                <nuxt-link
                  to="/asrama/waktutidur"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Waktu Tidur</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Tahfidz -->
          <li v-if="pengampu === 'on'">
            <div
              @click="tahfidz"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  accessibility
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Tahfidz</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listTahfidz" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link
                  to="/tahfidz/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Absensi</span
                  >
                </nuxt-link>
              </li>
              <!-- mutabaah -->
              <li>
                <nuxt-link
                  to="/tahfidz/mutabaah"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Mutabaah</span
                  >
                </nuxt-link>
              </li>
              <!-- wali kelas -->
              <li>
                <nuxt-link
                  to="/tahfidz/nilai"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Nilai</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Report -->
          <li>
            <div
              @click="report"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  account_box
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Report</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listReport" class="dropdown-list">
              <!-- mapel -->
              <li v-if="permissions.includes('report mapel')">
                <nuxt-link
                  to="/report/mapel"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Nilai Mapel</span
                  >
                </nuxt-link>
              </li>
              <!-- tahfidz -->
              <li v-if="permissions.includes('report tahfidz')">
                <nuxt-link
                  to="/report/tahfidz"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Tahfidz</span
                  >
                </nuxt-link>
              </li>
              <!-- absensi -->
              <li>
                <nuxt-link
                  to="/report/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Absensi</span
                  >
                </nuxt-link>
              </li>
              <!-- pelanggaran -->
              <li v-if="permissions.includes('report pelanggaran')">
                <nuxt-link
                  to="/report/pelanggaran"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <span class="text animate__animated animate__fadeInRight"
                    >Pelanggaran</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>

          <!-- Settings -->
          <li>
            <div
              @click="settings"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  settings
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Settings</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listSettings" class="dropdown-list">
              <!-- Absensi Menu -->
              <li v-if="$auth.user.role !== 'administrator'">
                <div
                  @click="absensiSub"
                  class="dropdown d-flex align-items-center justify-content-between gap-2"
                >
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight"
                      >Absensi</span
                    >
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu absensi -->
                <ul v-if="absensiSubList" class="dropdown-list">
                  <!-- kelas -->
                  <li>
                    <nuxt-link
                      to="/settings/absensi/kelas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Kelas</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- asrama -->
                  <li>
                    <nuxt-link
                      to="/settings/absensi/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Asrama</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li>
                    <nuxt-link
                      to="/settings/absensi/halaqah"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Halaqah</span
                      >
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Santri Menu -->
              <li v-if="$auth.user.role !== 'administrator'">
                <div
                  @click="santriSub"
                  class="dropdown d-flex align-items-center justify-content-between gap-2"
                >
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight"
                      >Santri</span
                    >
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu santri -->
                <ul v-if="santriSubList" class="dropdown-list">
                  <!-- data -->
                  <li v-if="permissions.includes('data santri')">
                    <nuxt-link
                      to="/santri/database"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Data</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- kelas -->
                  <li v-if="permissions.includes('kelas')">
                    <nuxt-link
                      to="/santri/kelas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Kelas</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- asrama -->
                  <li v-if="permissions.includes('asrama')">
                    <nuxt-link
                      to="/santri/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Asrama</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li v-if="permissions.includes('halaqah')">
                    <nuxt-link
                      to="/santri/halaqoh"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Halaqah</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- ekskull -->
                  <li v-if="permissions.includes('ekskull')">
                    <nuxt-link
                      to="/santri/ekskull"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Ekskull</span
                      >
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Pegawai Menu -->
              <li>
                <div
                  @click="pegawaiSub"
                  class="dropdown d-flex align-items-center justify-content-between gap-2"
                >
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight"
                      >Pegawai</span
                    >
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu pegawai -->
                <ul v-if="pegawaiSubList" class="dropdown-list">
                  <!-- data -->
                  <li
                    v-if="
                      personalia === 'on' || $auth.user.role === 'administrator'
                    "
                  >
                    <nuxt-link
                      to="/pegawai/database"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Data</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li
                    v-if="
                      $auth.user.role !== 'administrator' &&
                      permissions.includes('pengampu')
                    "
                  >
                    <nuxt-link
                      to="/pegawai/halaqoh"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Halaqah</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- wali kelas -->
                  <li
                    v-if="
                      $auth.user.role !== 'administrator' &&
                      permissions.includes('wali kelas')
                    "
                  >
                    <nuxt-link
                      to="/pegawai/walas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Wali Kelas</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- musyrif -->
                  <li
                    v-if="
                      $auth.user.role !== 'administrator' &&
                      permissions.includes('musyrif')
                    "
                  >
                    <nuxt-link
                      to="/pegawai/musyrif"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Musyrif</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- mapel -->
                  <li
                    v-if="
                      $auth.user.role !== 'administrator' &&
                      permissions.includes('mata pelajaran')
                    "
                  >
                    <nuxt-link
                      to="/pegawai/mapel"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Mapel</span
                      >
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Database Menu -->
              <li v-if="$auth.user.role !== 'administrator'">
                <div
                  @click="databaseSub"
                  class="dropdown d-flex align-items-center justify-content-between gap-2"
                >
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight"
                      >Database</span
                    >
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu pegawai -->
                <ul v-if="databaseSubList" class="dropdown-list">
                  <!-- Utama -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link
                      to="/settings/periode"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Periode</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Kaldik -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link
                      to="/settings/kaldik"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Kaldik</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Halaqah -->
                  <li v-if="permissions.includes('setup halaqah')">
                    <nuxt-link
                      to="/settings/halaqah"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Halaqah</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Asrama -->
                  <li v-if="permissions.includes('setup asrama')">
                    <nuxt-link
                      to="/settings/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Asrama</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Kelas -->
                  <li v-if="permissions.includes('setup kelas')">
                    <nuxt-link
                      to="/settings/kelas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Kelas</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Mapel -->
                  <li v-if="permissions.includes('setup mapel')">
                    <nuxt-link
                      to="/settings/mapel"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Mapel</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Struktur -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link
                      to="/settings/struktur"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Struktur</span
                      >
                    </nuxt-link>
                  </li>
                  <!-- Setup Absen -->
                  <li v-if="personalia === 'on'">
                    <nuxt-link
                      to="/settings/setupabsensi"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2"
                    >
                      <span class="text animate__animated animate__fadeInRight"
                        >Absensi</span
                      >
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
import { mapState } from "vuex";

export default {
  props: ["isSidebar"],
  data() {
    return {
      activeMenu: null, // Menyimpan menu yang sedang aktif (untuk menampilkan sub-menu)
      listAsrama: false,
      listTahfidz: false,
      listSettings: false,
      listKelas: false,
      listReport: false,
      absensiSubList: false,
      santriSubList: false,
      pegawaiSubList: false,
      databaseSubList: false,
    };
  },

  computed: {
    ...mapState("index", [
      "unit",
      "permissions",
      "pengajar",
      "pengampu",
      "personalia",
    ]),
  },

  methods: {
    asrama() {
      this.listAsrama = !this.listAsrama;
    },
    tahfidz() {
      this.listTahfidz = !this.listTahfidz;
    },
    report() {
      this.listReport = !this.listReport;
    },
    settings() {
      this.listSettings = !this.listSettings;
    },
    kelas() {
      this.listKelas = !this.listKelas;
    },
    absensiSub() {
      this.absensiSubList = !this.absensiSubList;
      this.santriSubList = false;
      this.pegawaiSubList = false;
      this.databaseSubListSubList = false;
    },
    santriSub() {
      this.santriSubList = !this.santriSubList;
      this.pegawaiSubList = false;
      this.databaseSubListSubList = false;
      this.absensiSubList = false;
    },
    pegawaiSub() {
      this.pegawaiSubList = !this.pegawaiSubList;
      this.santriSubList = false;
      this.databaseSubList = false;
      this.absensiSubList = false;
    },
    databaseSub() {
      this.databaseSubList = !this.databaseSubList;
      this.santriSubList = false;
      this.pegawaiSubList = false;
      this.absensiSubList = false;
    },

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
