<template>
  <div class="recipe-container">
    <h1>Recipes</h1>
    <button @click="redirectToAddRecipe" class="add-recipe-button">
      Add New Recipe
    </button>
    <MessageComponent
      v-if="message"
      :message="message.text"
      :type="message.type"
    />
    <RecipeFilters @applyFilters="applyFilters" />
    <table class="recipe-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Preparation Time (minutes)</th>
          <th>Portions</th>
          <th>Preparation Method</th>
          <th>Ingredients</th>
          <th>Category</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in recipes" :key="recipe.id">
          <td>{{ recipe.id }}</td>
          <td>{{ recipe.nome }}</td>
          <td>{{ recipe.tempo_preparo_minutos }}</td>
          <td>{{ recipe.porcoes }}</td>
          <td>{{ recipe.modo_preparo }}</td>
          <td>{{ recipe.ingredientes }}</td>
          <td>{{ recipe.id_categorias.nome }}</td>
          <td>{{ new Date(recipe.criado_em).toLocaleString() }}</td>
          <td>{{ new Date(recipe.alterado_em).toLocaleString() }}</td>
          <td>
            <button @click="printRecipe(recipe)" class="action-button">
              Print
            </button>
            <button @click="editRecipe(recipe.id)" class="action-button">
              Edit
            </button>
            <button @click="deleteRecipe(recipe.id)" class="action-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "@/config/axios";
import { useRouter } from "vue-router";
import apis from "@/config/apis";
import { Recipe } from "@/types/Recipe";
import MessageComponent from "@/components/MessageComponent.vue";
import RecipeFilters from "@/components/RecipeFilters.vue";

export default defineComponent({
  name: "RecipeList",
  components: {
    MessageComponent,
    RecipeFilters,
  },
  setup() {
    const recipes = ref<Recipe[]>([]);
    const router = useRouter();
    const message = ref<{ text: string; type: string } | null>(null);

    const fetchRecipes = async (filters = {}) => {
      try {
        const response = await axios.get(apis.recipe, { params: filters });
        recipes.value = response.data;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const redirectToAddRecipe = () => {
      router.push("/recipes/add");
    };

    const printRecipe = (recipe: Recipe) => {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        console.error("Failed to print window");
        return;
      }

      const printContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          .recipe-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            color: #42b983;
          }
          .recipe-details {
            margin-top: 20px;
          }
          .recipe-details dt {
            font-weight: bold;
            margin-top: 10px;
          }
          .recipe-details dd {
            margin: 0 0 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="recipe-container">
          <h1>${recipe.nome}</h1>
          <dl class="recipe-details">
            <dt>ID:</dt>
            <dd>${recipe.id}</dd>
            <dt>Preparation Time (minutes):</dt>
            <dd>${recipe.tempo_preparo_minutos}</dd>
            <dt>Portions:</dt>
            <dd>${recipe.porcoes}</dd>
            <dt>Preparation Method:</dt>
            <dd>${recipe.modo_preparo}</dd>
            <dt>Ingredients:</dt>
            <dd>${recipe.ingredientes}</dd>
            <dt>Category:</dt>
            <dd>${recipe.id_categorias.nome}</dd>
            <dt>Created At:</dt>
            <dd>${new Date(recipe.criado_em).toLocaleString()}</dd>
            <dt>Updated At:</dt>
            <dd>${new Date(recipe.alterado_em).toLocaleString()}</dd>
          </dl>
        </div>
      </body>
    </html>`;

      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    };

    const editRecipe = (id: number) => {
      router.push(`/recipes/edit/${id}`);
    };

    const deleteRecipe = async (id: number) => {
      try {
        await axios.delete(`${apis.recipe}/${id}`);
        message.value = {
          text: "Recipe deleted successfully!",
          type: "success",
        };
        fetchRecipes();
      } catch (error) {
        message.value = {
          text: "Error deleting recipe",
          type: "error",
        };
        console.error("Error deleting recipe:", error);
      }
    };

    const applyFilters = (filters: {
      nome: string;
      tempo_preparo_minutos: number | null;
    }) => {
      console.log("Applying filters:", filters);
      fetchRecipes(filters);
    };

    onMounted(() => {
      fetchRecipes();
    });

    return {
      recipes,
      redirectToAddRecipe,
      printRecipe,
      editRecipe,
      deleteRecipe,
      message,
      applyFilters,
    };
  },
});
</script>

<style scoped>
.recipe-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-recipe-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-recipe-button:hover {
  background-color: #369f6b;
}

.recipe-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.recipe-table th,
.recipe-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.recipe-table th {
  background-color: #f2f2f2;
}

.action-button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #369f6b;
}
</style>
