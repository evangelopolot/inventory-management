// import { signup } from "./signup";
// import { login } from "./login";
console.log("Connected to index.js");
// DOM ELEMENTS
const signupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".sign-in-form");

// if (signupForm) {
//   signupForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     signup(username, email, password, passwordConfirm);
//   });
// }
console.log(loginForm);
if (loginForm) {
  console.log("Login form found");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
  });
}
