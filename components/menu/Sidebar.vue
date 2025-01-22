<template>
  <div class="sidebar" :class="!isSidebarOpen ? 'sidebar-open' : ''" ref="sidebar">
    <div class="sidebar-container scrollarea">
      <!-- Logo -->
      <div class="logo animate__animated animate__zoomIn">
        <a v-if="hasPermission('laundry')" href="/">
          <img src="~/assets/img/logo-2.png" />
        </a>
        <a v-else href="/">
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
          <li v-if="hasRoot">
            <nuxt-link to="/kaldik" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                calendar_month
              </i>
              <span class="text animate__animated animate__fadeInRight">Kaldik</span>
            </nuxt-link>
          </li>
          <!-- Laporan -->
          <li v-if="hasRoot">
            <div @click="notClick('listLaporan')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-symbols-outlined animate__animated animate__fadeInRight">
                  lab_profile
                </i>
                <span class="text animate__animated animate__fadeInRight">Laporan</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listLaporan" class="dropdown-list">
              <!-- Scan -->
              <li>
                <nuxt-link to="/laporan/scan" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Scan</span>
                </nuxt-link>
              </li>
              <!-- Report Laporan -->
              <li>
                <nuxt-link to="/laporan/report" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Report</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Pengampu -->
          <li v-if="hasPermission('absensi pengampu')">
            <nuxt-link to="/pengampu" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                group
              </i>
              <span class="text animate__animated animate__fadeInRight">Pengampu</span>
            </nuxt-link>
          </li>
          <!-- Kelas-->
          <li v-if="hasRoot && $auth.user.Pengajar[unit] !== 'off'">
            <div @click="notClick('listKelas')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  school
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
              <li v-if="hasRoot">
                <div @click="notClickSub('kelas')"
                  class="dropdown d-flex align-items-center justify-content-between gap-2">
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight">Rekap</span>
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu santri -->
                <ul v-if="kelasSubList" class="dropdown-list">
                  <!-- Absensi -->
                  <li>
                    <nuxt-link to="/kelas/rekap/absensi"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Absensi</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!-- Ekskull -->
          <li v-if="hasRoot && hasPermission('page ekskull')">
            <div @click="notClick('listEkskull')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  fitness_center
                </i>
                <span class="text animate__animated animate__fadeInRight">Ekskull</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listEkskull" class="dropdown-list">
              <!-- absensi -->
              <li>
                <nuxt-link to="/ekskull/nilai" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Nilai</span>
                </nuxt-link>
              </li>
              <!-- waktu tidur -->
              <!-- <li>
                <nuxt-link to="/asrama/waktutidur"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Waktu Tidur</span>
                </nuxt-link>
              </li> -->
            </ul>
          </li>
          <!-- Asrama -->
          <li v-if="hasRoot && hasPermission('page asrama')">
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
              <li v-if="permissionsIzin.includes('izin')">
                <nuxt-link to="/asrama/antrian"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Antrian Izin</span>
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
          <li v-if="hasRoot && $auth.user.Pengampu[unit] !== 'off'">
            <div @click="notClick('listTahfidz')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  auto_stories
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
              <!-- form ujian -->
              <!-- <li>
                <nuxt-link to="/tahfidz/form" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Form Ujian</span>
                </nuxt-link>
              </li> -->
              <!-- rekap -->
              <li v-if="hasRoot">
                <div @click="notClickSub('tahfidz')"
                  class="dropdown d-flex align-items-center justify-content-between gap-2">
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight">Rekap</span>
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu santri -->
                <ul v-if="tahfidzSubList" class="dropdown-list">
                  <!-- Absensi -->
                  <li>
                    <nuxt-link to="/tahfidz/rekap/absensi"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Absensi</span>
                    </nuxt-link>
                  </li>
                  <!-- Absensi -->
                  <li>
                    <nuxt-link to="/tahfidz/rekap/hafalan"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Hafalan</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/tahfidz/rekap/tahsin"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Tahsin</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/tahfidz/rekap/murojaah"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Murojaah</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!-- Laundry -->
          <li v-if="hasRoot && hasPermission('laundry')">
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
              <!-- input data
              <li>
                <nuxt-link to="/laundry/inputdata"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Input Data</span>
                </nuxt-link>
              </li> -->
              <!-- input data -->
              <li>
                <nuxt-link to="/laundry/inventory"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Inventory</span>
                </nuxt-link>
              </li>
              <!-- nota -->
              <li>
                <nuxt-link to="/laundry/nota" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Nota</span>
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
                <nuxt-link to="/laundry/finance"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Finance</span>
                </nuxt-link>
              </li>
              <!-- rekap -->
              <!-- <li>
                <nuxt-link to="/laundry/lembur"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Lembur</span>
                </nuxt-link>
              </li> -->
              <!-- rekap -->
              <li>
                <nuxt-link to="/laundry/tagregister"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Tag Register</span>
                </nuxt-link>
              </li>
              <!-- rekap -->
              <li>
                <nuxt-link to="/laundry/channel"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Channel</span>
                </nuxt-link>
              </li>
              <!-- absensi laundry -->
              <li>
                <nuxt-link to="/laundry/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi</span>
                </nuxt-link>
              </li>
              <!-- rekap absensi laundry -->
              <li>
                <nuxt-link to="/laundry/absensi/rekap"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Rekap Absensi</span>
                </nuxt-link>
              </li>
              <!-- report log -->
              <li>
                <nuxt-link to="/laundry/report/log"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Report Log</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Pelanggaran -->
          <li v-if="hasRoot && hasPermission('page pelanggaran')">
            <nuxt-link to="/pelanggaran" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                privacy_tip
              </i>
              <span class="text animate__animated animate__fadeInRight">Pelanggaran</span>
            </nuxt-link>
          </li>
          <!-- Report -->
          <li
            v-if="hasRoot && ['report mapel', 'report ekskull', 'report absensi', 'report pelanggaran', 'report jurnal', 'report tahfidz'].some(name => hasPermission(name))">
            <div @click="notClick('listReport')"
              class="dropdown d-flex align-items-center justify-content-between gap-2">
              <span class="d-flex align-items-center gap-2">
                <i class="material-icons animate__animated animate__fadeInRight">
                  analytics
                </i>
                <span class="text animate__animated animate__fadeInRight">Report</span>
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul v-if="listReport" class="dropdown-list">
              <!-- mapel -->
              <li v-if="hasPermission('report mapel')">
                <nuxt-link to="/report/mapel" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Nilai Mapel</span>
                </nuxt-link>
              </li>
              <!-- mapel -->
              <li v-if="hasPermission('report mapel')">
                <nuxt-link to="/report/lagger" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Lagger Mapel</span>
                </nuxt-link>
              </li>
              <!-- ekskull -->
              <li v-if="hasPermission('report ekskull')">
                <nuxt-link to="/report/ekskull" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Ekskull</span>
                </nuxt-link>
              </li>
              <!-- report -->
              <li v-if="hasRoot && hasPermission('report tahfidz')">
                <div @click="notClickSub('tahfidz2')"
                  class="dropdown d-flex align-items-center justify-content-between gap-2">
                  <span class="d-flex align-items-center gap-2">
                    <span class="text animate__animated animate__fadeInRight">Report Tahfidz</span>
                  </span>
                  <i class="bx bx-chevron-down"></i>
                </div>
                <!-- sub menu santri -->
                <ul v-if="tahfidz2SubList" class="dropdown-list">
                  <!-- Absensi -->
                  <li>
                    <nuxt-link to="/report/tahfidz/absensi"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Absensi</span>
                    </nuxt-link>
                  </li>
                  <!-- Hafalan -->
                  <li>
                    <nuxt-link to="/report/tahfidz/hafalan"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Hafalan</span>
                    </nuxt-link>
                  </li>
                  <!-- Tahsin -->
                  <li>
                    <nuxt-link to="/report/tahfidz/tahsin"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Tahsin</span>
                    </nuxt-link>
                  </li>
                  <!-- Murojaah -->
                  <li>
                    <nuxt-link to="/report/tahfidz/murojaah"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Murojaah</span>
                    </nuxt-link>
                  </li>
                  <!-- Nilai -->
                  <li>
                    <nuxt-link to="/report/tahfidz/nilai"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Nilai</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- report pengampu -->
              <li v-if="hasPermission('report pengampu')">
                <nuxt-link to="/report/pengampu"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Report Pengampu</span>
                </nuxt-link>
              </li>
              <!-- tahfidz -->
              <!-- <li v-if="permissions?.includes('report ekskull')">
                <nuxt-link to="/report/ekskull"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Ekskull</span>
                </nuxt-link>
              </li> -->
              <!-- absensi -->
              <li v-if="hasPermission('report absensi')">
                <nuxt-link to="/report/absensi"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi Kelas</span>
                </nuxt-link>
              </li>
              <!-- pelanggaran -->
              <!-- <li v-if="hasPermission('report pelanggaran')">
                <nuxt-link to="/report/pelanggaran"
                  class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Pelanggaran</span>
                </nuxt-link>
              </li> -->
              <!-- Jurnal -->
              <li v-if="hasPermission('report jurnal')">
                <nuxt-link to="/report/jurnal" class="custom-link text-decoration-none d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Jurnal</span>
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
              <li v-if="hasRoot && hasPermission('setup absensi')">
                <nuxt-link to="/settings/absensi" class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Absensi</span>
                </nuxt-link>
              </li>
              <li v-if="hasRoot && hasPermission('setup pelanggaran')">
                <nuxt-link to="/settings/pelanggaran"
                  class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                  <span class="text animate__animated animate__fadeInRight">Pelanggaran</span>
                </nuxt-link>
              </li>
              <!-- Santri Menu -->
              <li
                v-if="hasRoot && ['data santri', 'kelas', 'asrama', 'halaqah', 'ekskull'].some(name => hasPermission(name))">
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
                  <li v-if="hasPermission('data santri')">
                    <nuxt-link to="/santri/database"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Data</span>
                    </nuxt-link>
                  </li>
                  <!-- qrcode -->
                  <li v-if="hasPermission('card')">
                    <nuxt-link to="/santri/qrcode"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Card</span>
                    </nuxt-link>
                  </li>
                  <!-- <li>
                    <nuxt-link to="/santri/card" class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Card</span>
                    </nuxt-link>
                  </li> -->
                  <!-- kelas -->
                  <li v-if="hasPermission('kelas')">
                    <nuxt-link to="/santri/kelas" class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Kelas</span>
                    </nuxt-link>
                  </li>
                  <!-- asrama -->
                  <li v-if="hasPermission('asrama')">
                    <nuxt-link to="/santri/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Asrama</span>
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li v-if="hasPermission('halaqah')">
                    <nuxt-link to="/santri/halaqoh"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Halaqah</span>
                    </nuxt-link>
                  </li>
                  <!-- ekskull -->
                  <li v-if="hasPermission('ekskull')">
                    <nuxt-link to="/santri/ekskull"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Ekskull</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Pegawai Menu -->
              <li
                v-if="['pengampu', 'wali kelas', 'musyrif', 'pengajar'].some(name => hasPermission(name)) || $auth.user.role === 'root' || hasPersonalia">
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
                    hasPersonalia || $auth.user.role === 'root'
                  ">
                    <nuxt-link to="/pegawai/database"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Data</span>
                    </nuxt-link>
                  </li>
                  <!-- halaqah -->
                  <li v-if="hasRoot && hasPermission('pengampu')">
                    <nuxt-link to="/pegawai/halaqoh"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Halaqah</span>
                    </nuxt-link>
                  </li>
                  <!-- wali kelas -->
                  <li v-if="hasRoot && hasPermission('wali kelas')">
                    <nuxt-link to="/pegawai/walas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Wali Kelas</span>
                    </nuxt-link>
                  </li>
                  <!-- musyrif -->
                  <li v-if="hasRoot && hasPermission('musyrif')">
                    <nuxt-link to="/pegawai/musyrif"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Musyrif</span>
                    </nuxt-link>
                  </li>
                  <!-- mapel -->
                  <li v-if="hasRoot && hasPermission('pengajar')">
                    <nuxt-link to="/pegawai/mapel"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Mapel</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- Database Menu -->
              <li
                v-if="hasRoot && ['setup halaqah', 'setup asrama', 'setup kelas', 'setup mapel', 'sarpras'].some(name => hasPermission(name)) || hasPersonalia">
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
                  <li v-if="hasPersonalia">
                    <nuxt-link to="/settings/periode"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Periode</span>
                    </nuxt-link>
                  </li>
                  <!-- Kaldik -->
                  <li v-if="hasPersonalia">
                    <nuxt-link to="/settings/kaldik"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Kaldik</span>
                    </nuxt-link>
                  </li>
                  <!-- Halaqah -->
                  <li v-if="hasPermission('setup halaqah')">
                    <nuxt-link to="/settings/halaqah"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Halaqah</span>
                    </nuxt-link>
                  </li>
                  <!-- Asrama -->
                  <li v-if="hasPermission('setup asrama')">
                    <nuxt-link to="/settings/asrama"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Asrama</span>
                    </nuxt-link>
                  </li>
                  <!-- Kelas -->
                  <li v-if="hasPermission('setup kelas')">
                    <nuxt-link to="/settings/kelas"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Kelas</span>
                    </nuxt-link>
                  </li>
                  <!-- Mapel -->
                  <li v-if="hasPermission('setup mapel')">
                    <nuxt-link to="/settings/mapel"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Mapel</span>
                    </nuxt-link>
                  </li>
                  <!-- Nilai Quran -->
                  <li v-if="hasPermission('setup nilai quran')">
                    <nuxt-link to="/settings/nilaiquran"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Nilai Quran</span>
                    </nuxt-link>
                  </li>
                  <!-- Struktur -->
                  <li v-if="hasPersonalia">
                    <nuxt-link to="/settings/struktur"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Struktur</span>
                    </nuxt-link>
                  </li>
                  <!-- Authority -->
                  <li v-if="hasPersonalia">
                    <nuxt-link to="/settings/authority"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Authority</span>
                    </nuxt-link>
                  </li>
                  <!-- Gedung -->
                  <li v-if="hasPermission('sarpras')">
                    <nuxt-link to="/settings/gedung"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Gedung</span>
                    </nuxt-link>
                  </li>
                  <!-- Ruangan OB -->
                  <li v-if="hasPermission('sarpras')">
                    <nuxt-link to="/settings/ruangan"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Ruangan</span>
                    </nuxt-link>
                  </li>
                  <!-- Job -->
                  <li v-if="hasPermission('sarpras')">
                    <nuxt-link to="/settings/job"
                      class="text-decoration-none sub-menu d-flex align-items-center gap-2">
                      <span class="text animate__animated animate__fadeInRight">Job</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!-- Settings PSB -->
          <!-- <li v-if="!hasRoot">
            <nuxt-link to="/setpsb" class="text-decoration-none d-flex align-items-center gap-2">
              <i class="material-icons animate__animated animate__fadeInRight">
                manage_accounts
              </i>
              <span class="text animate__animated animate__fadeInRight">Settings PSB</span>
            </nuxt-link>
          </li> -->
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
  // mounted () {
  //   document.addEventListener("click", event => this.hideOutside(event, 'sidebar'));
  // },
  // destroyed () {
  //   document.removeEventListener("click", event => this.hideOutside(event, 'sidebar'));
  // },
  computed: {
    ...mapState("index", ["unit", "permissions", "pengajar", "pengampu", "personalia",]),
    ...mapState("sidebar", ["activeMenu", "listAsrama", "listTahfidz", "listSettings", 'listEkskull', "listKelas", "listReport", 'listLaundry', 'listLaporan',
      "absensiSubList", "santriSubList", "pegawaiSubList", "databaseSubList", 'tahfidzSubList', 'tahfidz2SubList', 'kelasSubList', 'settingLaundrySubList', 'isSidebar', 'isSidebarOpen']),
    permissionsIzin() {
      return this.$store.state.asramaAbsensi.permissions
    },
    hasPersonalia() {
      return this.personalia === 'on' ? true : false
    },
    hasRoot() {
      return this.$auth.user.role !== 'root' ? true : false
    }
  },

  methods: {
    ...mapMutations("sidebar", ["notClick", "notClickSub", 'toggleSidebar']),
    // Method untuk menampilkan/menyembunyikan sub-menu saat menu utama diklik
    isRouteActive(route) {
      const currentPath = this.$route.path;
      return currentPath === route;
    },
    hasPermission(permission) {
      return this.permissions?.includes(permission);
    },
    // hideOutside(event, data) {
    //   // Mengambil referensi elemen profile
    //   const dataOutside = this.$refs[data];

    //   // Memeriksa apakah elemen yang diklik berada di luar profile
    //   if (dataOutside && !dataOutside.contains(event.target)) {
    //     this.toggleSidebar()
    //   }
    // },
    // hideOutside(event) {
    //   this.$store.dispatch('handleClickOutside', { event, data: this.$refs.profile });
    // }
  },
};
</script>

<style scoped>
@import url(~/assets/css/sidebar.css);
</style>
