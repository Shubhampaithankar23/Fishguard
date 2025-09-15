const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check for admin login
  if (email === "admin@test.com" && password === "admin123") {
    alert("👑 Admin Login Successful!");
    localStorage.setItem("currentUser", JSON.stringify({ email: email, role: "admin" }));
    window.location.href = "admin.html"; // Go directly to Admin Panel
    return;
  }

  // Check for normal user
  const validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    alert("✅ Login Successful!");
    localStorage.setItem("currentUser", JSON.stringify({ email: validUser.email, role: "user" }));
    window.location.href = "dashboard.html";
  } else {
    errorMsg.style.display = "block";
  }
});
function togglePassword() {
  const pwdField = document.getElementById("password");
  if (pwdField.type === "password") {
    pwdField.type = "text";
  } else {
    pwdField.type = "password";
  }
}

// Remove or comment out this block:
/*
const card = document.querySelector('.login-3d-card');
if(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = "0 16px 40px 0 rgba(31,38,135,0.30)";
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "";
  });
}
*/
