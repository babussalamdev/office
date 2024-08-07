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
          <button class="Btn" @click="reloadData">
            <svg height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 473.677 473.677" xml:space="preserve">
              <path style="fill:#344E5D;" d="M473.677,236.842c0-130.814-106.036-236.838-236.835-236.838C106.036,0.004,0,106.032,0,236.842
              c0,130.795,106.036,236.831,236.842,236.831C367.641,473.673,473.677,367.637,473.677,236.842z" />
              <g>
                <path style="fill:#FFFFFF;" d="M414.449,297.547c-17.243-27.052-34.494-54.108-51.741-81.156c-2.909-4.57-9.218-4.458-12.12,0.045
                c-17.374,26.966-34.756,53.936-52.133,80.902c-1.881,2.917-1.245,5.733,0.52,7.681c1.092,1.653,2.909,2.831,5.505,2.838
                c9.151,0.022,18.301,0.045,27.448,0.067c-42.22,67.081-144.695,73.228-192.797,4.342c-15.407-22.06-51.86-0.995-36.293,21.304
                c33.963,48.633,89.746,76.474,149.359,69.65c57.361-6.57,103.657-43.663,126.644-95.18c9.835,0.026,19.674,0.049,29.513,0.075
                C413.537,308.126,417.366,302.12,414.449,297.547z" />
                <path style="fill:#FFFFFF;" d="M370.457,138.899c-33.97-48.633-89.75-76.478-149.366-69.65
                c-57.933,6.63-104.547,44.43-127.288,96.761c-12.232-0.03-24.476-0.06-36.708-0.09c-5.187-0.015-9.02,5.987-6.099,10.561
                c17.243,27.052,34.49,54.108,51.733,81.16c2.913,4.566,9.218,4.454,12.124-0.045c17.374-26.97,34.759-53.936,52.133-80.902
                c1.877-2.917,1.245-5.729-0.512-7.677c-1.092-1.653-2.909-2.835-5.508-2.842c-6.847-0.015-13.694-0.034-20.545-0.049
                c41.599-68.55,145.267-75.322,193.744-5.92C349.572,182.259,386.029,161.194,370.457,138.899z" />
              </g>
            </svg>
            <span class="tooltip">reload</span>
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
  right: 40px;
}

/* From Uiverse.io by vinodjangid07 */
.Btn {
  width: 45px;
  height: 45px;
  /* border: none; */
  border-radius: 50%;
  background-color: #2c4f5c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition-duration: .5s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.137);
  border: 2px solid #bbecff;
}

.logoIcon {
  fill: white;
}

.tooltip {
  position: absolute;
  top: -20px;
  opacity: 0;
  background-color: #2c4f5c;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: .2s;
  pointer-events: none;
  letter-spacing: 0.5px;
}

.tooltip::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: #2c4f5c;
  background-size: 1000%;
  background-position: center;
  transform: rotate(45deg);
  bottom: -20%;
  transition-duration: .3s;
}

.Btn:hover .tooltip {
  top: -45px;
  opacity: 1;
  transition-duration: .3s;
}

.Btn:hover {
  background-position: right;
  transition-duration: .5s;
}



@media screen and (max-width: 992px) {
  .home {
    height: max-content;
  }
}
</style>
