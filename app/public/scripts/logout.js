import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import { showAlert } from "./alerts.js";

export const logout = async (username, password) => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    console.log("Hoping this works" + res.data);

    if (res.data.status === "success") {
      showAlert("success", "Logged out successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
