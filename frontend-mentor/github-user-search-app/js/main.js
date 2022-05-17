/**
 * On page load, fetch and display octocat informations
 */
window.onload = () => {
  fetchUser("octocat");
};

/**
 * Handle form submit
 */
const form = document.querySelector("#form__user");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userInput = document.querySelector("#username").value;
  const username = userInput.split(" ").join("");

  fetchUser(username);
});

/**
 * Fetch provided user informations
 */
const fetchUser = async (username) => {
  await fetch(`https://api.github.com/users/${username}`).then(
    async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        document.querySelector(".form__error").classList.remove("active");
        updateInfos(data);
      } else if (response.status === 404) {
        document.querySelector(".form__error").classList.add("active");
      }
    }
  );
};

/**
 * Update html content with fetched user data
 */
function updateInfos(data) {
  const userImg = document.querySelector("#user-img");
  const userName = document.querySelector("#user-name");
  const userUsername = document.querySelector("#user-username");
  const userJoinDate = document.querySelector("#user-joindate");
  const userBio = document.querySelector("#user-bio");
  const userRepos = document.querySelector("#user-repos");
  const userFollowers = document.querySelector("#user-followers");
  const userFollowing = document.querySelector("#user-following");
  const userLocation = document.querySelector("#user-location");
  const userWebsite = document.querySelector("#user-website");
  const userTwitter = document.querySelector("#user-twitter");
  const userCompany = document.querySelector("#user-company");

  const joinDate = new Date(data.created_at);
  const formattedDate = joinDate.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const withHttp = (url) =>
    !/^https?:\/\//i.test(url) ? `http://${url}` : url;
  const formattedBlog = withHttp(data.blog);

  userImg.src = data.avatar_url;
  userUsername.innerHTML = `@${data.login}`;
  userJoinDate.innerHTML = `Joined ${formattedDate}`;
  userRepos.innerHTML = data.public_repos;
  userFollowers.innerHTML = data.followers;
  userFollowing.innerHTML = data.following;

  if (data.name) {
    userName.innerHTML = data.name;
  } else {
    userName.innerHTML = data.login;
  }

  if (data.bio) {
    userBio.innerHTML = data.bio;
    userBio.classList.remove("unavailable");
  } else {
    userBio.innerHTML = "This profile has no bio.";
    userBio.classList.add("unavailable");
  }

  if (data.location) {
    userLocation.innerHTML = data.location;
    userLocation.parentElement.classList.remove("unavailable");
  } else {
    userLocation.innerHTML = "Not Available";
    userLocation.parentElement.classList.add("unavailable");
  }

  if (data.blog) {
    userWebsite.innerHTML = data.blog;
    userWebsite.href = formattedBlog;
    userWebsite.parentElement.classList.remove("unavailable");
  } else {
    userWebsite.innerHTML = "Not Available";
    userWebsite.parentElement.classList.add("unavailable");
    userWebsite.removeAttribute("href");
  }

  if (data.twitter_username) {
    userTwitter.innerHTML = `@${data.twitter_username}`;
    userTwitter.href = `https://twitter.com/${data.twitter_username}`;
    userTwitter.parentElement.classList.remove("unavailable");
  } else {
    userTwitter.innerHTML = "Not Available";
    userTwitter.parentElement.classList.add("unavailable");
    userTwitter.removeAttribute("href");
  }

  if (data.company) {
    userCompany.innerHTML = data.company;
    userCompany.parentElement.classList.remove("unavailable");
  } else {
    userCompany.innerHTML = "Not Available";
    userCompany.parentElement.classList.add("unavailable");
  }
}

/**
 * Dark mode
 */
const themeBtn = document.querySelector(".btn--theme");
// Check if theme exists in localStorage or is set as user preference
if (
  localStorage.getItem("theme") === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  themeBtn.innerHTML = `Light <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>`;
} else {
  document.documentElement.classList.remove("dark");
  themeBtn.innerHTML = `Dark <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill-rule="nonzero"/></svg>`;
}
// On theme button click, switch theme
themeBtn.addEventListener("click", function (e) {
  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    themeBtn.innerHTML = `Dark <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill-rule="nonzero"/></svg>`;
  } else {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    themeBtn.innerHTML = `Light <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>`;
  }
});
