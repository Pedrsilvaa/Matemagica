export function Board(){

  
  
   // Abre o pop-up
    document.getElementById('openBtn').addEventListener('click', function() {
      document.getElementById('popup').style.display = 'flex';
      setCanvasSize(); // Ajusta o tamanho do canvas ao abrir o pop-up
    });

    // Fecha o pop-up
    document.getElementById('closeBtn').addEventListener('click', function() {
      document.getElementById('popup').style.display = 'none';
    });

    // Limpa o quadro
    document.getElementById('clearBtn').addEventListener('click', function() {
      const canvas = document.getElementById('board');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Função de desenho no canvas
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();  // Obtém a posição do canvas na tela
      let x, y;

      // Para eventos de toque
      if (e.touches) {
        const touch = e.touches[0];  // Pega o primeiro ponto de toque
        x = (touch.clientX - rect.left) * (canvas.width / rect.width);  // Ajusta a coordenada X
        y = (touch.clientY - rect.top) * (canvas.height / rect.height);  // Ajusta a coordenada Y
      } else { // Para eventos de mouse
        x = (e.offsetX || e.layerX) * (canvas.width / rect.width);  // Ajusta a coordenada X
        y = (e.offsetY || e.layerY) * (canvas.height / rect.height);  // Ajusta a coordenada Y
      }

      return { x, y };
    }

    canvas.addEventListener('mousedown', (e) => {
      const { x, y } = getCoords(e);
      drawing = true;
      lastX = x;
      lastY = y;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      const { x, y } = getCoords(e);

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      lastX = x;
      lastY = y;
    });

    canvas.addEventListener('mouseup', () => {
      drawing = false;
    });

    canvas.addEventListener('mouseout', () => {
      drawing = false;
    });

    // Para toque em dispositivos móveis
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Impede o comportamento padrão do navegador
      const { x, y } = getCoords(e);
      drawing = true;
      lastX = x;
      lastY = y;
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Impede o comportamento padrão do navegador
      if (!drawing) return;
      const { x, y } = getCoords(e);

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 5;
      ctx.stroke();

      lastX = x;
      lastY = y;
    });

    canvas.addEventListener('touchend', () => {
      drawing = false;
    });

    canvas.addEventListener('touchcancel', () => {
      drawing = false;
    });

    // Função para ajustar o tamanho do canvas dinamicamente
    function setCanvasSize() {
      const canvas = document.getElementById('board');
      canvas.width = window.innerWidth * 0.9; // 90% da largura da janela
      canvas.height = window.innerHeight * 0.7; // 70% da altura da janela
    }

    // Chama a função no início para garantir que o canvas tenha o tamanho correto
    setCanvasSize();
    
}