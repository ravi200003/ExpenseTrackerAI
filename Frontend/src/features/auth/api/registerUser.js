import axios from "axios";

export async function registerUser(data) {
  const res = await axios.post("/api/auth/register", data);
  return res.data;
}
