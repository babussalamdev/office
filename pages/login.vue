<template>
  <section id="loginPage">
    <div class="loginPage">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 left-side d-none d-md-flex">
            <div
              class="d-flex align-items-center gap-3 animate__animated animate__fadeInLeft"
            >
              <img src="~/assets/img/logo-1.png" alt="Logo Babussalam" />
              <span class="fw-semibold">Sistem Ma'had Babussalam</span>
            </div>
            <div>
              <img
                src="~/assets/img/main.png"
                alt="main image"
                class="mainImage animate__animated animate__fadeInLeft"
              />
              <h1 class="animate__animated animate__fadeInLeft">
                Just one small step to enter <br />
                your dashboard
              </h1>
              <h6 class="animate__animated animate__fadeInLeft">
                Manage all Ma'had programs in one application
              </h6>
            </div>
            <div></div>
          </div>

          <!-- right side -->
          <div class="col-12 col-md-6 right-side">
            <div class="container-right-side">
              <div
                class="d-flex d-md-none logo-right position-fixed align-items-center gap-3 animate__animated animate__fadeInLeft"
              >
                <img
                  src="~/assets/img/logo-1.png"
                  alt="Logo Babussalam"
                  width="30px"
                />
                <span class="fw-semibold text-white h6 m-0"
                  >Sistem Ma'had Babussalam</span
                >
              </div>
              <form @submit.prevent="submit">
                <h2
                  class="text-white fw-semibold animate__animated animate__fadeInRight"
                >
                  Sign In
                </h2>

                <div class="input-card">
                  <!-- input username -->
                  <div
                    class="input-group-manual mb-3 animate__animated animate__fadeInRight"
                  >
                    <i class="bx bx-user mx-3"></i>
                    <input
                      type="text"
                      class="input"
                      name="username"
                      placeholder="Username"
                      required
                    />
                  </div>

                  <!-- input password -->
                  <div
                    class="input-group-manual mb-4 animate__animated animate__fadeInRight"
                  >
                    <i class="bx bx-lock-alt mx-3"></i>
                    <input
                      :type="type"
                      class="input"
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <i class="bx bx-low-vision" @click="typePass"></i>
                  </div>

                  <p class="mb-5 animate__animated animate__fadeInRight">
                    <a href="/" class="text-decoration-none"
                      >Forgot password?</a
                    >
                  </p>

                  <!-- button submit -->
                  <div
                    class="input-group mb-5 animate__animated animate__fadeInRight"
                  >
                    <input
                      v-if="btnLoad"
                      type="submit"
                      class="btn shadow"
                      value="Masuk"
                    />
                    <button v-else class="btn" type="button" disabled>
                      <span
                        class="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                      <span role="status">Loading...</span>
                    </button>
                  </div>

                  <!-- note -->
                  <span
                    class="note d-block d-sm-none text-center text-white animate__animated animate__fadeInUp"
                    >&copy;{{ currentYear }} Babussalam</span
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "login",
  data() {
    return {
      type: "password",
      btnLoad: true,
      currentYear: "",
    };
  },
  mounted() {
    const year = new Date().getFullYear();
    this.currentYear = year;
  },
  methods: {
    typePass() {
      const show = this.type === "password" ? "text" : "password";
      this.type = show;
    },
    async submit(event) {
      this.btnLoad = false;
      const data = Object.fromEntries(new FormData(event.target));
      try {
        const result = await this.$auth.loginWith("local", { data: data });
        if (result) {
          this.$cookies.set("AccessToken", result.data.AccessToken, {
            // secure: true,
            expires: 1,
          });
          this.btnLoad = true;
          console.log(this.$auth.user);
          this.$router.push("/");
        }
      } catch (error) {
        this.btnLoad = true;
        if (error.response && error.response.status === 500) {
          Swal.fire({
            text: error.response.data.name.replace(/(?=[A-Z])/g, " "),
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            text: error.message,
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/login.css);
</style>
