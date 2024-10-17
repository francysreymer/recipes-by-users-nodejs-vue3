import Cookies from "js-cookie";

export function isAuthenticated(): boolean {
  // Example: Check if a token exists in cookies
  return !!Cookies.get("auth_token");
}
