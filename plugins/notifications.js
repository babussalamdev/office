// plugins/notifications.js
export default ({ app }, inject) => {
  // Kode notifikasi Anda di sini
  inject('notifications', () => {
    const button = document.querySelector('button');

    button.addEventListener('click', () => {

      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          console.log('done')
          const notification = new Notification('Sisalam Update', {
            body: 'Ini adalah pesan tambahan',
            icon: '/logo-Mahad.png',
          });
          notification.addEventListener('error', e => {
            alert('error');
          });
        }
      });
    });
  });
};
