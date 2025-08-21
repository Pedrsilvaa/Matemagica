const token = localStorage.getItem("token");
let url = "https://matemagica-api.vercel.app/api/user";

let ok;

fetch(url, {
  method: "GET",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
})
  .then((response) => response)
  .then((data) => {
    return data.ok;
  })
  .then((jailson) => {
    if (!jailson) {
      window.location.href = "../../login/";
      return;
    }
  })
  .catch((error) => (window.location.href = "../../login/"));
