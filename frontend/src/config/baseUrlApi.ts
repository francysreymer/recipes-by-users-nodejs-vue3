const backendUrl = process.env.VUE_APP_BACKEND_URL || "http://localhost";
const backendPort = process.env.VUE_APP_APP_PORT || "3000";

if (!process.env.VUE_APP_BACKEND_URL || !process.env.VUE_APP_APP_PORT) {
  console.warn(
    "Environment variables VUE_APP_BACKEND_URL or VUE_APP_APP_PORT are not defined. Using default values."
  );
}

const baseUrlApi = `${backendUrl}:${backendPort}/api`;

export default baseUrlApi;
