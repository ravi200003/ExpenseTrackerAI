import axios from "axios";

export async function refreshToken(refreshToken) {
  const res = await axios.post("/api/auth/refresh", { refreshToken });
  return res.data;
}
