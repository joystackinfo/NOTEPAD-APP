// Login Script
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }) //connect the frontend and backend
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login");
    }
  });
});