<template>
  <div class="filters">
    <input
      v-model="name"
      type="text"
      placeholder="Filter by name"
      class="filter-input"
    />
    <input
      v-model="preparationTimeMinutes"
      type="number"
      placeholder="Filter by preparation time"
      class="filter-input"
    />
    <button @click="emitFilters" class="filter-button">Apply Filters</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RecipeFilters",
  setup(_, { emit }) {
    const name = ref("");
    const preparationTimeMinutes = ref<number | null>(null);

    const emitFilters = () => {
      emit("applyFilters", {
        name: name.value,
        preparationTimeMinutes: preparationTimeMinutes.value,
      });
    };

    return {
      name,
      preparationTimeMinutes,
      emitFilters,
    };
  },
});
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.filter-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
}

.filter-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.filter-button:hover {
  background-color: #369f6b;
}
</style>
