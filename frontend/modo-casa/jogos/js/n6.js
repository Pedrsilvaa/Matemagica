import { Cronometro, User, CapturaHTML, bclick, changeTheme, showGameOverPopup, Selects,
  m2Listeners, stage4, audio, playGame} from "./commonStructure.js";
import {Board} from "./board.js";


let userSession = new User(5,10,1,0,0,0);
let bncc = 'EF03MA09 e EF03MA11'
Cronometro(userSession);
audio();
let HtmlElements = CapturaHTML(userSession);

//btnListener's
playGame()
m2Listeners(userSession);
function BtnPurpleListener() {
  let button = document.querySelector(".btn-purple");
  button.addEventListener("click", (e) => {

    bclick(verifyAnswer, userSession, HtmlElements[6], changeGame);

  });
}
BtnPurpleListener();


//verficadores
function verifyAnswer(){
    let index = userSession.gameIndex;
    if(index == 1){
       if(userSession.res==1){
         return true
       }
       return false
    }
    if(index == 2){
      if(userSession.res == 2){
        return true
      }
      return false
    }
     if (index == 3) {
       if (userSession.res == 4) {
         return true
       }
       return false
     }
    
    return false
}
//""

//changeGame
function changeGame(index) {
  switch (index) {
    case 2:
      userSession.res = 0;
      HtmlElements[4].innerHTML = stage2();
      m2Listeners(userSession);
      BtnPurpleListener();
      break;
    case 3:
      userSession.res = 0;
      HtmlElements[4].innerHTML = stage3();
      m2Listeners(userSession);
      Board();
      BtnPurpleListener();
      break;
    case 4:
      stage4(userSession, bncc, 6);
      break;
    default:
      alert("mudou");
  }
}

  function stage2(){
  return `         <link rel="stylesheet" href="../stylem2.css">
                        <style>
                          .card-game{
                            text-align: center;
                          }
                        </style>
                        <div class="md1">
                  <h3>Agora o Cérebro pega fogo!</h3>
                </div>
                <div class="md2">
                  <div class="boxenun">
                    <img
                      src="../../../images/minigames/brainfire.png"
                      alt="Pensando demais"
                    />
                    <h3>Preciso de sua ajuda para encontrar quatro operações que resultem em 12. Eu já advinhei 8 + 4 e 4 × 3. Você pode me ajudar encontrando as operações para <strong>subtração e divisão?</strong></h3>
                  </div>
                  <div class="boxresp">
                    <div class="card-block">
                      <div class="card-game">
                         16 - 2<br/>e<br/>24 ÷ 2
                      </div>
                      <div class="card-game">
                         17 - 5<br/>e<br/>36 ÷ 3
                      </div>
                    </div>
                    <div class="card-block">
                      <div class="card-game">
                         19 - 6<br/>e<br/>24 ÷ 3
                      </div>
                      <div class="card-game">
                        11 - 1<br/>e<br/>24 ÷ 3
                      </div>
                    </div>
                  </div>
                </div>
                <div class="md3">
                  <button class="btn-purple">verificar</button>
                </div>`
}

function stage3(){
  return `   <link rel="stylesheet" href="../stylem2.css">
    <link rel="stylesheet" href="../board.css">
          <style>
            .card-game{
              text-align: center;
            }
          </style>
          <div class="md1">
    <h3>Vamos às compras?!</h3>
  </div>
  <div class="md2">
    <div class="boxenun">
      <img id="openBtn"
        src="../../../images/minigames/frutinhas.png"
        alt="frutas"
      />
      <h3>O nosso amigo Lobato possui uma venda com 186 frutas. Um  cliente se interessou na qualidade delas e decidiu comprar ⅙ das frutas da venda. Quantas frutas o cliente comprou e qual a equivalência do que restou em relação ao total das 186 frutas?</h3>
    </div>
    <div class="boxresp">
      <div class="card-block">
        <div class="card-game">
           21 frutas e<br/>restou ⅚
        </div>
        <div class="card-game">
           31 frutas e<br/>restou ⁶⁄₅
        </div>
      </div>
      <div class="card-block">
        <div class="card-game">
           21 frutas e<br/>restou ⁶⁄₅
        </div>
        <div class="card-game">
          31 frutas e<br/>restou ⅚
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
