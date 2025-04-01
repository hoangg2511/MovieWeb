document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form gửi đi

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password.length >= 8) {
        window.location.href = "/Web-Movie-main/home-movieList.html";
      } else {
        alert(
          "Please enter a valid email and password (at least 8 characters)."
        );
      }
    });
  }
});
