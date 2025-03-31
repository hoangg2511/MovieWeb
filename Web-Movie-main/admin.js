function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });
  document.getElementById(pageId).classList.remove("hidden");
}

function logout() {
  alert("Logging out...");
  window.location.href = "signin.html";
}
