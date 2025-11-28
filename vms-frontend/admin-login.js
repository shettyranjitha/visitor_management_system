async function adminLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("message");

  msg.textContent = "";

  if (!email || !password) {
    msg.textContent = "Please enter Email & Password";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message || "Invalid login";
      return;
    }

   
    if (data.user.role !== "admin") {
      msg.textContent = "Access Denied — Not an Admin!";
      return;
    }

   
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminName", data.user.name);

    msg.style.color = "green";
    msg.textContent = "Login Successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 1000);

  } catch (err) {
    msg.textContent = "Server error";
  }
}
