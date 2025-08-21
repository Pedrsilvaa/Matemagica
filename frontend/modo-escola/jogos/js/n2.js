import { Cronometro, User, CapturaHTML, SelectM4, bclick, changeTheme, showGameOverPopup, 
  m2Listeners, stage4, audio} from "./commonStructure.js";
import {Board} from "./board.js";

let userSession = new User(5,10,1,0,0,0);
let bncc = 'EF03MA02'
Cronometro(userSession);
audio();
//
//variaveis stage m4
let HtmlElements = CapturaHTML(userSession);
const cardNumbers = document.querySelector('#numbers').querySelectorAll(".card-game");
const cardUnits = document.querySelector('#units').querySelectorAll(".card-game");
let logPlays = 0; 
let arrayAcertos = []
showTip()
SelectM4();

HtmlElements[2].addEventListener("click", (e)=>{
    if(logPlays == 0){
        verifyStage1()
        if(userSession.life==0){
          showGameOverPopup();
        }
    return
    }
    bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);
});


function changeGame(index){
    switch(index){
      case 2:
        HtmlElements[4].innerHTML = stage2();
        m2Listeners(userSession);
        BtnPurpleListener();
      break;
      case 3:
        userSession.res = 0;
        HtmlElements[4].innerHTML = stage3();
        Board();
        m2Listeners(userSession);
        BtnPurpleListener();
      break;
      case 4:
      stage4(userSession, bncc, 2);
         
      break;
    default:
      alert("mudou");
    }
}

function verifyStage1(){
    if(!document.querySelector("#units").querySelector(".select") || !document.querySelector("#numbers").querySelector(".select")){
        m4SelectAlert();
        return
    }

    //verifica o primeiro card
    if(cardNumbers[0].classList[1] == 'select'){
        let correspondente = cardUnits[2];
        if(correspondente.classList[1] == 'select'){
            arrayAcertos[0] = 1;
            cardNumbers[0].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            cardNumbers[0].classList.remove("select");
            correspondente.classList.remove("select");
            cardNumbers[0].classList.remove("card-game");
            correspondente.classList.remove("card-game");
        }else{
          const selecionado = document.querySelector("#units").querySelector(".select");
          const num = cardNumbers[0];
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
        if (cardNumbers[1].classList[1] == 'select') {
          let correspondente = cardUnits[3];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[1] = 1;
            cardNumbers[1].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            cardNumbers[1].classList.remove("select");
            correspondente.classList.remove("select");
            cardNumbers[1].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = cardNumbers[1];
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
        if (cardNumbers[2].classList[1] == 'select') {
          let correspondente = cardUnits[1];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[2] = 1;
            cardNumbers[2].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            cardNumbers[2].classList.remove("select");
            correspondente.classList.remove("select");
            cardNumbers[2].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = cardNumbers[2];
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
        if (cardNumbers[3].classList[1] == 'select') {
          let correspondente = cardUnits[0];
          if (correspondente.classList[1] == 'select') {
            arrayAcertos[3] = 1;
            cardNumbers[3].classList.add("right-answer");
            correspondente.classList.add("right-answer");
            cardNumbers[3].classList.remove("select");
            correspondente.classList.remove("select");
            cardNumbers[3].classList.remove("card-game");
            correspondente.classList.remove("card-game");
          } else {
            const selecionado = document.querySelector("#units").querySelector(".select");
            const num = cardNumbers[3];
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
          logPlays = 1;
          bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);
        }
        
}



function verifyAnswer(){
    let index = userSession.gameIndex;
    if(index == 1){
     return true
    }
    if(index == 2){
      if(userSession.res == 4){
        return true
      }
      return false
    }
     if (index == 3) {
       if (userSession.res == 3) {
         return true
       }
       return false
     }
    
    return false
}


//pop-up's
function m4SelectAlert() {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
        <div class="popup-content">
            <h2>Instruções:</h2>
            <p>Selecione a decomposição correspondente!</p>
            <button id="continue-button">Continuar</button>
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



function showTip() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Instruções:</h2>
            <h3>Clique no número e depois na casa correspondente </h3>
            <img style="margin: 20px" width="75%" src="../../../images/minigames/exemplificacao.png"/>
            <button id="continue-button">Jogar</button>
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
            width: 50%;
            padding: 5vh 0;
            border-radius: 8px;
            text-align: center;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        #continue-button {
            margin-top: 10px;
            padding: 12px 35px;
            background-color: #89389e;
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 1rem
        }
        #retry-button:hover {
            background-color: #bc4ed8;
        }
    `;
    document.head.appendChild(style);

    // Adiciona o evento de clique no botão de fechar o pop up
    document.getElementById('continue-button').addEventListener('click', () => {
        // Remove o pop-up
     
        document.body.removeChild(popup);
    });
}

function stage2(){
  
  return `              <link rel="stylesheet" href="../stylem2.css">
  <div class="md1">
<h3>O cavalo Pedropano está perdido:</h3>
</div>
<div class="md2">
<div class="boxenun">
<img
src="../../..../../../images/minigames/horse.png"
alt="cavalo"
/>
<h3>O endereço do meu estábulo é o número que podemos formar com 2.000, 800, 70 e 4.</h3>

</div>
<div class="boxresp">
<div class="card-block">
<div class="card-game">

 2748
</div>
<div class="card-game">
2847
</div>
</div>
<div class="card-block">
<div class="card-game">

  2784
</div>
<div class="card-game">
  2874
</div>
</div>
</div>
</div>
<div class="md3">
<button class="btn-purple">verificar</button>
</div>`
}

function stage3(){
  
  return `              <link rel="stylesheet" href="../stylem2.css">
                <link rel="stylesheet" href="../board.css">
    <div class="md1">
    <h3>O policial Paulo precisa de sua ajuda!</h3>
  </div>
  <div class="md2">
    <div class="boxenun">
      <img id="openBtn"
        src="../../..../../../images/minigames/pm-lousa.png"
        alt="policial cachorro"
      />
     
      <h3>Me ajude decifrando como se compõe o número quatro mil, seiscentos e quarenta e quatro menos duzentos e vinte e sete. Caso precise, trouxe uma lousa pra ajudar, basta clicar nela!</h3>
  
    </div>
    <div class="boxresp">
      <div class="card-block">
        <div class="card-game">
  
         4644
        </div>
        <div class="card-game">
        4364
        </div>
      </div>
      <div class="card-block">
        <div class="card-game">
       4417
        </div>
        <div class="card-game">
          4227
        </div>
      </div>
    </div>
  </div>
  <div class="md3">
    <button class="btn-purple">verificar</button>
  </div>
   <div id="popup" class="popup">
     <div class="popup-content">
       <h4>Quatro mil, seiscentos e quarenta e quatro menos duzentos e vinte e sete</h4>
       <button id="closeBtn" class="close-btn">X</button>
       <canvas id="board"></canvas>
       <button id="clearBtn">Limpar</button>
     </div>
   </div>`
}


function BtnPurpleListener(){
  let button = document.querySelector(".btn-purple");
  button.addEventListener("click", (e) => {
    
    bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);
    
  });
}

