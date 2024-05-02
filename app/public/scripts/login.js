import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (username, password) => {
  try {
    console.log("Calling login API");
    const res = await axios({
      method: "POST",
      url: "http:localhost:8000/api/v1/users/login",
      data: {
        username,
        password,
      },
    });

    if (res.data.status === "success") {
      console.log("Logged in successfully");
      window.setTimeout(() => {
        location.assign("/user-homepage");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};
