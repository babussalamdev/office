let development = process.env.NODE_ENV !== 'production'
export default {
  env: {
    version: require('./package.json').version,
    XlsxDev: process.env.API_XLSX,
    XlsxPro: process.env.API_XLSX
  },
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sistem Mahad Babussalam',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'view-transition', content: 'same-origin' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google', content: 'notranslate' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Logo-Mahad.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" },
      { href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css", rel: "stylesheet" },
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css' },
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', type: 'text/javascript' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '~/assets/css/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' },
    { src: '~/plugins/cookies.client.js', mode: 'client' },
    { src: '~/plugins/axios-instances.js' },
    { src: '~/plugins/moment.js', ssr: false },
    { src: '~/plugins/notifications.js' },
    '~/plugins/websocket.client.js',
  ],

  loading: '~/components/Loader.vue',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/home',
      '~/components/menu',
      '~/components/asrama',
      '~/components/ekskull',
      '~/components/ekskull/nilai',
      '~/components/pengampu',
      '~/components/pengampu/absensi',
      '~/components/kelas',
      '~/components/kelas/nilai',
      '~/components/laundry',
      '~/components/laundry/inputdata',
      '~/components/laundry/inventory',
      '~/components/laundry/channel',
      '~/components/laundry/finance',
      '~/components/laundry/absensi',
      '~/components/laundry/register',
      '~/components/laundry/nota',
      '~/components/pelanggaran',
      '~/components/pelanggaran/record',
      '~/components/tahfidz',
      '~/components/tahfidz/mutabaah',
      '~/components/tahfidz/modalmutabaah',
      '~/components/tahfidz/rekap',
      '~/components/tahfidz/rekap/absensitahfidz',
      '~/components/tahfidz/rekap/nilaitahfidz',
      '~/components/tahfidz/rekap/hafalantahfidz',
      '~/components/tahfidz/rekap/tahsintahfidz',
      '~/components/tahfidz/rekap/murojaahtahfidz',
      '~/components/santri',
      '~/components/santri/database',
      '~/components/santri/halaqah',
      '~/components/santri/kelas',
      '~/components/santri/asrama',
      '~/components/santri/qrcode',
      '~/components/pegawai',
      '~/components/pegawai/database',
      '~/components/pegawai/halaqah',
      '~/components/pegawai/walas',
      '~/components/pegawai/musyrif',
      '~/components/report/absensi',
      '~/components/report/mapel',
      '~/components/report/lagger',
      '~/components/report/jurnal',
      '~/components/report/pengampu',
      '~/components/report/tahfidz',
      '~/components/report/tahfidz/nilai',
      '~/components/report/tahfidz/hafalan',
      '~/components/report/tahfidz/tahsin',
      '~/components/report/tahfidz/murojaah',
      '~/components/settings/kaldik',
      '~/components/settings/kelas',
      '~/components/settings/kelompok',
      '~/components/settings/mapel',
      '~/components/settings/periode',
      '~/components/settings/struktur',
      '~/components/settings/nilaiquran',
      '~/components/settings/absensi',
      '~/components/settings/absensi/asrama',
      '~/components/settings/absensi/tahfidz',
      '~/components/settings/absensi/tahfidz/monitoring',
      '~/components/settings/absensi/kelas',
      '~/components/settings/setupabsensi',
      '~/components/settings/setuppelanggaran',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE,
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASE,
    },
    base: process.env.API_BASE,
    santri: process.env.API_SANTRI,
    card: process.env.API_CARD,
    websocket: process.env.API_WEBSOCKET,
    laundry: process.env.API_LAUNDRY
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // middleware
  router: {
    middleware: ['auth']
  },

  // authentication
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'IdToken',
          maxAge: 1800,
          global: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'RefreshToken',
          data: 'RefreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true
        },
        // api yang dipanggil
        endpoints: {
          login: { url: '/signin-account', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/get-account', method: 'get' },
          logout: { url: '/signout-account', method: 'post' }
        },
        // autoLogout: false
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: false
    }
  }

}
