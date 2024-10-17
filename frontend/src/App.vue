<template>
  <div>
    <nav>
      <router-link v-if="isAuthenticated" to="/dashboard"
        >Dashboard</router-link
      >
      <a v-if="isAuthenticated" @click="logout">Logout</a>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";

export default {
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    logout() {
      Cookies.remove("auth_token");
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
