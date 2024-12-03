export default {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSidebar({ commit }) {
    commit('CLOSE_SIDEBAR');
  },
  openSidebar({ commit }) {
    commit('OPEN_SIDEBAR');
  },
  handleClickOutside({ dispatch, route }, event) {
    const sidebar = document.querySelector('.sidebar');
    const navbar = document.querySelector('.hamburger-menu');
    const navbarMobile = document.querySelector('.hamburger-menu-mobile');

    // if( v-if="!this.$route.path === '/laundry/finance'" )
    if (this.$router.currentRoute.path !== '/laundry/finance') {
      if (sidebar && !sidebar.contains(event.target) && !navbar.contains(event.target) && !navbarMobile.contains(event.target)) {
        dispatch('closeSidebar');
      }
    }
  }
}
