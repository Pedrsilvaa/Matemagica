import { receiveRecuperationCode } from "../services/userUpdate.js";
const codigo = document.getElementById("codigo");
const newPassword = document.getElementById("senha");
const newPasswordConfirm = document.getElementById("confsenha");
const submit = document.getElementById("btn-purple");
const legenda = document.getElementById("legenda");
const email = localStorage.getItem("emailrec");
const aviso = document.getElementById("aviso");

if (!email) {
  alert("Perda de sessão, tente novamente");
  window.location.href = "../login/";
}
legenda.innerText += " " + email;

submit.addEventListener("click", async function (e) {
  let senhanova = newPassword.value;
  let code = parseInt(codigo.value);
  e.preventDefault();
  if (!codigo.value) {
    aviso.innerText = "Insira um código valido";
    return;
  }
  if (newPassword.value != newPasswordConfirm.value) {
    aviso.innerText = "As senhas não conferem";
  }
  if (!newPassword.value || newPassword.value.length < 6) {
    aviso.innerText = "Insira uma nova senha valida";
    return;
  }
  try {
    const responseCodeSend = await receiveRecuperationCode(
      email,
      senhanova,
      code
    );
    const message = await responseCodeSend.json();
    if (responseCodeSend.ok) {
      localStorage.removeItem("emailrec");
      alteradoComSucesso(message.message)
      return;
    }
    aviso.innerText = message.message;
  } catch (error) {
    alert("Perda de conexão, tente novamente");
    window.location.href = "../login/";
  }
});

function alteradoComSucesso(message) {
  // Criação do modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = '#2ecc71';
  modal.style.color = 'white';
  modal.style.padding = '20px 40px';
  modal.style.borderRadius = '10px';
  modal.style.fontSize = '16px';
  modal.style.textAlign = 'center';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  modal.style.zIndex = '9999';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.5s ease';

  // Mensagem do pop-up
  modal.textContent = message;

  // Adicionando o modal ao corpo da página
  document.body.appendChild(modal);

  // Tornar o modal visível
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10); // Adicionando um pequeno delay para a animação de transição

  // Remover o modal após 1 segundo (1000ms)
  setTimeout(() => {
    modal.style.opacity = '0';
    // Após a transição, removemos o modal do DOM
    setTimeout(() => {
      document.body.removeChild(modal);
      window.location.href = "../login/";
    }, 1000); // Tempo para a transição de opacidade
  }, 1200);
}