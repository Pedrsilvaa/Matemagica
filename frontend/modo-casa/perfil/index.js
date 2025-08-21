import { getData } from "../../services/userSession.js";

const dados = await getData();
const nome = document.getElementById("nome");
const username = document.getElementById("usuario");
const email = document.getElementById("email");
const datanasc = document.getElementById("data-nascimento");
const nivel = document.getElementById("userlevel");
const barra = document.querySelector(".progress-bar-fill");

barra.style.width = (100 * dados.level) / 7 + "%";


nivel.innerText = "Nível " + dados.level;
email.value = dados.email;
nome.value = dados.name;
username.value = dados.username;
const data = dados.date_birth;

// Cria um objeto Date a partir da string
const dataObj = new Date(data);

// Extrai o dia, mês e ano
const dia = String(dataObj.getDate()).padStart(2, "0"); // Adiciona um zero à esquerda se necessário
const mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // Mês começa do 0, então adicionamos 1
const ano = dataObj.getFullYear();

// Formata a data no formato desejado
const dataFormatada = `${ano}-${mes}-${parseInt(dia)+1}`;
datanasc.value = dataFormatada;

// Puxa o índice da foto salvo no localStorage ou usa o valor padrão (6)
const fotoIndex = localStorage.getItem("foto") || 6;

// Atualiza a imagem de perfil
const fotoPerfilElement = document.getElementById("replace");
fotoPerfilElement.src = "../../images/carinhas/" + fotoIndex + ".png";
