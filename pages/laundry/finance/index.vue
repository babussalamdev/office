<template>
  <section>
    <div class="position-relative">
      <!-- amount -->
      <LaundryFinanceHeader />
      <div class="row">
        <div class="col-12 col-md-5 mb-3">
          <LaundryFinanceBalance />
        </div>
        <div class="col-12 col-md-7">
          <LaundryFinanceHistory />
        </div>
      </div>
      <button title="Add New" class="icon-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" class="icon">
          <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            stroke-width="1.5"></path>
          <path d="M8 12H16" stroke-width="1.5"></path>
          <path d="M12 16V8" stroke-width="1.5"></path>
        </svg>
      </button>

    </div>
  </section>
</template>

<script>
export default {
  // middleware: 'permission',
  // meta: {
  //   permissions: ['laundry']
  // },
  async asyncData({ store }) {
    store.dispatch('laundry/finance/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
/* Styling for the button */
.icon-button {
  position: fixed;
  bottom: 15px;
  right: 10px;
  cursor: pointer;
  outline: none !important;
  border: none;
  transition: transform 0.3s ease-in-out;
  background: transparent;
}

.icon-button:hover {
  transform: rotate(90deg);
}

/* Styling for the SVG icon */
.icon {
  stroke: #60a5fa; /* Blue stroke color */
  fill: none;
  transition: fill 0.3s ease, stroke 0.3s ease;
}

/* On hover of the button */
.icon-button:hover .icon {
  fill: #1e40af; /* Darker blue fill on hover */
}

/* On active button state */
.icon-button:active .icon {
  stroke: #bfdbfe; /* Lighter blue stroke on active */
  fill: #4f86d8;  /* Lighter blue fill on active */
  transition-duration: 0s; /* No transition duration on active */
}

</style>
