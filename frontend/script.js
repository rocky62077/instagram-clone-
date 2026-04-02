async function signup() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Signup successful");
    window.location.href = "login.html";
  } else {
    alert("Error in signup");
  }
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Login successful");

    // Save user locally
    localStorage.setItem("user", username);

    window.location.href = "feed.html";
  } else {
    alert("Invalid credentials");
  }
}

// Dummy posts (for UI testing)
async function loadPosts() {
  const res = await fetch("http://localhost:5000/posts");
  const posts = await res.json();

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((post) => {
    feed.innerHTML += `
      <div class="post">
        <h4>${post.username}</h4>
        <img src="${post.image}">
        <p>${post.caption}</p>
        <button>❤️ ${post.likes}</button>
      </div>
    `;
  });
}
async function addPost() {
  const image = document.getElementById("image").value;
  const caption = document.getElementById("caption").value;

  const username = localStorage.getItem("user");

  const res = await fetch("http://localhost:5000/addPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, image, caption }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Post added");
    loadPosts();
  }
}
