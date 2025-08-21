class User {
  constructor(name, username, datebirth, email, vidas, nivel, modo, avatar) {
    this.name = name;
    this.username = username;
    this.datebirth = datebirth;
    this.email = email;
    this.vidas = vidas;
    this.nivel = nivel;
    this.mode = modo;
    this.avatar = avatar;
  }
}
export function getData() {
  let ok;
  const token = localStorage.getItem("token");
  let url = "https://matemagica-api.vercel.app/api/user";

  let data = fetch(url, {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response)
    .then((data) => {
      ok = data.ok;
      return data.json();
    })
    .then((dados) => {
      if (ok) {
        return dados;
      }
      return false;
    })
    .catch((error) => console.log("deu erro aqui" + error));

  return data;
}

export default User;
