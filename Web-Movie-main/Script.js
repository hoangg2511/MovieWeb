// DOM Elements
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");
const searchInput = document.querySelector(".search-container input");
const moviesTableBody = document.querySelector("#moviesTableBody");
const trendingMoviesList = document.querySelector("#trendingMovies");
const recentUsersList = document.querySelector("#recentUsers");

// Mock Data (replace with actual data from your server or database)
const moviesData = [
  {
    title: "Movie 1",
    genre: "Action",
    views: 1500000,
    rating: 4.5,
    status: "Published",
    poster:
      "https://i.pinimg.com/736x/0c/5a/c1/0c5ac18145a584c7d8fc080b9419ff44.jpg",
  },
  {
    title: "Movie 2",
    genre: "Comedy",
    views: 1200000,
    rating: 4.0,
    status: "Draft",
    poster: "https://via.placeholder.com/150",
  },
  {
    title: "Movie 3",
    genre: "Drama",
    views: 1800000,
    rating: 4.8,
    status: "Published",
    poster: "https://via.placeholder.com/150",
  },
  {
    title: "Movie 4",
    genre: "Sci-Fi",
    views: 1300000,
    rating: 4.3,
    status: "Archived",
    poster: "https://via.placeholder.com/150",
  },
];

const usersData = [
  {
    username: "User 1",
    subscription: "Premium",
    avatar: "https://via.placeholder.com/32",
  },
  {
    username: "User 2",
    subscription: "Basic",
    avatar: "https://via.placeholder.com/32",
  },
  {
    username: "User 3",
    subscription: "Free",
    avatar: "https://via.placeholder.com/32",
  },
  {
    username: "User 4",
    subscription: "Premium",
    avatar: "https://via.placeholder.com/32",
  },
];

// Helper Functions
function changeTab(tabName) {
  // Hide all tabs
  tabContents.forEach((tab) => tab.classList.remove("active"));

  // Show the selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Highlight the active nav item
  navItems.forEach((item) => item.classList.remove("active"));
  const activeNavItem = Array.from(navItems).find(
    (item) => item.getAttribute("data-tab") === tabName
  );
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
}

function renderMoviesTable(movies) {
  moviesTableBody.innerHTML = "";
  movies.forEach((movie) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td colspan="2"><img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster"></td>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.views}</td>
            <td>${movie.rating}</td>
            <td>${movie.status}</td>
            <td><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button></td>
        `;
    moviesTableBody.appendChild(row);
  });
}

function renderTrendingMovies() {
  trendingMoviesList.innerHTML = "";
  moviesData.slice(0, 5).forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");
    movieItem.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
            <span>Views: ${movie.views}</span>
        `;
    trendingMoviesList.appendChild(movieItem);
  });
}

function renderRecentUsers() {
  recentUsersList.innerHTML = "";
  usersData.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");
    userItem.innerHTML = `
            <img src="${user.avatar}" alt="${user.username} Avatar" class="user-avatar">
            <h3>${user.username}</h3>
            <p>Subscription: ${user.subscription}</p>
        `;
    recentUsersList.appendChild(userItem);
  });
}

function searchMovies(query) {
  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  renderMoviesTable(filteredMovies);
}

// Event Listeners
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const tabName = item.getAttribute("data-tab");
    changeTab(tabName);
  });
});

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  searchMovies(query);
});

// Initial Render
renderMoviesTable(moviesData);
renderTrendingMovies();
renderRecentUsers();

// Default Tab
changeTab("dashboard");
