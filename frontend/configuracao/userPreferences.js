import { getData } from "../services/userSession.js";

let dados = await getData();
const nickname = document.getElementById("username");
let fotoperfil = document.getElementById("fotoperfil");
let nivel = document.querySelector(".span-perfil");
let fotoIndex = localStorage.getItem("foto");
if (!fotoIndex) {
  fotoIndex = 6;
}

fotoperfil.src = "../images/carinhas/" + fotoIndex + ".png";
nickname.innerText = dados.username;
nivel.innerText = "Nível " + dados.level;
nickname.innerHTML += nivel.outerHTML;
