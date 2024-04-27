const signInBtn = document.querySelector(".sign-in");
const signUpBtn = document.querySelector(".sign-up");
const signInForm = document.querySelector(".form-container-sign-in");
const signUpForm = document.querySelector(".form-container-sign-up");

signInBtn.addEventListener("click", function () {
  signInBtn.classList.add("btn-active");
  signUpBtn.classList.remove("btn-active");
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

signUpBtn.addEventListener("click", function () {
  signUpBtn.classList.add("btn-active");
  signInBtn.classList.remove("btn-active");
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

const passwordInputs = document.querySelectorAll(".password-input input");
const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach((icon, index) => {
  icon.addEventListener("click", function () {
    const passwordInput = passwordInputs[index];
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});
