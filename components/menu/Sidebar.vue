<template>
  <div class="sidebar" :class="!isSidebar ? 'sidebar-open' : ''" ref="sidebar">
    <div class="sidebar-container scrollarea">
      <!-- Logo -->
      <div class="logo animate__animated animate__zoomIn">
        <img src="~/assets/img/logo-1.png" />
        <span>Sistem Ma'had</span>
      </div>
      <hr class="mb-3" />
      <!-- Menu -->
      <nav class="menu">
        <!-- Menu Utama -->
        <ul>
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
          <li>
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
          <!-- Absensi -->
          <li>
            <nuxt-link
              to="/absensi"
              class="text-decoration-none d-flex align-items-center gap-2"
            >
              <i class="material-icons animate__animated animate__fadeInRight">
                checklist
              </i>
              <span class="text animate__animated animate__fadeInRight"
                >Absensi</span
              >
            </nuxt-link>
          </li>
          <!-- Mutabaah -->
          <li>
            <div
              @click="mutabaah"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  menu_book
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Mutabaah</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listMutabaah" class="dropdown-list">
              <li>
                <nuxt-link
                  to="/mutabaah/rekap"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    summarize
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Rekap Hafalan</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Santri -->
          <li>
            <div
              @click="santri"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  account_box
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Santri</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listSantri" class="dropdown-list">
              <li>
                <nuxt-link
                  to="/santri/database"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    face
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Database Santri</span
                  >
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/santri/kelas"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    school
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Kelas</span
                  >
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/santri/asrama"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    bedtime
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Asrama</span
                  >
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/santri/halaqoh"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    book
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Halaqoh</span
                  >
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/santri/ekskull"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    sports_volleyball
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Ekskull</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>

          <!-- Pegawai -->
          <li>
            <div
              @click="pegawai"
              class="dropdown d-flex align-items-center justify-content-between gap-2"
            >
              <span class="d-flex align-items-center gap-2">
                <i
                  class="material-icons animate__animated animate__fadeInRight"
                >
                  accessibility
                </i>
                <span class="text animate__animated animate__fadeInRight"
                  >Pegawai</span
                >
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listPegawai" class="dropdown-list">
              <!-- database -->
              <li>
                <nuxt-link
                  to="/pegawai/database"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    input
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Pegawai</span
                  >
                </nuxt-link>
              </li>
              <!-- halaqoh -->
              <li>
                <nuxt-link
                  to="/pegawai/halaqoh"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    menu_book
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Halaqoh</span
                  >
                </nuxt-link>
              </li>
              <!-- wali kelas -->
              <li>
                <nuxt-link
                  to="/pegawai/walas"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    face
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Wali Kelas</span
                  >
                </nuxt-link>
              </li>
              <!-- musyrif -->
              <li>
                <nuxt-link
                  to="/pegawai/musyrif"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    face
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Musyrif</span
                  >
                </nuxt-link>
              </li>
              <!-- mapel -->
              <li>
                <nuxt-link
                  to="/pegawai/mapel"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    auto_stories
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Mapel</span
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
              <!-- Utama -->
              <li>
                <nuxt-link
                  to="/settings/periode"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    dns
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Periode</span
                  >
                </nuxt-link>
              </li>
              <!-- Kaldik -->
              <li>
                <nuxt-link
                  to="/settings/kaldik"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    edit_calendar
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Kaldik</span
                  >
                </nuxt-link>
              </li>
              <!-- Kelompok -->
              <li>
                <nuxt-link
                  to="/settings/kelompok"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    auto_stories
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Kelompok</span
                  >
                </nuxt-link>
              </li>
              <!-- Kelas -->
              <li>
                <nuxt-link
                  to="/settings/kelas"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    school
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Kelas</span
                  >
                </nuxt-link>
              </li>
              <!-- Mapel -->
              <li>
                <nuxt-link
                  to="/settings/mapel"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    sticky_note_2
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Mapel</span
                  >
                </nuxt-link>
              </li>
              <!-- Struktur -->
              <li>
                <nuxt-link
                  to="/settings/struktur"
                  class="text-decoration-none d-flex align-items-center gap-2"
                >
                  <i
                    class="material-icons animate__animated animate__fadeInRight"
                  >
                    timeline
                  </i>
                  <span class="text animate__animated animate__fadeInRight"
                    >Struktur</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </li>

          <!-- Help -->
          <li>
            <nuxt-link
              to="/help"
              class="text-decoration-none d-flex align-items-center gap-2"
            >
              <i class="material-icons animate__animated animate__fadeInRight">
                quiz
              </i>
              <span class="text animate__animated animate__fadeInRight"
                >Help</span
              >
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import "animate.css";

export default {
  props: ["isSidebar"],
  data() {
    return {
      activeMenu: null, // Menyimpan menu yang sedang aktif (untuk menampilkan sub-menu)
      listSantri: false,
      listPegawai: false,
      listSettings: false,
      listMutabaah: false,
    };
  },
  methods: {
    santri() {
      this.listSantri = !this.listSantri;
    },
    pegawai() {
      this.listPegawai = !this.listPegawai;
    },
    settings() {
      this.listSettings = !this.listSettings;
    },
    mutabaah() {
      this.listMutabaah = !this.listMutabaah;
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
