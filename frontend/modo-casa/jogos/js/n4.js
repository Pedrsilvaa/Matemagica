import { Cronometro, User, CapturaHTML, bclick, changeTheme, showGameOverPopup, Selects,
  m2Listeners, stage4, audio, playGame} from "./commonStructure.js";
import {Board} from "./board.js";


let userSession = new User(5,10,1,0,0,0);
let bncc = 'EF03MA06'
Cronometro(userSession);
audio();
playGame();
let HtmlElements = CapturaHTML(userSession);

//btnListener's
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
       if(userSession.res==2){
         return true
       }
       return false
    }
    if(index == 2){
      if(userSession.res == 3){
        return true
      }
      return false
    }
     if (index == 3) {
       if (userSession.res == 1) {
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
      m2Listeners(userSession);
      BtnPurpleListener();
      break;
    case 3:
      userSession.res = 0;
      HtmlElements[4].innerHTML = stage3();
      m2Listeners(userSession);
      BtnPurpleListener();
      break;
    case 4:
      stage4(userSession, bncc, 4);
          
      break;
    default:
      alert("mudou");
  }
}

  function stage2(){
  return `         <link rel="stylesheet" href="../stylem2.css">
                <div class="md1">
          <h3>Enzo está indignado com o segundo lugar:</h3>
        </div>
        <div class="md2">
          <div class="boxenun">
            <img
              src="../../../images/minigames/player 1.png"
              alt="Jogador de futebol"
            />
            <h3>Eu fiz 14 gols no campeonato, mas fiquei em segundo lugar. O primeiro lugar fez metade a mais da minha quantidade de gols. Então, quantos gols ele fez <strong>no total?</strong></h3>
        
          </div>
          <div class="boxresp">
            <div class="card-block">
              <div class="card-game">
                 14
              </div>
              <div class="card-game">
                 7
              </div>
            </div>
            <div class="card-block">
              <div class="card-game">
                 21
              </div>
              <div class="card-game">
                6
              </div>
            </div>
          </div>
        </div>
        <div class="md3">
          <button class="btn-purple">verificar</button>
        </div>`
}

function stage3(){
  return `    <link rel="stylesheet" href="../stylem2.css">
          <div class="md1">
    <h3>Analise este caso particular:</h3>
  </div>
  <div class="md2">
    <div class="boxenun">
      <img
        src="../../../images/minigames/formigueiro.png"
        alt="formiga"
      />
      <h3>Num formigueiro haviam 200 formigas. A formiga rainha ordenou que <strong>metade da metade</strong> delas buscasse alimento e o restante ficasse no formigueiro. Quantas foram buscar alimento e quantas ficaram?</h3>
  
    </div>
    <div class="boxresp">
      <div class="card-block">
        <div class="card-game">
           50 e 150
        </div>
        <div class="card-game">
           75 e 125
        </div>
      </div>
      <div class="card-block">
        <div class="card-game">
           100 e 100
        </div>
        <div class="card-game">
          150 e 50
        </div>
      </div>
    </div>
  </div>
  <div class="md3">
    <button class="btn-purple">verificar</button>
  </div>`
}