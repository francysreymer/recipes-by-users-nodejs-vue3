import baseUrlApi from "@/config/baseUrlApi";

const apis = {
  login: `${baseUrlApi}/login`,
  register: `${baseUrlApi}/users`,
  recipe: `${baseUrlApi}/recipes`,
  category: `${baseUrlApi}/categories`,
};

export default apis;
