<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="login">Login</label>
        <input type="login" id="login" v-model="login" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
      <MessageComponent
        v-if="message"
        :message="message.text"
        :type="message.type"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import apis from "@/config/apis";
import { StatusCodes } from "http-status-codes";
import MessageComponent from "@/components/MessageComponent.vue";

export default defineComponent({
  name: "UserRegister",
  components: {
    MessageComponent,
  },
  setup() {
    const router = useRouter();
    const message = ref<{ text: string; type: string } | null>(null);
    const name = ref("");
    const login = ref("");
    const password = ref("");

    const registerUser = async () => {
      try {
        const response = await axios.post(apis.register, {
          nome: name.value,
          login: login.value,
          password: password.value,
        });

        if (response.status === StatusCodes.CREATED) {
          message.value = {
            text: "User registered successfully!",
            type: "success",
          };
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      } catch (error) {
        message.value = {
          text: "Error registering user",
          type: "error",
        };
        console.error("Error registering user:", error);
      }
    };

    return {
      registerUser,
      message,
      name,
      login,
      password,
    };
  },
});
</script>

<style scoped>
.register-container {
  max-width: 400px;
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

.form-group {
  margin-bottom: 15px;
}

label {
  text-align: left;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369f6b;
}
</style>
