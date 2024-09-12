export default () => ({
  pegawai: [],
  select: [],
  btn: true,
  value: [],
  password: '',
  options: [
    { name: "sd", code: 1 },
    { name: "smp", code: 2 },
    { name: "smptq", code: 3 },
    { name: "sma", code: 4 },
    { name: "tahfidz", code: 5 },
  ],
  updateData: '',
  jabatanShow: '',
  program: localStorage.getItem('program'),
  search: '',
  page: 1,
  perPage: 10
})
