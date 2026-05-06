<template>
  <div>
    <div class="card bg-secondary bg-opacity-10" style="padding: 12px; border-radius: 15px">
      <div
        class="container-balance bg-white position-relative"
        style="border-radius: 10px; padding: 15px; border: 1px solid #ced4da; overflow: hidden">
        <div class="circle"></div>
        <div class="position-relative" style="z-index: 2">
          <!-- Changed mb-3 to mb-1 on the wrapper so the button doesn't sit too low -->
          <div class="balance d-flex flex-column align-items-center justify-content-center mb-1">
            <div class="d-flex gap-1 bg-secondary-subtle px-2 py-1 rounded-pill mb-2">
              <i class="bi bi-info-circle" style="font-size: 8px !important"></i>
              <p class="mb-0" style="font-size: 8px !important">Balance</p>
            </div>

            <!-- Wrapped the h1 in its own div with mb-3 to space it from the button -->
            <div class="balance-amount mb-3">
              <h1 class="fw-bold mb-0" style="font-size: 24px">{{ rupiah(datas?.total_denda || 0) }}</h1>
            </div>

            <!-- Improved 'Add Note' Button -->
            <button
              v-if="hasBendahara"
              class="btn btn-dark rounded-pill d-flex align-items-center shadow-sm btn-add-note"
              data-bs-toggle="modal"
              data-bs-target="#laundryFinanceAdd">
              <i class="bi bi-plus-circle me-2"></i>
              Add Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import formatSet from "~/mixins/formatSet";

  export default {
    mixins: [formatSet],
    computed: {
      ...mapState("laundry/finance", ["datas"]),
      hasBendahara() {
        const program = localStorage.getItem("program");
        return this.$auth.user.Jabatan[program] === "bendahara";
      },
    },
  };
</script>

<style scoped>
  @import url(~/assets/css/laundry/laundry.css);

  .circle {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    height: 100px;
    width: 100px;
    background-color: #7ed833;
    filter: blur(40px);
    border-radius: 50%;
    z-index: 1;
  }

  /* Custom styling for the new button */
  .btn-add-note {
    font-size: 12px;
    padding: 6px 16px;
    background-color: #2b5c5e; /* Ties in nicely with your dark teal sidebar */
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .btn-add-note:hover {
    background-color: #1f4244;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
  }
</style>
