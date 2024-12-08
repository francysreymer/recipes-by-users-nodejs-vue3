<template>
  <div class="recipe-form-container">
    <h1>{{ isEditMode ? "Edit Recipe" : "Add New Recipe" }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="recipe.name" required />
      </div>
      <div class="form-group">
        <label for="preparation_time_minutes">Preparation Time (minutes)</label>
        <input
          type="number"
          id="preparation_time_minutes"
          v-model="recipe.preparation_time_minutes"
          required
        />
      </div>
      <div class="form-group">
        <label for="servings">Servings</label>
        <input type="number" id="servings" v-model="recipe.servings" required />
      </div>
      <div class="form-group">
        <label for="preparation_method">Preparation Method</label>
        <textarea
          id="preparation_method"
          v-model="recipe.preparation_method"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          v-model="recipe.ingredients"
          required
        ></textarea>
      </div>
      {{ categories }}
      <div class="form-group">
        <label for="category_id">Category</label>
        <select id="category_id" v-model="recipe.category" required>
          <option value="" disabled>Select a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
    <MessageComponent
      v-if="message"
      :message="message.text"
      :type="message.type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/config/axios";
import { Recipe } from "@/types/Recipe";
import { Category } from "@/types/Category";
import apis from "@/config/apis";
import MessageComponent from "@/components/MessageComponent.vue";

export default defineComponent({
  name: "RecipeForm",
  components: {
    MessageComponent,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEditMode = ref(false);
    const recipe = ref<Partial<Recipe>>({
      category: { id: 0, name: "" }, // Provide a default value for category
    });
    const categories = ref<Category[]>([]);
    const message = ref<{ text: string; type: string } | null>(null);

    onMounted(async () => {
      const id = route.params.id;
      if (id) {
        isEditMode.value = true;
        try {
          const response = await axios.get(`${apis.recipe}/${id}`);
          const data = response.data;
          recipe.value = {
            id: data.id,
            name: data.name,
            preparation_time_minutes: data.preparation_time_minutes,
            servings: data.servings,
            preparation_method: data.preparation_method,
            ingredients: data.ingredients,
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at),
            category: data.category,
          };
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      }

      try {
        const response = await axios.get(apis.category);
        categories.value = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    });

    const handleSubmit = async () => {
      const id = route.params.id;
      try {
        if (isEditMode.value) {
          await axios.put(`${apis.recipe}/${id}`, recipe.value);
        } else {
          await axios.post(apis.recipe, recipe.value);
        }
        message.value = {
          text: "Recipe saved successfully!",
          type: "success",
        };

        setTimeout(() => {
          router.push("/recipes");
        }, 1000);
      } catch (error) {
        console.error("Error saving recipe:", error);
        message.value = { text: "Failed to save recipe.", type: "error" };
      }
    };

    return {
      isEditMode,
      recipe,
      categories,
      handleSubmit,
      message,
    };
  },
});
</script>

<style scoped>
.recipe-form-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6b;
}
</style>
