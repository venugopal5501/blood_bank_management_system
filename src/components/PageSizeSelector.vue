<template>
  <div class="page-size-selector">
    <select v-model="localValue">
      <option v-for="size in sizes" :key="size" :value="size">
        {{ size }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "PageSizeSelector",
  props: {
    value: Number,
    sizes: {
      type: Array,
      default: () => [5, 10, 15, 20]
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>


<style>
.page-size-selector {
  display: flex;
  align-items: flex-end;
  justify-content: end;
  gap: 8px;
  margin-bottom: 15px;
}

.page-size-selector select {
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>