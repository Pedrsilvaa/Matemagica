import { getData } from "../../../services/userSession.js";
import { stage4, playGame, audio} from "./commonStructure.js";
// const dataUser = await getData();
// console.log(dataUser)

class User {
    constructor(lifes, progress, gameIndex, pt, ans){
        this.life = lifes;
        this.stage = progress;
        this.gameIndex = gameIndex;
        this.playerTime = pt;
        this.answers = ans;
    }
}
//iniciar sessão usuario
let userSession = new User(5,10,1,0,0);
let bncc = 'EF03MA01';
audio();
playGame();

//stats user
let cronometro = [0,0];
setInterval(countTimer, 1000);
function countTimer(){
  cronometro[1]++;
  if(cronometro[1]==60){
    cronometro[1]=0;
    cronometro[0]++;
  }
  
  if(cronometro[1].toString().length==1 && cronometro[0].toString().length==1){
    userSession.playerTime = '0'+cronometro[0]+':0'+cronometro[1];
    console.log('0'+cronometro[0]+':0'+cronometro[1]);
    return
  }
  if(cronometro[1].toString().length==1){
    userSession.playerTime = +cronometro[0]+':0'+cronometro[1];
    console.log(cronometro[0]+':0'+cronometro[1]); 
    return
  }
  if (cronometro[0].toString().length == 1) {
    userSession.playerTime = '0'+cronometro[0]+':'+cronometro[1];
    console.log('0'+cronometro[0] + ':' + cronometro[1]);
      return
  }
  userSession.playerTime = '0'+cronometro[0]+':0'+cronometro[1];
  console.log(cronometro[0]+':'+cronometro[1]);
}


// captura dos elementos html
const mainInit = document.querySelector("main").outerHTML;
let res = document.querySelector("#response");    
let button = document.querySelector(".btn-purple");
let divabaixo = document.querySelector(".md3");
let main = document.querySelector("main");
let header = document.querySelector("header");
let levelProgress = document.querySelector(".progress-bar-fill");
let vidas = document.querySelector("#vidas");
vidas.innerText = userSession.life;
levelProgress.style.width = userSession.stage+'%';

//quando usuario clica para verificar no stage 1
button.addEventListener("click", (e)=>{
bclick();
})

//verificar respostas do usuario
function verifyAnswer(response, game){
    if(!response){
        return false
    }
    if(isNaN(response)){
        return false
    }
    switch(game){
        case 1:
            if(response=='3457'){
                return true
            }
            return false
        case 2:
            if(response=='3546'){
                return true
            }
            return false
        case 3:
            const dentroNew = document.querySelector(".internal-area").childNodes;
            if(dentroNew[0].id == 1 && dentroNew[1].id == 3 && dentroNew[2].id == 2 ){
                return true
            }
            return false
            default:
                 console.log('Index'+game)
            break;
    }

}

// mudar tema e chamar a funcao de mudar o jogo ao acertar
function changeTheme(res){
    let button = document.querySelector(".btn-purple");
    let divabaixo = document.querySelector(".md3");
    if(!res){
    button.setAttribute('disabled', '');
    divabaixo.style.backgroundColor = "#FFCACA"
    button.classList.remove("btn-purple");
    button.classList.add("wrong");
    button.innerText = "resposta errada";
    levelProgress.style.backgroundColor = '#FC6886';
    header.style.backgroundColor = '#FFF4F4';
    main.style.backgroundColor = '#FFF4F4';
    main.style.color = '#FF5A7B';
    setTimeout((e)=>{
        button.removeAttribute('disabled');
        divabaixo.style.backgroundColor = "white"
        button.classList.remove("wrong");
        button.innerText = "verificar";
        button.classList.add("btn-purple");
        levelProgress.style.backgroundColor = 'var(--hard-purple)';
        header.style.backgroundColor = 'white';
        main.style.backgroundColor = 'white';
        main.style.color = 'black';
    }, 1500);
    return
    }
    button.setAttribute('disabled', '');
    divabaixo.style.backgroundColor = '#C7FFCB'
    button.classList.remove("btn-purple");
    button.classList.add("right");
    button.innerText = "resposta certa";

    setTimeout((e)=>{
        button.removeAttribute('disabled');
        divabaixo.style.backgroundColor = 'white';
        button.classList.remove("right");
        button.innerText = "verificar";
        button.classList.add("btn-purple");
        changeGame(userSession.gameIndex);
    }, 2100);
    console.log('acertou');
}

//mudança de fase
function changeGame(index) {
    switch(index) {
        case 2:
            main.innerHTML = stage2(); // Atualiza o conteúdo do main
            // Adiciona o ouvinte de evento após atualizar o DOM
            addEventListeners();
            const options = document.querySelectorAll(".card-game");
            const values = [2482, 3546, 1897, 3501]; // Valores de res
            options.forEach((option, idx) => {
                option.addEventListener("click", (e) => {
                    res.value = values[idx]; // Atribui o valor correspondente
                    let selecionado = document.querySelector('.select');                  
                    if (!selecionado) {
                        option.classList.add("select");
                        return;
                    }
                    selecionado.classList.remove("select");
                    option.classList.add("select");
                });
            });
            break;

        case 3:
            main.innerHTML = stage3();
            addEventListeners();
            addGameListeners();
            break;
        case 4:
        stage4(userSession, bncc, 1);
        break;
        // Outros casos, se necessário
    }
}

// Função para adicionar ouvintes de eventos
function addEventListeners() {
    let button = document.querySelector(".btn-purple");
    button.addEventListener("click", (e) => {
        if (userSession.gameIndex === 3) {
            const internalArea = document.querySelector(".internal-area");
            if (internalArea.childNodes.length < 3) {
                showOrganizePopup();
                return; // Impede o restante da lógica se o popup for exibido
            }
        }
        bclick();
    });
    
}
// Função para exibir o pop-up
function showGameOverPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Game Over</h2>
            <p>Você perdeu todas as vidas. Tente novamente!</p>
            <button id="retry-button">Tentar Novamente</button>
        </div>
    `;
    
    // Adiciona o pop-up ao corpo do documento
    document.body.appendChild(popup);

    // Adiciona o estilo do pop-up
    const style = document.createElement('style');
    style.innerHTML = `
        .popup {
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
        .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        #retry-button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #89389e;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #retry-button:hover {
            background-color: #bc4ed8;
        }
    `;
    document.head.appendChild(style);

    // Adiciona o evento de clique no botão de tentar novamente
    document.getElementById('retry-button').addEventListener('click', () => {
        // Remove o pop-up
        document.body.removeChild(popup);
        // Reinicia o jogo
        resetGame();
    });
}

// Função para reiniciar o jogo
function resetGame() {
    // userSession.life = 5; // Reseta a vida
    // userSession.stage = 10; // Reseta o progresso
    // userSession.gameIndex = 1; // Reseta o índice do jogo
    // vidas.innerText = userSession.life;
    // levelProgress.style.width = userSession.stage + '%';
    // main.innerHTML = mainInit;
    // changeTheme(false);
    // res = document.querySelector("#response");
    // setTimeout((e)=>{
    //     addEventListeners();
    // }, 1500);
    window.location.reload();
 // Volta ao estágio inicial (defina stage1 para seu estágio inicial)
}
// Atualiza a função bclick
function bclick() {
    let resposta = res.value;
    console.log(resposta);
    let verify = verifyAnswer(resposta, userSession.gameIndex);
    console.log(verify);
    changeTheme(verify);
    if (verify) {
        userSession.gameIndex++;
        userSession.stage += 30;
        console.log(userSession.stage);
        levelProgress.style.width = userSession.stage + '%';
        return;
    }

    // Errou, desconta vida
    userSession.life--;
    vidas.innerText = userSession.life;
    userSession.answers++;

    if(userSession.life === 0) {
        showGameOverPopup(); // Exibe o pop-up quando as vidas acabarem
    }
}

// Função para mostrar o popup de organização
function showOrganizePopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Organização Necessária</h2>
            <p>Por favor, organize todas as caixas na área interna antes de verificar!<br/>
            Dica: Clique nas caixas para adiciona-las a organização
            </p>
            <button id="close-popup">Fechar</button>
        </div>
    `;

    // Adiciona o pop-up ao corpo do documento
    document.body.appendChild(popup);

    // Adiciona o estilo do pop-up
    const style = document.createElement('style');
    style.innerHTML = `
        .popup {
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
        .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        #close-popup {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #89389e;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #close-popup:hover {
            background-color: #bc4ed8;
        }
    `;
    document.head.appendChild(style);

    // Adiciona o evento de clique no botão de fechar
    document.getElementById('close-popup').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// O resto do seu código permanece inalterado

// stage 2:
function stage2() {
    return `
        <link rel="stylesheet" href="../stylem2.css">
        <div class="md1">
  <h3>O Bob está com fome!</h3>
</div>
<div class="md2">
  <div class="boxenun">
    <img
      src="../../../images/minigames/hamster.png"
      alt="hamster"
    />
    <h3>Em qual tigela tem mais ração?</h3>

  </div>
  <div class="boxresp">
    <div class="card-block">
      <div class="card-game">

        <img src="../../../images/minigames/tigelaA.png" />
      </div>
      <div class="card-game">
        <img src="../../../images/minigames/tigelaB.png" />
      </div>
    </div>
    <div class="card-block">
      <div class="card-game">
     
        <img src="../../../images/minigames/tigelaC.png" />
      </div>
      <div class="card-game">
        <img src="../../../images/minigames/tigelaD.png" />
      </div>
    </div>
  </div>
</div>
<div class="md3">
  <button class="btn-purple">verificar</button>
</div>
    `;
}
// ... código anterior ...

// stage 3:
// Defina as funções globais aqui
function moveToInner(box) {
    const internalArea = document.querySelector(".internal-area");
    const externalArea = document.querySelector(".external-area");

    // Verificar se o box já está na área interna
    if (internalArea.contains(box)) {
        // Se já está, move para a área externa
        externalArea.appendChild(box);
    } else {
        // Caso contrário, move para a área interna
        internalArea.appendChild(box);
    }
}

function moveToExternal(event) {
    const box = event.target.closest(".card-game");
    if (box) {
        const externalArea = document.querySelector(".external-area");
        externalArea.appendChild(box);
    }
}

// stage 3:
function stage3() {
    return `
    <link rel="stylesheet" type="text/css" href="../stylem3.css" />
    <div class="md1">
        <h3>Ajude o fazendeiro Lobato a organizar suas caixas:</h3>
    </div>
    <div class="md2">
        <div class="boxenun">
            <img
                src="../../../images/minigames/harvest.png"
                style="transform: scaleX(-1)"
                alt="Fazendeira"
            />
            <h3>Organize-as de forma crescente para eu vender!</h3>
        </div>
        <div class="boxresp">
            <div class="internal-area"></div>
            <div class="external-area">
                <div id="1" class="card-game">
                    <img src="../../../images/minigames/harvest1.png" />
                </div>
                <div id="2" class="card-game">
                    <img src="../../../images/minigames/harvest2.png" />
                </div>
                <div id="3" class="card-game">
                    <img src="../../../images/minigames/harvest3.png" />
                </div>
            </div>
        </div>
    </div>
    <div class="md3">
        <button class="btn-purple">verificar</button>
    </div>
    `;
}

// Quando o jogo for iniciado, adicione os event listeners
function addGameListeners() {
    const internal = document.querySelector(".internal-area");
    internal.addEventListener("click", (e)=> moveToExternal(e));
    const cards = document.querySelectorAll(".card-game");
    cards.forEach(card => {
        card.addEventListener("click", (e) => {moveToInner(card)
    });
    });
}
