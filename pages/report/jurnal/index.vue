<template>
    <section id="jurnal">
        <div class="jurnal">
            <ReportJurnalTableVer1 />
        </div>
    </section>
</template>

<script>
export default {
    middleware: 'permission',
    meta: {
        permissions: ['report jurnal']
    },
    async asyncData({ store }) {
        store.dispatch("report/jurnal/changeUnit");
    },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
