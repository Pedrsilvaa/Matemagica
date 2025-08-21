import { getData } from "../../services/userSession.js";
import { btclicked } from "../../services/userLogout.js";
//comentario pra deploy
const token = localStorage.getItem("token");
let data = await getData();
let username = document.getElementById("nickname");
let nivel = document.getElementById("userlevel");
let btsair = document.getElementById("logout");
let fotoperfil = document.getElementById("fotoperfil");
let fotos = document.querySelectorAll(".img");

console.log(data);
username.innerText = data.username;
nivel.innerText = "Nível " + data.level;
username.innerHTML += nivel.outerHTML;

let fotoIndex = localStorage.getItem("foto");
if (!fotoIndex) {
  fotoIndex = 6;
}

fotoperfil.src = "../../images/carinhas/" + fotoIndex + ".png";

btsair.addEventListener("click", function (e) {
  e.preventDefault();
  btclicked(token);
});

if (data.level < 2) {
  document.getElementById("slide2").classList.add("bloqueado");
}
if (data.level < 3) {
  document.getElementById("slide3").classList.add("bloqueado");
}
if (data.level < 4) {
  document.getElementById("slide4").classList.add("bloqueado");
}
if (data.level < 5) {
  document.getElementById("slide5").classList.add("bloqueado");
}
if (data.level < 6) {
  document.getElementById("slide6").classList.add("bloqueado");
}

if (data.level >= 2) {
  fotos[0].src = "../../images/correto 1.png";
}
if (data.level >= 3) {
  fotos[1].src = "../../images/correto 1.png";
}
if (data.level >= 4) {
  fotos[2].src = "../../images/correto 1.png";
}
if (data.level >= 5) {
  fotos[3].src = "../../images/correto 1.png";
}
if (data.level >= 6) {
  fotos[4].src = "../../images/correto 1.png";
}
if (data.level >= 7) {
  fotos[5].src = "../../images/correto 1.png";
}
