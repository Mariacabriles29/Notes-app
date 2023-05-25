// api.js
import axios from "axios";

const API_URL = "http://localhost:3001";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { username, password },
    });
    return response.data[0];
  } catch (error) {
    throw new Error("Error de inicio de sesión");
  }
};
