<template>
  <section id="login">
    <div class="login">
      <div class="login-card">
        <form>
          <h1 class="text-center fw-bold mb-3">Login to your Account</h1>
          <h6 class="text-center fw-normal mb-5 text-secondary">
            Enter to continue and explore within your grasp
          </h6>

          <div class="input-card">
            <!-- input username -->
            <div class="input-group-manual mb-3">
              <i class="bx bx-user mx-4"></i>
              <input
                type="text"
                class="input"
                name="username"
                placeholder="Enter email or phone"
              />
            </div>

            <!-- input password -->
            <div class="input-group-manual mb-3">
              <i class="bx bx-lock-alt mx-4"></i>
              <input
                :type="type"
                class="input"
                name="username"
                placeholder="Password"
              />
              <i class="bx bx-low-vision mx-4" @click="typePass"></i>
            </div>

            <p class="text-end mb-3">
              <a href="#" class="text-decoration-none">Forgot password?</a>
            </p>

            <!-- button submit -->
            <div class="input-group mb-5">
              <input type="submit" class="btn btn-primary" />
            </div>
          </div>

          <!-- register link -->
          <p>
            Don't have an account ?
            <nuxt-link to="/" class="text-decoration-none">Sign Up</nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "login",
  data() {
    return {
      type: "password",
    };
  },
  methods: {
    typePass() {
      const show = this.type === "password" ? "text" : "password";
      this.type = show;
    },
  },
  computed: {
    ...mapGetters({
      data: "counter",
    }),
  },
};
</script>

<style scoped>
@import url(~/assets/css/index.css);
</style>
