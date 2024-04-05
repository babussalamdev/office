<template>
  <section id="profile">
    <div class="profile">
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="card">
            <i class="material-icons"> account_circle </i>
            <h1 class="text-capitalize">{{ profile.Nama }}</h1>
            <span class="text-capitalize">{{ $auth.user.role }}</span>

            <!-- label -->
            <div class="label-card">
              <p>Lulusan</p>
              <h2 class="text-capitalize">{{ profile.Lulusan }}</h2>
            </div>
            <div class="label-card">
              <p>Jabatan</p>
              <h2 class="text-capitalize">{{ profile.Jabatan }}</h2>
            </div>
            {{ profile }}
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
@import url(~/assets/css/user/user.css);
</style>
