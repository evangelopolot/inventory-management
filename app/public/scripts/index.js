/* eslint-disable */
import { login } from "./login.js";

// DOM ELEMENTS
const signupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".sign-in-form");

// DELEGATION
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password-sign-in").value;
    login(username, password);
  });
