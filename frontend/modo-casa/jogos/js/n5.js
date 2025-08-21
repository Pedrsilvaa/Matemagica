import { Cronometro, User, CapturaHTML, bclick, changeTheme, showGameOverPopup, Selects,
  m2Listeners, stage4, audio} from "./commonStructure.js";
import {Board} from "./board.js";

audio();
let userSession = new User(5,10,1,0,0,0);
let bncc = 'EF03MA07'
Cronometro(userSession);
let HtmlElements = CapturaHTML(userSession);


//btnListener's
showTip();
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
       if(userSession.res==4){
         return true
       }
       return false
    }
    if(index == 2){
      userSession.res = parseFloat(document.getElementById("response").value)
      if(userSession.res == 30){
        return true
      }
      return false
    }
     if (index == 3) {
       userSession.res = parseFloat(document.getElementById("response").value)
       if (userSession.res == 60) {
         return true
       }
       return false
     }
    
    return false
}


//changeGame
function changeGame(index) {
  switch (index) {
    case 2:
      userSession.res = 0;
      HtmlElements[4].innerHTML = stage2();
      Board();
      BtnPurpleListener();
      break;
    case 3:
      userSession.res = 0;
      HtmlElements[4].innerHTML = stage3();
      Board();
      BtnPurpleListener();
      break;
    case 4:
      stage4(userSession, bncc, 5);
           
           break;
    default:
      alert("mudou");
  }
}

  function stage2(){
  return ` <link rel="stylesheet" type="text/css" href="../stylem1.css"/> 
    <link rel="stylesheet" href="../board.css">
  <div class = "md1">
   <h3>Está servido? Dessa vez é diferente:</h3> </div>  
   <div class = "md2">
   <div class="boxenun">
              <img id="openBtn"
                src="../../../images/minigames/suquinho.png"
                alt="Suco de laranja"
              />
              <h3>Para uma jarra de suco de laranja são necessárias 12 laranjas. Porém, eu quero fazer 5 jarras, mas só tenho 30 laranjas. Quantas laranjas faltam?</h3>
            </div> <div class = "boxresp">
   <input type="number" placeholder="resposta" id="response"/>
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
//coment to commit
function stage3(){
  return ` <link rel="stylesheet" type="text/css" href="../stylem1.css" /> 
     <link rel="stylesheet" href="../board.css">
  <div class = "md1">
   <h3>Essa é para quem está com a caneta na mão:</h3> </div>  
   <div class = "md2">
   <div class="boxenun">
              <img id="openBtn"
                src="../../../images/minigames/caneta.png"
                alt="Canetas"
              />
              <h3>Em uma sala existem 5 fileiras com 4 mesas em cada e em cada mesa há 1 estojo com 3 canetas. Quantas canetas tem dentro da sala de aula?</h3>
            </div> <div class="boxresp">
   <input type="number" placeholder="resposta" id="response"/> 
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
                </div> 
              </main>`
}

function showTip() {
    const popup = document.createElement('div');
    popup.className = 'popup1';
    popup.innerHTML = `
        <div class="popup-content1">
            <h2>✨ Dica mágica:</h2>
            <h4>Sempre que ver a lousinha, basta clicar para abri-la</h4>
            <img style="margin: 20px" width="75%" src="../../../images/minigames/clicklousa.png"/>
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
            background-color: white;
            width: 40%;
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
        let music = document.getElementById("audio");
        if(music){
          music.play();
        }
        document.body.removeChild(popup);
    });
}
