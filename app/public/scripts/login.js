import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import { showAlert } from "./alerts.js";

export const login = async (username, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        username,
        password,
      },
    });
    console.log("why is this not working?" + res.data);

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/user-homepage");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
