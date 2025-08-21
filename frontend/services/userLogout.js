export function btclicked(token) {
  let url = "https://matemagica-api.vercel.app/api/logout";
  fetch(url, {
    method: "POST",
    headers: {
      authorization: token, // Passando o token simples no cabeçalho 'authorization'
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.ok)
    .then((data) => {
      exibirPopUpDeslogado();
      setTimeout((e)=>{
        window.location.href = "../../login/";
      }, 1200)
      localStorage.removeItem("token");
      
      return;
    })
    .catch((error) => console.log(error));
}

function exibirPopUpDeslogado() {
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
  modal.textContent = 'Deslogado com sucesso!';

  // Adicionando o modal ao corpo da página
  document.body.appendChild(modal);

  // Tornar o modal visível
  setTimeout(() => {
      modal.style.opacity = '1';
  }, 10);  // Adicionando um pequeno delay para a animação de transição

  // Remover o modal após 1 segundo (1000ms)
  setTimeout(() => {
      modal.style.opacity = '0';
      // Após a transição, removemos o modal do DOM
      setTimeout(() => {
          document.body.removeChild(modal);
      }, 500); // Tempo para a transição de opacidade
  }, 1000);
}
