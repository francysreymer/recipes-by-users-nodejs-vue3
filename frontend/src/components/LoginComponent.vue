<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="login">Login</label>
          <input
            type="text"
            id="login"
            v-model="login"
            required
            placeholder="Enter your login"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import apis from "@/config/apis";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const router = useRouter();
    const EXPIRE_IN_7_DAYS = 7;
    const login = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      try {
        const response = await axios.post(apis.login, {
          login: login.value,
          senha: password.value,
        });

        const token = response.data.token;
        Cookies.set("auth_token", token, { expires: EXPIRE_IN_7_DAYS });

        console.log("Authentication successful token:", token);
        router.push("/recipes");
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    };

    return {
      login,
      password,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #369f6b;
}
</style>
