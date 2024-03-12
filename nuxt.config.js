let development = process.env.NODE_ENV !== 'production'
export default {
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
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Logo-Mahad.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' }
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
    { src: '~/plugins/cookies.client.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/all',
      '~/components/utama',
      '~/components/home',
      '~/components/kelas',
      '~/components/kelompok',
      '~/components/mapel',
      '~/components/kaldik',
      '~/components/santri',
      '~/components/santri/database',
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
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://x5y7lm8kml.execute-api.ap-southeast-1.amazonaws.com/prod/',
    mode: "cors"
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
