<template>
  <section id="home">
    <div v-if="unit" class="home animate__animated animate__fadeIn">
      <div v-if="$auth.user.role !== 'root'">
        <Chart />
        <div class="row">
          <div class="col-12 col-lg-6 mb-3 h-100">
            <!-- kelas -->
            <ChartClass />
          </div>
          <div class="col-12 col-lg-6 mb-3 h-100">
            <!-- pelanggaran -->
            <Violation />
          </div>
        </div>
        <div class="reload-button">
          <!-- <i class="bi bi-arrow-clockwise bg-primary p-2 rounded-circle text-white cursor-pointer"></i> -->
          <button @click="reloadData">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                  class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </div>
            </div>
            <span>Reload</span>
          </button>
        </div>
      </div>
      <div v-if="$auth.user.role === 'root'">
        <ChartAdmin />
      </div>
    </div>
    <div v-else>
      <h1>Welcome</h1>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      violation: [
        { name: "Fauzan Gunawan", jenis: "Bahasa" },
        { name: "Dean Syawafian", jenis: "Keamanan" },
        { name: "Sulthan Bahij", jenis: "Ibadah" },
        { name: "Abid Biaggy", jenis: "Kebersihan" },
        { name: "Hammam Musyafa", jenis: "Bahasa" },
      ],
    };
  },
  computed: {
    ...mapState("index", ["unit"]),
  },

  async asyncData({ store }) {
    const program = localStorage.getItem('program')
    store.dispatch(`home/setMainChart`, program);
  },

  methods: {
    reloadData() {
      const program = localStorage.getItem('program')
      this.$store.dispatch(`home/setMainChart`, program);
    }
  },
};
</script>

<style scoped>
.home {
  height: min-content;
  padding-bottom: 80px;
}

.reload-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
}

button {
  font-family: inherit;
  font-size: 18px;
  background: linear-gradient(to bottom, #4dc7d9 0%, #66a6ff 100%);
  color: white;
  padding: 0.8em 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  padding: 0em;
  background: linear-gradient(to bottom, #5bd9ec 0%, #97c3ff 100%);
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

button span {
  display: block;
  margin-left: 0.4em;
  transition: all 0.3s;
}

button:hover span {
  scale: 0;
  font-size: 0%;
  opacity: 0;
  transition: all 0.5s;
}

button svg {
  width: 18px;
  height: 18px;
  fill: white;
  transition: all 0.3s;
}

button .svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

button:hover .svg-wrapper {
  background-color: rgba(43, 169, 228, 0.897);
  width: 54px;
  height: 54px;
}

button:hover svg {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  transform: rotate(45deg);
}



@media screen and (max-width: 992px) {
  .home {
    height: max-content;
  }
}
</style>
