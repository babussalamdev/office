<template>
  <section id="profile">
    <div class="profile">
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="card">
            <h1 class="mb-5 fw-bold">Your Profile</h1>
            <div class="list-form mb-3">
              <div class="row">
                <div class="col-md-3 d-flex align-items-center">
                  <label class="form-label mb-md-0 text-black">Name</label>
                </div>
                <div class="col-md-9">
                  <input name="name" :value="$auth.user.name" type="text" class="form-control" disabled readonly />
                </div>
              </div>
            </div>
            <div class="list-form mb-3">
              <div class="row">
                <div class="col-md-3 d-flex align-items-center">
                  <label class="form-label mb-md-0 text-black">Role</label>
                </div>
                <div class="col-md-9">
                  <input name="name" :value="$auth.user.role" type="text" class="form-control" disabled readonly />
                </div>
              </div>
            </div>
            <!-- <i class="material-icons"> account_circle </i>
            <h1 class="text-capitalize">{{ profile.Nama }}</h1>
            <span class="text-capitalize">{{ $auth.user.role }}</span> -->

            <!-- label -->
            <!-- <div class="label-card">
              <p>Lulusan</p>
              <h2 class="text-capitalize">{{ profile.Lulusan }}</h2>
            </div>
            <div class="label-card">
              <p>Jabatan</p>
              <h2 class="text-capitalize">{{ profile.Jabatan }}</h2>
            </div>
            {{ profile }} -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  async asyncData({ store }) {
    store.dispatch(`profile/showProfile`);
  },
  computed: {
    ...mapState("profile", ["profile"]),
  },
};
</script>

<style scoped>
/* @import url(~/assets/css/user/user.css); */
h1 {
  font-size: 20px;
}
.card {
  border: none !important;
  border-radius: 10px !important;
  box-shadow: 0 0 30px rgba(161, 161, 161, 0.1176470588);
  padding: 40px;
}
label, input {
  font-size: 14px;
}

</style>
