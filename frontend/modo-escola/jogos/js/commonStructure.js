import { getData } from "../../../services/userSession.js";
import {updateLevelUser} from "../../../services/userUpdate.js";
let dataUser = await getData();

//Comentario
export class User {
    constructor(lifes, progress, gameIndex, pt, ans, res){
        this.life = lifes;
        this.stage = progress;
        this.gameIndex = gameIndex;
        this.playerTime = pt;
        this.answers = ans;
        this.res = res;
    }
}
//la
export class Selects {
  constructor(numbers, units) {
    this.cardNumbers = numbers;
    this.cardUnits = units;
  }
}

export function Cronometro (userSession){
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
}

export function CapturaHTML(userSession){
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
    return [mainInit, res, button, divabaixo, main, header, levelProgress, vidas];
}

export function bclick(verifyAnswer, userSession, levelProgress, changeGame){
    let verify = verifyAnswer();
    changeTheme(verify, changeGame, userSession);
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

export function showGameOverPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup1';
    popup.innerHTML = `
        <div class="popup-content1">
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
    window.location.reload();
}

// mudar tema e chamar a funcao de mudar o jogo ao acertar
export function changeTheme(res, changeGame, userSession){
  const mainInit = document.querySelector("main").outerHTML;
  let button = document.querySelector(".btn-purple");
  let divabaixo = document.querySelector(".md3");
  let main = document.querySelector("main");
  let header = document.querySelector("header");
  let levelProgress = document.querySelector(".progress-bar-fill");
  let vidas = document.querySelector("#vidas");
  if(!res){
    button.disabled = true;
    divabaixo.style.backgroundColor = "#FFCACA"
    button.classList.remove("btn-purple");
    button.classList.add("wrong");
    button.innerText = "resposta errada";
    levelProgress.style.backgroundColor = '#FC6886';
    header.style.backgroundColor = '#FFF4F4';
    main.style.backgroundColor = '#FFF4F4';
    main.style.color = '#FF5A7B';
    setTimeout((e)=>{
        divabaixo.style.backgroundColor = "white"
        button.classList.remove("wrong");
        button.innerText = "verificar";
        button.classList.add("btn-purple");
        levelProgress.style.backgroundColor = 'var(--hard-purple)';
        header.style.backgroundColor = 'white';
        main.style.backgroundColor = 'white';
        main.style.color = 'black';
        button.disabled = false;
    }, 1600);
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



export function SelectM4(){

    document.querySelector("#numbers").addEventListener("click", function(e){

        if(e.target.classList[0] == "card-game"){
            let select = document.querySelector("#numbers").querySelector(".select")
            if(select){
                select.classList.remove("select");
            }
            e.target.classList.add("select");
        }
    });
    document.querySelector("#units").addEventListener("click", function(e){
    
        if(e.target.classList[0] == "card-game"){
            let select = document.querySelector("#units").querySelector(".select")
            if(select){
                select.classList.remove("select");
            }
            e.target.classList.add("select");
        }
    });
}
//

export function m2Listeners(user){
    const options = document.querySelectorAll(".card-game");
    const values = [1, 2, 3, 4]; // Valores de res
    options.forEach((option, idx) => {
        option.addEventListener("click", (e) => {
            user.res = values[idx]; // Atribui o valor correspondente
            let selecionado = document.querySelector('.select');                  
            if (!selecionado) {
                option.classList.add("select");
                return;
            }
            selecionado.classList.remove("select");
            option.classList.add("select");
        });
    });
}

export function stage4(userSession, bncc, fase){

    document.querySelector('html').innerHTML = `<head>
            <title>Matemágica</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Projeto Matemágica" />
            <meta name="author" content="StepMath" />
            
            <link rel="icon" type="image/x-icon" href="/frontend/images/logo menor.png" />
            <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
            
            <meta name="theme-color" content="#FBB448" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
            
            <link rel="stylesheet" type="text/css" href="../../../primary.css" />
            <link rel="stylesheet" type="text/css" href="../../../items.css" />
            <link rel="stylesheet" type="text/css" href="../paginaStyle.css" />
            
            <style>
                body {
                    position: relative;
                    overflow: hidden;
                    margin: 0;
                    font-family: 'Nunito', sans-serif;
                }
                
                .md1 {
                    text-align: center;
                    z-index: 1;
                    padding: 20px;
                }
                
                .hamster {
                    width: 100%;
                    max-width: 350px; /* Aumentando o tamanho máximo do hamster */
                    display: flex;
                    align-items: center;
                    justify-content: center; /* Centraliza o hamster */
                    margin: 0 auto; /* Centraliza horizontalmente */
                    position: relative;
                    animation: float 3s ease-in-out infinite;
                }
        
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
        
                .particle {
                    position: absolute;
                    width: 15px; /* Tamanho das partículas */
                    height: 15px;
                    background: rgb(238, 255, 0);
                    border-radius: 50%;
                    opacity: 0;
                    pointer-events: none;
                }
        
                @keyframes rise {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh);
                        opacity: 0;
                    }
                }
        
                /* Estilos responsivos */
                @media (max-width: 768px) {
                    .hamster img {
                        width: 75%; /* Imagem ocupa 75% da largura na versão móvel */
                    }
                }
                
                @media (min-width: 769px) {
                    .hamster img {
                        width: 60%; /* Imagem ocupa 60% da largura na versão desktop */
                    }
                }
            </style>
        </head>
        <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
        
        <body>
            <main>
                <div class="md1"> 
                    <h3 id="e1">Lição completada com sucesso!</h3>
                    <h4>Cada desafio é uma poção mágica para aprender e se divertir! 🧙‍♂️📐 Vamos lá, pequenos magos da matemática, vocês conseguem! 💪💫</h4>
                    <h4>Tempo: <span id="tempo">0:00</span></h4>
                    <h4>Taxa de acertos: <span id="acertos">0%</span></h4>
                    <h4>Você avançou para o nível <span id="next-level">2</span></h4>
                    <button id="finalbt" class="btn-purple">continuar</button>
                    <i style="background: #ffbf58; color: white; font-weight: bold; border-radius: 10px; padding: 10px"> Habilidade trabalhada da BNCC:
                      <span id="hab"> EF03MA01</span>
                    </i>
                </div>
                <div class="hamster">
                    <img src="../../../images/porquinho-da-india 1.png" alt="Hamster">
                </div>
            </main>
        
            <script>
                function createStar() {
                    const star = document.createElement('div');
                    star.className = 'particle';
                    document.body.appendChild(star);
                    
                    const x = Math.random() * window.innerWidth;
                    const duration = Math.random() * 2 + 1; // 1s to 3s
                    star.style.left = x + 'px';
                    star.style.top = '100%';
                    star.style.animation = "rise " + duration + "s ease forwards";

                    star.style.opacity = '1';
        
                    setTimeout(() => {
                        star.remove();
                    }, duration * 1000);
                }
        
                setInterval(createStar, 300); // Create a star every 300ms
            </script>
        </body>`
        document.querySelector('#hab').innerText = bncc;
        let porcentagem = (3/(3+userSession.answers))*100;
        document.getElementById('acertos').innerText = Math.floor(porcentagem)+'%'
        document.getElementById('tempo').innerText = userSession.playerTime;
        document.getElementById('next-level').innerText = fase+1;
        document.getElementById('finalbt').addEventListener('click', (e) => {
        if(dataUser == false){
            window.location.href = "../../../modo-escola/menu/"
            return
        }
        if(dataUser.level == (fase)){
            updateLevelUser().then();
        }    
        window.location.href = "../../menu/"
        }
        );
        console.log(dataUser);



}

export function audio(){
    // Criando o elemento <audio> para o áudio principal
    const savedPreference = localStorage.getItem("nosound");
    if (savedPreference === "true") {
      var audioElement = document.createElement('audio');
      audioElement.id = 'audio';
      audioElement.src = '../media/videoplayback.m4a';
      audioElement.loop = true;
      
      // Criando o elemento <audio> para o áudio de torcida
      var cheerElement = document.createElement('audio');
      cheerElement.id = 'cheer';
      cheerElement.src = '../media/torcendo.mp3';
      cheerElement.loop = true;
      
      // Adicionando os elementos <audio> ao <head> do documento
      document.head.appendChild(audioElement);
      document.head.appendChild(cheerElement);
    }

}

export 
function playGame() {
    const popup = document.createElement('div');
    popup.className = 'popup1';
    popup.innerHTML = `
        <div class="popup-content1">
            <button id="continue-button">Jogar</button>
          
        </div>
    `;
    
    // Adiciona o pop-up ao corpo do documento
    document.body.appendChild(popup);

    // Adiciona o estilo do pop-up
    const style = document.createElement('style');
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
            width: 50%;
            padding: 5vh 0;
            border-radius: 8px;
            text-align: center;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        #continue-button {
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            background-color: #89389e;
            font-weight: 700;
             font-size: clamp(1rem, -0.25rem + 4vw, 2rem);
             padding: clamp(6px, 2vw, 14px) clamp(12px, 4vw, 30px);
             color: #fff;
             border: none;
             width: 100% ;
             text-align: center;
             text-decoration: none;
              }
        #retry-button:hover {
            background-color: #bc4ed8;
        }
    `;
    document.head.appendChild(style);

    // Adiciona o evento de clique no botão de fechar o pop up
    document.getElementById('continue-button').addEventListener('click', () => {
        // Remove o pop-up
        const savedPreference = localStorage.getItem("nosound");
        if (savedPreference === "true") {
          let music = document.getElementById("audio");
          music.play();
        }
        
        document.body.removeChild(popup);
    });
}
