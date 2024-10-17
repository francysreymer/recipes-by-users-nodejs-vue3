<template>
  <div class="recipe-form-container">
    <h1>{{ isEditMode ? "Edit Recipe" : "Add New Recipe" }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nome">Name</label>
        <input type="text" id="nome" v-model="recipe.nome" required />
      </div>
      <div class="form-group">
        <label for="tempo_preparo_minutos">Preparation Time (minutes)</label>
        <input
          type="number"
          id="tempo_preparo_minutos"
          v-model="recipe.tempo_preparo_minutos"
          required
        />
      </div>
      <div class="form-group">
        <label for="porcoes">Portions</label>
        <input type="number" id="porcoes" v-model="recipe.porcoes" required />
      </div>
      <div class="form-group">
        <label for="modo_preparo">Preparation Method</label>
        <textarea
          id="modo_preparo"
          v-model="recipe.modo_preparo"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="ingredientes">Ingredients</label>
        <textarea
          id="ingredientes"
          v-model="recipe.ingredientes"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="id_categorias">Category</label>
        <select id="id_categorias" v-model="recipe.id_categorias" required>
          <option value="" disabled>Select a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.nome }}
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
    const recipe = ref<Partial<Recipe>>({});
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
            nome: data.nome,
            tempo_preparo_minutos: data.tempo_preparo_minutos,
            porcoes: data.porcoes,
            modo_preparo: data.modo_preparo,
            ingredientes: data.ingredientes,
            id_categorias: data.id_categorias.id,
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
