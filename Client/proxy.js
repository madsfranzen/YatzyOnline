const navbarright = document.getElementsByClassName("navbar-right")[0];

const backend = "https://yatzyonline.onrender.com/";

async function checkLogin() {
  const response = await fetch(backend + "/auth/login", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  if (response.status != 200) {
    return false;
  }
  const player = await response.json();
  return player;
}

if (!checkLogin()) {
  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  navbarright.appendChild(loginButton);
} else{
	const userName = document.createElement("p")
	// userName.textContent = 
}
