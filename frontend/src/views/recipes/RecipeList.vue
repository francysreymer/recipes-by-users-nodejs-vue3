<template>
  <a @click="logout" class="logout-link"><b>Logout</b></a>
  <div class="recipe-container">
    <h1>Recipes</h1>
    <button @click="redirectToAddRecipe" class="add-recipe-button">
      Add New Recipe
    </button>
    <RecipeFilters @applyFilters="applyFilters" />
    <MessageComponent
      v-if="message"
      :message="message.text"
      :type="message.type"
    />
    <table class="recipe-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Preparation Time (minutes)</th>
          <th>Servings</th>
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
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.preparation_time_minutes }}</td>
          <td>{{ recipe.servings }}</td>
          <td>{{ recipe.preparation_method }}</td>
          <td>{{ recipe.ingredients }}</td>
          <td>{{ recipe.category?.name }}</td>
          <td>{{ new Date(recipe.created_at).toLocaleString() }}</td>
          <td>{{ new Date(recipe.updated_at).toLocaleString() }}</td>
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
import Cookies from "js-cookie";

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
          <h1>${recipe.name}</h1>
          <dl class="recipe-details">
            <dt>ID:</dt>
            <dd>${recipe.id}</dd>
            <dt>Preparation Time (minutes):</dt>
            <dd>${recipe.preparation_time_minutes}</dd>
            <dt>Servings:</dt>
            <dd>${recipe.servings}</dd>
            <dt>Preparation Method:</dt>
            <dd>${recipe.preparation_method}</dd>
            <dt>Ingredients:</dt>
            <dd>${recipe.ingredients}</dd>
            <dt>Category:</dt>
            <dd>${recipe.category.name}</dd>
            <dt>Created At:</dt>
            <dd>${new Date(recipe.created_at).toLocaleString()}</dd>
            <dt>Updated At:</dt>
            <dd>${new Date(recipe.updated_at).toLocaleString()}</dd>
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
      name: string;
      preparation_time_minutes: number | null;
    }) => {
      console.log("Applying filters:", filters);
      fetchRecipes(filters);
    };

    onMounted(() => {
      fetchRecipes();
    });

    const logout = () => {
      Cookies.remove("auth_token");
      router.push("/");
    };

    return {
      recipes,
      redirectToAddRecipe,
      printRecipe,
      editRecipe,
      deleteRecipe,
      message,
      applyFilters,
      logout,
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

.logout-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #42b983;
  cursor: pointer;
  text-decoration: underline;
}

.logout-link:hover {
  color: #369f6b;
}
</style>
