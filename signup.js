const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signupError");

signupForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) {
    signupError.textContent = "❌ Passwords do not match!";
    signupError.style.display = "block";
    return;
  }

  // Get existing users from localStorage or empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    signupError.textContent = "⚠️ Email already registered!";
    signupError.style.display = "block";
    return;
  }

  // Add new user
  users.push({ email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Signup successful! You can now login.");
  window.location.href = "index.html"; // Redirect to login
});
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}
