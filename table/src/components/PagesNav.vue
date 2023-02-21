<template>
  <div class="pagination w-full h-10 mt-auto mb-6 z-10 flex justify-center items-center gap-5 ">
    <button class="focus:outline-none px-4" v-if="currentPage > 1" @click="onPageChange(currentPage - 1)">Prev</button>
    <button
      class="focus:outline-none px-4 min-h-[24px] min-w-[24px] flex items-center justify-center transition-all duration-200"
      v-for="pageNumber in pageNumbers"
      :key="pageNumber"
      :class="this.currentPage === pageNumber  && 'border-2 !border-secondary-gray'"
      @click="onPageChange(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button class="focus:outline-none px-4" v-if="currentPage < totalPages" @click="onPageChange(currentPage + 1)">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    pageNumbers() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, start + 4);
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    onPageChange(pageNumber) {
      this.$emit('update:current-page', pageNumber);
      console.log(this.currentPage === pageNumber );
    }
  }
}
</script>

<style>

</style>