import User from "../services/userSession.js";

class Register extends User {
  constructor(name, username, datebirth, email, password) {
    super(name, username, datebirth, email);
    this.password = password;
  }
}
//
Register.prototype.regtry = function () {
  let url = "https://matemagica-api.vercel.app/api/register";
  let corpo = {
    name: this.name,
    username: this.username,
    date_birth: this.datebirth,
    email: this.email,
    password: this.password,
  };
  let init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  };
  console.log(init);
  fetch(url, init)
    .then(function (e) {
      return e;
    })
    .then((response) => {
      ok = response.ok;
      return response.json();
    })
    .then((data) => {
      if (!ok) {
        txt.innerText = data.message;
        return;
      }
      window.location.href = "../cad-sucesso/";
    })
    .catch((error) => alert("Deu erro de conexão chapinha" + error));
};

let ok;
const nome = document.getElementById("nome");
const username = document.getElementById("username");
const datanasc = document.getElementById("datanasc");
const email = document.getElementById("email");
const password = document.getElementById("senha");
const confpass = document.getElementById("confsenha");
const bt = document.getElementById("button-purple");
const txt = document.getElementById("aviso");

function btclicked() {
  if (!nome.value) {
    txt.innerText = "Insira um nome";
    return;
  }
  if (!username.value) {
    txt.innerText = "Insira um nome de usuario";
    return;
  }
  if (!datanasc.value) {
    txt.innerText = "Insira uma data de nascimento";
    return;
  }
  if(minimumAge(datanasc.value)){
    txt.innerText = "Para acessar matemágica é necessário ter mais de 5 anos";
    return
  }
  if (!email.value) {
    txt.innerText = "Insira um email";
    return;
  }
  if (!password.value) {
    txt.innerText = "Insira uma senha valida";
    return;
  }
  if (password.value != confpass.value) {
    txt.innerText = "Senhas não conferem, verifique e tente novamente";
    return;
  }
  if (confpass.value.length <= 6) {
    txt.innerText = "Senha precisa ter mais de 6 caracteres";
    return;
  }
  let user = new Register(
    nome.value,
    username.value,
    datanasc.value,
    email.value,
    password.value
  );
  user.regtry();
}

bt.addEventListener("click", function (e) {
  e.preventDefault();
  btclicked();
});

function minimumAge(dataNascimento) {
  // Obtém a data atual
  const hoje = new Date();
  
  // Converte a data de nascimento para um objeto Date
  const dataNasc = new Date(dataNascimento);
  
  // Calcula a diferença de anos entre a data de nascimento e a data atual
  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  
  // Ajusta a idade caso ainda não tenha feito aniversário este ano
  const mesAtual = hoje.getMonth();
  const mesNascimento = dataNasc.getMonth();
  const diaAtual = hoje.getDate();
  const diaNascimento = dataNasc.getDate();

  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
    idade--;
  }
  
  // Retorna true se a idade for menor que 5 anos, caso contrário retorna false
  return idade < 5;
}


