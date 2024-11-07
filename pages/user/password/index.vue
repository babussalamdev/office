<template>
  <section id="password">
    <div class="password">
      <div class="row">
        <div class="col-12 col-lg-4">
          <form @submit.prevent="changePassword" ref="pass">
            <h1>Ganti Password</h1>
            <!-- pass Old -->
            <div class="mb-4">
              <label for="oldPassword" class="mb-2">Password Lama</label><br />
              <div class="input-group mb-3">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  :type="type"
                  class="form-control"
                  required
                />
                <span
                  @click="showpassword"
                  class="input-group-text"
                  id="basic-addon1"
                >
                  <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
                  <i v-else class="bi bi-eye"></i>
                </span>
              </div>
            </div>
            <!-- pass new -->
            <div class="mb-4">
              <label for="newPassword" class="mb-2">Password Baru</label><br />
              <div class="input-group mb-3">
                <input
                  id="newPassword"
                  name="newPassword"
                  :type="type"
                  class="form-control"
                  required
                />
                <span
                  @click="showpassword"
                  class="input-group-text"
                  id="basic-addon1"
                >
                  <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
                  <i v-else class="bi bi-eye"></i>
                </span>
              </div>
            </div>
            <!-- pass confirm -->
            <div class="mb-4">
              <label for="passConfirm" class="mb-2">Konfirmasi Password</label
              ><br />
              <div class="input-group mb-3">
                <input
                  id="passConfirm"
                  name="passConfirm"
                  :type="type"
                  class="form-control"
                  required
                />
                <span
                  @click="showpassword"
                  class="input-group-text"
                  id="basic-addon1"
                >
                  <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
                  <i v-else class="bi bi-eye"></i>
                </span>
              </div>
            </div>
            <button v-if="btn" type="submit" class="btn btn-primary">
              Ganti Password
            </button>
            <button v-else class="btn btn-secondary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      type: "password",
      btn: true,
    };
  },
  methods: {
    async changePassword(event) {
      //manggil API
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      const token = await this.$cookies.get("AccessToken");
      if (data.oldPassword === data.newPassword) {
        this.btn = true;
        return Swal.fire({
          icon: "warning",
          text: "Password baru tidak boleh sama",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (data.newPassword !== data.passConfirm) {
        this.btn = true;
        return Swal.fire({
          icon: "warning",
          text: "Konfirmasi password salah",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      data["accessToken"] = token;
      delete data.passConfirm;
      try {
        const result = await this.$apiBase.$put(`change-password`, data);
        if (result) {
          this.btn = true;
          Swal.fire({
            icon: "success",
            text: "Berhasil Ubah Password",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$refs.pass.reset();
        }
        if (result.name === "LimitExceededException") {
          this.btn = true;
          Swal.fire({
            icon: "warning",
            text: "Batas harian ganti password sudah habis",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$refs.pass.reset();
        }
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "warning",
          text:
            error.response.data.name === "LimitExceededException"
              ? "Batas ubah password telah habis"
              : error.response.data.name === "NotAuthorizedException"
              ? "Password lama anda salah"
              : error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    showpassword() {
      const show = this.type === "password" ? "text" : "password";
      this.type = show;
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/user/user.css);
</style>
