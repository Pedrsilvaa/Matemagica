const identity = document.getElementById("email");
const pass = document.getElementById("senha");
const bt = document.getElementById("button-purple");
const txt = document.getElementById("aviso");
let ok;

function btclicked() {
  if (!identity.value) {
    txt.innerText = "Insira um email valido";
    return;
  }
  if (!pass.value) {
    txt.innerText = "Insira uma senha valida";
    return;
  }
  logtry(identity.value, pass.value);
}

function logtry(id, pass) {
  let url = "https://matemagica-api.vercel.app/api/login";
  let corpo = {
    email: id,
    password: pass,
  };
  let init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  };
  fetch(url, init)
    .then((e) => e)
    .then(function (obj) {
      ok = obj.ok;
      return obj.json();
    })
    .then((jon) => {
      if (!ok) {
        txt.innerText = 'Email ou senha incorretos';
        return;
      }
      localStorage.setItem("token", jon.token);
      localStorage.setItem("nosound", "true");
      window.location.href = "../modo-casa/menu/";
    })
    .catch((error) => alert(error));
}

bt.addEventListener("click", function (e) {
  e.preventDefault();
  btclicked();
});
