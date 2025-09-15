window.onload = function() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ You must log in first!");
    window.location.href = "index.html";
    return;
  }

  // Allow only admin
  if (currentUser.role !== "admin") {
    alert("🚫 Access Denied! Only admin can view this page.");
    window.location.href = "dashboard.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.querySelector("#userTable tbody");

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    // Mask password initially
    const maskedPassword = "•".repeat(user.password.length);

    row.innerHTML = `
      <td>${user.email}</td>
      <td id="pwd-${index}">${maskedPassword}</td>
      <td><button onclick="togglePassword(${index}, '${user.password}')">👁</button></td>
    `;
    tbody.appendChild(row);
  });
};

function togglePassword(index, realPassword) {
  const pwdCell = document.getElementById(`pwd-${index}`);
  if (pwdCell.textContent.includes("•")) {
    pwdCell.textContent = realPassword; // Show actual password
  } else {
    pwdCell.textContent = "•".repeat(realPassword.length); // Mask again
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}
