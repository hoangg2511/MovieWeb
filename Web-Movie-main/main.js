document.addEventListener("DOMContentLoaded", function () {
  function scrollLeft(event) {
    const movieList = event.target.nextElementSibling;
    if (movieList && movieList.classList.contains("movie-list")) {
      movieList.scrollBy({ left: -1000, behavior: "smooth" });
    }
  }

  function scrollRight(event) {
    const movieList = event.target.previousElementSibling;
    if (movieList && movieList.classList.contains("movie-list")) {
      movieList.scrollBy({ left: 1000, behavior: "smooth" });
    }
  }

  // Gán sự kiện cho tất cả các nút sau khi DOM đã tải xong
  document.querySelectorAll(".left-arrow").forEach((button) => {
    button.addEventListener("click", scrollLeft);
  });

  document.querySelectorAll(".right-arrow").forEach((button) => {
    button.addEventListener("click", scrollRight);
  });
});

let index = 0;
function moveSlide(i) {
  index = i;
  document.querySelector(".slider").style.transform = `translateX(-${
    index * 100
  }%)`;
  document.querySelectorAll(".dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}

function prevSlide() {
  index = (index - 1 + 3) % 3;
  moveSlide(index);
}

function nextSlide() {
  index = (index + 1) % 3;
  moveSlide(index);
}

setInterval(() => {
  nextSlide();
}, 5000);

window.addEventListener("scroll", function () {
  let navbar = document.querySelector("header");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 1)"; // Đậm dần khi cuộn xuống
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.26)"; // Trong suốt khi ở đầu trang
  }
});
