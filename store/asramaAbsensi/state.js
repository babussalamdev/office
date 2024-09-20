const today = new Date()
const formattedDate = today.toISOString().split('T')[0]

export default () => ({
  santri: [],
  permissions: [],
  select: [],
  updateData: '',
  selectKelas: '',
  btn: true,
  page: 1,
  perPage: 10,
  search: '',
  dateIzin: formattedDate,

  // izin
  santriIzin: [],
  updateDataIzin: ''
})
