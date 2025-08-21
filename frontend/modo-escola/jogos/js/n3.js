import { Cronometro, User, CapturaHTML, SelectM4, bclick, changeTheme, showGameOverPopup, Selects,
  m2Listeners, stage4, audio, playGame} from "./commonStructure.js";
import {Board} from "./board.js";


let stagem4 = new Selects([0], [0]);
let userSession = new User(5,10,1,0,0,0);
let bncc = 'EF03MA03'
Cronometro(userSession);
audio();
playGame();
Board();



//variaveis stage m4
let HtmlElements = CapturaHTML(userSession);
stagem4.cardNumbers = document.querySelector('#numbers').querySelectorAll(".card-game");
stagem4.cardUnits = document.querySelector('#units').querySelectorAll(".card-game");
let arrayAcertos = []
SelectM4();

//btnListener's
HtmlElements[2].addEventListener("click", (e) => {
  verifyStage1()
    if (userSession.life == 0) {
      showGameOverPopup();
    }
  
});
function st2listener(){
  arrayAcertos = [0,0,0];
  stagem4.cardNumbers = document.querySelector('#numbers').querySelectorAll(".card-game");
  stagem4.cardUnits = document.querySelector('#units').querySelectorAll(".card-game");
  SelectM4();
  let button = document.querySelector('.btn-purple')
  button.addEventListener("click", (e) => {
    verifyStage2()
    if (userSession.life == 0) {
      showGameOverPopup();
    }
  });
}
function st3listener(){
  arrayAcertos = [0,0,0];
  let button = document.querySelector('.btn-purple')
  button.addEventListener("click", (e) => {
    bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);
    if (userSession.life == 0) {
      showGameOverPopup();
    }
  });
}



//verificadores
  function verifyStage1(){
    if(!document.querySelector("#units").querySelector(".select") || !document.querySelector("#numbers").querySelector(".select")){
        m4SelectAlert();
        return
    }

    //verifica o primeiro card
    if(stagem4.cardNumbers[0].classList[1] == 'select'){
        let correspondente = stagem4.cardUnits[1];
        if(correspondente.classList[1] == 'select'){
            arrayAcertos[0] = 1;
            stagem4.cardNumbers[0].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[0].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[0].classList.remove("card-game");
            correspondente.classList.remove("card-game");
        }else{
          const selecionado = document.querySelector("#units").querySelector(".select");
          const num = stagem4.cardNumbers[0];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e)=>{
                num.classList.remove("wrong-answer");
                selecionado.classList.remove("wrong-answer");
            }, 1500)
        }
    }

    //verificar o segundo card
        if (stagem4.cardNumbers[1].classList[1] == 'select') {
          let correspondente = stagem4.cardUnits[3];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[1] = 1;
            stagem4.cardNumbers[1].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[1].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[1].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = stagem4.cardNumbers[1];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e) => {
              num.classList.remove("wrong-answer");
              selecionado.classList.remove("wrong-answer");
            }, 1200)
          }
        }
    
    //verifica o terceiro card
        if (stagem4.cardNumbers[2].classList[1] == 'select') {
          let correspondente = stagem4.cardUnits[2];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[2] = 1;
            stagem4.cardNumbers[2].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[2].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[2].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = stagem4.cardNumbers[2];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e) => {
              num.classList.remove("wrong-answer");
              selecionado.classList.remove("wrong-answer");
            }, 1200)
          }
        }
    
    //verifica o quarto card
        if (stagem4.cardNumbers[3].classList[1] == 'select') {
          let correspondente = stagem4.cardUnits[0];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[3] = 1;
            stagem4.cardNumbers[3].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[3].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[3].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = stagem4.cardNumbers[3];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e) => {
              num.classList.remove("wrong-answer");
              selecionado.classList.remove("wrong-answer");
            }, 1200)
          }
        }
        
        //verificar se ja acertou todos
        if(arrayAcertos[0] == 1 && arrayAcertos[1] == 1 && arrayAcertos[2] == 1 && arrayAcertos[3] == 1){
          bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);
        }
        
}

function verifyStage2(){
    if(!document.querySelector("#units").querySelector(".select") || !document.querySelector("#numbers").querySelector(".select")){
        m4SelectAlert();
        return
    }

    //verifica o primeiro card
    if(stagem4.cardNumbers[0].classList[1] == 'select'){
        let correspondente = stagem4.cardUnits[2];
        if(correspondente.classList[1] == 'select'){
            arrayAcertos[0] = 1;
            stagem4.cardNumbers[0].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[0].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[0].classList.remove("card-game");
            correspondente.classList.remove("card-game");
        }else{
          const selecionado = document.querySelector("#units").querySelector(".select");
          const num = stagem4.cardNumbers[0];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e)=>{
                num.classList.remove("wrong-answer");
                selecionado.classList.remove("wrong-answer");
            }, 1500)
        }
    }

    //verificar o segundo card
        if (stagem4.cardNumbers[1].classList[1] == 'select') {
          let correspondente = stagem4.cardUnits[1];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[1] = 1;
            stagem4.cardNumbers[1].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[1].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[1].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = stagem4.cardNumbers[1];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e) => {
              num.classList.remove("wrong-answer");
              selecionado.classList.remove("wrong-answer");
            }, 1200)
          }
        }
    
    //verifica o terceiro card
        if (stagem4.cardNumbers[2].classList[1] == 'select') {
          let correspondente = stagem4.cardUnits[3];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[2] = 1;
            stagem4.cardNumbers[2].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[2].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[2].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = stagem4.cardNumbers[2];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e) => {
              num.classList.remove("wrong-answer");
              selecionado.classList.remove("wrong-answer");
            }, 1200)
          }
        }
    
    //verifica o quarto card
        if (stagem4.cardNumbers[3].classList[1] == 'select') {
          let correspondente = stagem4.cardUnits[0];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[3] = 1;
            stagem4.cardNumbers[3].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            stagem4.cardNumbers[3].classList.remove("select");
            correspondente.classList.remove("select");
            stagem4.cardNumbers[3].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = stagem4.cardNumbers[3];
            num.classList.add("wrong-answer");
            selecionado.classList.add("wrong-answer");
            userSession.life--;
            userSession.answers++;
            HtmlElements[7].innerText = userSession.life;
            changeTheme(false);
            setTimeout((e) => {
              num.classList.remove("wrong-answer");
              selecionado.classList.remove("wrong-answer");
            }, 1200)
          }
        }
        
        //verificar se ja acertou todos
        if(arrayAcertos[0] == 1 && arrayAcertos[1] == 1 && arrayAcertos[2] == 1 && arrayAcertos[3] == 1){
          bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);
        }
        
}

function verifyAnswer() {
  console.log(userSession);
  let index = userSession.gameIndex;
  if (index == 1) {
    return true
  }
  if (index == 2) {
      return true
  }
  if (index == 3) {
  let res = parseInt(document.getElementById("response").value);
    if (res == 150) {
      return true
    }
    return false
  }

  return false
}

//mudar o jogo
function changeGame(index) {
  switch (index) {
    case 2:
      HtmlElements[4].innerHTML = stage2();
      Board();
      st2listener();
      break;
    case 3:
      userSession.res = 0;
      HtmlElements[4].innerHTML = stage3();
      Board();
      st3listener()
      break;
    case 4:
      stage4(userSession, bncc, 3);
          
      break;
    default:
      alert("mudou");
  }
}

//stage's
function stage2(){
  return ` <div class="md1">
          <!-- <h3>Frase motivadora</h3> -->
          <h3>Billy ainda precisa de sua genialidade!</h3>
        </div>
        <div class="md2">
          <div class="boxenun">
            <!-- <img
              src="../../../frontend/images/minigames/test_image.png"
              alt="test_image"
            /> -->
            <img id="openBtn"
              src="../../../images/minigames/ovelha1.png"
              alt="ovelha"
            />
            <!-- <h3>Enunciado da fase</h3> -->
            <h3>
              Me dá uma mãozinha com essas contas aqui? Ouvi dizer que o que está dentro dos parênteses é resolvido primeiro...
            </h3>
          </div>
          <div class="boxresp">
            <div id="numbers" class="card-adjust">
              <div class="card-box">
                <div class="card-game">
                  <!-- A -->
                  (8+3)×1
                </div>
                <div class="card-game">
                  <!-- B -->
                  4+(8-2)
                </div>
              </div>
              <div class="card-box">
                <div class="card-game">
                  <!-- C -->
                  6+(3×5)-4
                </div>
                <div class="card-game">
                  <!-- D -->
                  3×(0+4)
                </div>
              </div>
            </div>
            <div id="units" class="card-adjust">
              <div class="card-box">
                <div class="card-game">
                  <!-- a -->
                  12
                </div>
                <div class="card-game">
                  <!-- b -->
                  10
                </div>
              </div>
              <div class="card-box">
                <div class="card-game">
                  <!-- c -->
                  11
                </div>
                <div class="card-game">
                  <!-- d -->
                  17
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md3">
          <button class="btn-purple">verificar</button>
           <div id="popup" class="popup">
             <div class="popup-content">
               
               <button id="closeBtn" class="close-btn">X</button>
               <canvas id="board"></canvas>
               <button id="clearBtn">Limpar</button>
             </div>
           </div>
        </div>`
}

function stage3(){
  return `            <link rel="stylesheet" type="text/css" href="../stylem1.css" /> <div class = "md1" >
              <h3>A fazendeira Maria está em dúvida:</h3> </div> 
              <div class = "md2">
              <div class="boxenun">
            <img id="openBtn"
              src="../../../images/minigames/farmer.png"
              alt="Fazendeira"
            />
            <h3>Eu tenho cinco cenouras, e quero vender cada uma por 30 moedas. Quantas moedas eu vou ter no total se eu vender todas as cenouras?</h3>
          </div> <div class = "boxresp">
              <input type="number" placeholder="resposta" id="response" />
              </div> </div>
              <div class = "md3">
              <button class="btn-purple">verificar</button> 
              <div id="popup" class="popup">
                           <div class="popup-content">
                             
                             <button id="closeBtn" class="close-btn">X</button>
                             <canvas id="board"></canvas>
                             <button id="clearBtn">Limpar</button>
                           </div>
                         </div>
              </div>`
}
















//pop-up's
function m4SelectAlert() {
  const popup = document.createElement('div');
  popup.className = 'popup2';
  popup.innerHTML = `
        <div class="popup-content2">
            <h2>Instruções:</h2>
            <p>Selecione o resultado correspondente!</p>
            <button id="continue-button">Continuar</button>
        </div>
    `;

  // Adiciona o pop-up ao corpo do documento
  document.body.appendChild(popup);

  // Adiciona o estilo do pop-up
  const style = document.createElement('style');
  style.innerHTML = `
        .popup2 {
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
        .popup-content2 {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        #continue-button {
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

  // Adiciona o evento de clique no botão pra fechsr o pop-up
  document.getElementById('continue-button').addEventListener('click', () => {
    // Remove o pop-up
    document.body.removeChild(popup);
  });
}