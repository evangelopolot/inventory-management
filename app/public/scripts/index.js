/* eslint-disable */
import { login } from "./login.js";
import { logout } from "./logout.js";

// DOM ELEMENTS
const signupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".sign-in-form");
const logoutBtn = document.getElementById("logout");

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

if (logoutBtn)
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
