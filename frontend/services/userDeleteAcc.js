let ok;
const bt = document.getElementById("btn-red");
let certeza;

bt.addEventListener("click", function (e) {
  e.preventDefault();
  btclicked();
});

function btclicked() {
  confirmarApagarConta();
}

function deltry() {
  const token = localStorage.getItem("token");
  let url = "https://matemagica-api.vercel.app/api/user";
  let init = {
    method: "DELETE",
    headers: { authorization: token },
  };
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
      window.location.href = "../../cadastro/";
    })
    .catch((error) => alert("Deu erro de conexão chapinha" + error));
}


function confirmarApagarConta() {
  // Criação do modal (HTML)
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '9999';

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#fff';
  modalContent.style.padding = '30px';
  modalContent.style.borderRadius = '10px';
  modalContent.style.textAlign = 'center';
  modalContent.style.maxWidth = '400px';
  modalContent.style.width = '100%';
  modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  
  const title = document.createElement('h2');
  title.textContent = 'Tem certeza que deseja apagar sua conta?';
  title.style.color = '#333';
  
  const message = document.createElement('p');
  message.textContent = 'Esta ação não pode ser desfeita.';
  message.style.color = '#666';

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.gap = '20px';
  
  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'Sim, apagar conta';
  confirmBtn.style.backgroundColor = 'red';
  confirmBtn.style.color = 'white';
  confirmBtn.style.border = 'none';
  confirmBtn.style.padding = '10px 20px';
  confirmBtn.style.borderRadius = '5px';
  confirmBtn.style.cursor = 'pointer';
  confirmBtn.style.transition = 'background-color 0.3s';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancelar';
  cancelBtn.style.backgroundColor = '#95a5a6';
  cancelBtn.style.color = 'white';
  cancelBtn.style.border = 'none';
  cancelBtn.style.padding = '10px 20px';
  cancelBtn.style.borderRadius = '5px';
  cancelBtn.style.cursor = 'pointer';
  cancelBtn.style.transition = 'background-color 0.3s';
  
  // Adicionando eventos aos botões
  confirmBtn.addEventListener('click', function() {
      // Fecha o modal
      document.body.removeChild(modal);
      // Retorna true (ou chama a lógica de apagar a conta)
      deltry();
      
  });
  
  cancelBtn.addEventListener('click', function() {
      // Fecha o modal
      document.body.removeChild(modal);
      // Retorna false
      return
  });

  // Adicionando os elementos ao modal
  buttonContainer.appendChild(confirmBtn);
  buttonContainer.appendChild(cancelBtn);
  modalContent.appendChild(title);
  modalContent.appendChild(message);
  modalContent.appendChild(buttonContainer);
  modal.appendChild(modalContent);

  // Adicionando o modal à página
  document.body.appendChild(modal);
}
