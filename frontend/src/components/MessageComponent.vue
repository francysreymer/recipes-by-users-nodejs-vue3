<template>
  <div v-if="visible" :class="['message', type]" @click="hideMessage">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "MessageComponent",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup() {
    const visible = ref(true);

    const hideMessage = () => {
      visible.value = false;
    };

    onMounted(() => {
      setTimeout(() => {
        hideMessage();
      }, 2000);
    });

    return {
      visible,
      hideMessage,
    };
  },
});
</script>

<style scoped>
.message {
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
