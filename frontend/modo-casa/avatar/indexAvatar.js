import { getData } from "../../services/userSession.js";

const dados = await getData();
const carinhas = document.getElementById("carinhas");
const carinhas1 = document.getElementById("carinhas1");
const pronto = document.getElementById("selectFoto");
const nickname = document.getElementById("username");
let nivel = document.querySelector(".span-perfil");
let fotoperfil = document.getElementById("fotoperfil");
let avatar = 6;

let fotoIndex = localStorage.getItem("foto");
if (!fotoIndex) {
  fotoIndex = 6;
}
fotoperfil.src = "../../images/carinhas/" + fotoIndex + ".png";
nickname.innerText = dados.username;
nivel.innerText = "Nível " + dados.level;
nickname.innerHTML += nivel.outerHTML;

carinhas.addEventListener("click", (e) => {
  if (!e.target.className) {
    return;
  }
  avatar = e.target.className;
  let temp = document.querySelector(".contorno");
  if (!temp) {
    e.target.classList.add("contorno");
    return;
  }
  temp.classList.remove("contorno");
  e.target.classList.add("contorno");
});
carinhas1.addEventListener("click", (e) => {
  if (!e.target.className) {
    return;
  }
  avatar = e.target.className;
  let temp = document.querySelector(".contorno");
  if (!temp) {
    e.target.classList.add("contorno");
    return;
  }
  temp.classList.remove("contorno");
  e.target.classList.add("contorno");
});

pronto.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("foto", avatar);
  Popup();
  setTimeout((e) => {
    window.location.href = "../perfil/";
  }, 1000);
});

function Popup() {
  const popup = document.createElement("div");
  popup.className = "popup1";
  popup.innerHTML = `
      <div class="popup-content1">
          <h2>Avatar salvo com sucesso</h2>
      </div>
  `;

  // Adiciona o pop-up ao corpo do documento
  document.body.appendChild(popup);

  // Adiciona o estilo do pop-up
  const style = document.createElement("style");
  style.innerHTML = `
      .popup1 {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
      }
      .popup-content1 {
          background-color: white;
          padding: 5vh 2vw;
          border-radius: 8px;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
      }
      #continue-button {
          margin-top: 10px;
          padding: 12px 35px;
          background-color: #89389e;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-size: 1rem
      }
      #retry-button:hover {
          background-color: #bc4ed8;
      }
  `;
  document.head.appendChild(style);
  // Remove o pop-up
  setTimeout(removePopup, 900);
}

function removePopup() {
  document.body.removeChild(popup);
}
