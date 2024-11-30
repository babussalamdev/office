// plugins/axios-instances.js
export default function ({ $axios, $config, $auth }, inject) {

  const apiBase = $axios.create({
    baseURL: $config.base
  })

  apiBase.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // API untuk data santri
  const apiSantri = $axios.create({
    baseURL: $config.santri
  })

  apiSantri.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // API Untuk data card
  const apiCard = $axios.create({
    baseURL: $config.card
  })
  apiCard.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // API Untuk data laundry
  const apiLaundry = $axios.create({
    baseURL: $config.laundry
  })
  apiLaundry.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });


  // Inject instance ke dalam konteks Nuxt
  inject('apiBase', apiBase)
  inject('apiSantri', apiSantri)
  inject('apiCard', apiCard)
  inject('apiLaundry', apiLaundry)
}
