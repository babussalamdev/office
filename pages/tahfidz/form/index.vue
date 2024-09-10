<template>
  <section class="form-ujian">
    <h2 class="mb-3">Form Ujian</h2>
    <div class="card">
      <div class="card-header">
        <p>PTS Ganjil 2024/2025</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4 mb-3">
            <label for="" class="form-label">Nama</label>
            <input type="text" class="form-control">
          </div>
          <div class="col-12 col-md-6 col-lg-4 mb-3">
            <label for="" class="form-label">Kelas</label>
            <input type="text" class="form-control">
          </div>
          <div class="col-12 col-md-6 col-lg-4 mb-3">
            <label for="" class="form-label">Jumlah hafalan yang diuji</label>
            <input type="number" class="form-control" v-model="jumlahJuz">
          </div>
        </div>
        <div class="soal" v-for="(data, index) in generateArray" :key="index">
          <hr>
          <div class="row mb-3">
            <div class="col-12 col-md-6 col-lg-4">
              <div class="input-group">
                <span class="input-group-text">Juz ke -</span>
                <input type="number" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <p class="mb-2 ms-2">* Soal 1</p>
              <div class="row">
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Dhabth</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Ahkam Tajwid</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Sifat Huruf & Makhraj</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Total</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <p class="mb-2 ms-2">* Soal 2</p>
              <div class="row">
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one"
                    label="name" track-by="name" class="custom-multiselect" :style="{ fontSize: '12px' }"></multiselect>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Dhabth</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Ahkam Tajwid</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Sifat Huruf & Makhraj</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="input-group">
                    <span class="input-group-text">Total</span>
                    <input type="number" class="form-control">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      value: { name: 'Vue.js', language: 'JavaScript' },
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ],
      jumlahJuz: 4,
    }
  },
  computed: {
    generateArray() {
      // Membuat array dengan panjang jumlahJuz
      return Array.from({ length: this.jumlahJuz }, (_, index) => index);
    }
  },
  methods: {
    nameWithLang({ name, language }) {
      return `${name} — [${language}]`
    }
  },
}
</script>

<style>
.form-ujian section,
.form-ujian label,
.form-ujian input,
.form-ujian .input-group,
.form-ujian .input-group-text,
.form-ujian .form-control {
  font-size: 12px;
}

.multiselect .multiselect__single,
.multiselect__tags,
.multiselect__input {
  font-size: 12px !important;
}
</style>
