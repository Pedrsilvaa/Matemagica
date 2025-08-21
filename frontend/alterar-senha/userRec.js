import { sendRecuperationCode } from "../services/userUpdate.js";

const email = document.getElementById("email");
const submit = document.getElementById("btn-purple");
const aviso = document.getElementById("aviso");

submit.addEventListener("click", async function (e) {
  e.preventDefault();
  if (!email.value) {
    aviso.innerText = "Campo email está vazio";
    return;
  }
  try {
    document.body.classList.add("loading");
    const res = await sendRecuperationCode(email.value);
    if (res.ok) {
      localStorage.setItem("emailrec", email.value);
      window.location.href = "../alterar-codigo";
      return;
    }
    const jsonResponse = await res.json();
    aviso.innerText = jsonResponse.message;
    document.body.classList.remove("loading");
  } catch (error) {
    alert("Erro de conexão, tente novamente mais tarde");
    window.location.href = "../login";
  }
});
