<template>
  <div>

    <div class="animate__animated animate__fadeInUp">
      <div class="row mb-3">
        <div class="col-12 col-md-8 mb-3 mb-md-0 d-flex align-items-center">
          <h2>Jurnal Page</h2>
        </div>
        <div class="col-12 col-md-4 d-flex flex-wrap flex-md-nowrap gap-2 justify-content-end">
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inputModalJurnal">
            Input Data
          </button>
          <div class="input-group">
            <span class="input-group-text">Tanggal</span>
            <input type="date" class="form-control">
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">jam ke-</th>
              <th scope="col" class="text-capitalize">nama pengajar</th>
              <th scope="col" class="text-capitalize">mata pelajaran</th>
              <th scope="col" class="text-capitalize">judul / pembahasan</th>
              <th scope="col" class="text-capitalize">catatan kejadian / solusi</th>
              <th scope="col" class="text-capitalize text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-capitalize" scope="col">1</td>
              <td class="text-capitalize" scope="col">zuhudi ainun qolbi</td>
              <td class="text-capitalize" scope="col">fiqh</td>
              <td class="text-capitalize" scope="col">indahnya hari jumat</td>
              <td class="text-capitalize" scope="col">bagus bnget lah ceramahnya</td>
              <td class="text-capitalize text-end" scope="col">
                <a href="javascript:;" @click="editItem()">
                  <button class="btn btn-sm btn-warning">
                    <i class="bx bx-pencil text-dark"></i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="btn-group text-center float-end mt-3 mb-5" role="group">
        <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
          &laquo;
        </button>
        <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
          Prev
        </button>
        <button class="btn btn-dark  btn-sm disabled">{{ `${page ? page : 1}` }}</button>
        <button @click="page++" :disabled="page >= Math.ceil(santri?.length / perPage)" class="btn btn-primary  btn-sm">
          Next
        </button>
        <button @click="page = Math.ceil(santri.length / perPage)" :disabled="page >= Math.ceil(santri.length / perPage)"
          type="button" class="btn btn-primary  btn-sm">
          &raquo;
        </button>
      </div> -->
    </div>
    <JurnalModal />
  </div>
</template>

<script>
export default {
  methods: {
    editItem() {
      $('#inputModalJurnal').modal('show')
    }
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}

select {
  font-size: 12px;
  width: 100px;
}

.input-group label,
.input-group input,
.input-group i,
.input-group span,
button {
  font-size: 12px;
}

button {
  white-space: nowrap;
}

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
