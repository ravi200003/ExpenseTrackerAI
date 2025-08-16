import axios from "axios";

export async function validateUserToken(token) {
  return axios.post("/auth/validateUserToken", { token });
}