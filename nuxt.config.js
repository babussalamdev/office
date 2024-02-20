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
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Logo-Mahad.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' }
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
      '~/components/home'
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
          property: 'idToken',
          maxAge: 15,
          global: true,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: false
        },
        endpoints: {
          login: { url: '/signin-account', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/get-account', method: 'get' },
          logout: { url: '/signout-account', method: 'post' }
        },
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: false
    }
  }
}
