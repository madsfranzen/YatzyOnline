const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function checkLogin() {
  const response = await fetch(BACKEND_URL + "/auth/login", {
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
