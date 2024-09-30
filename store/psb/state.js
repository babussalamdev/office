export default () => ({
  pegawai: [
    {
        "SK": "afde72ef-6401-4442-842d-1c8e8c",
        "Nama": "abdul ro'uf",
        "PSB": {
          "Program": "001, 002",
          "Role": {
            "001": 'admin',
            "002": ''
          }
        },
        "PK": "pegawai"
    },
    // {
    //     "SK": "9a637644-595b-4ac0-889e-f96239",
    //     "Nama": "abdul rochim",
    //     "Program": "smp",
    //     "PK": "pegawai"
    // },
    // {
    //     "SK": "f434828b-687b-4949-afb2-90a57a",
    //     "Nama": "abdul wahab",
    //     "Program": "sma,smp",
    //     "PK": "pegawai"
    // },
],
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
  perPage: 10,
  th: {},
  repeatColumn: ''
})
