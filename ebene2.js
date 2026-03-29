const sounds = document.querySelectorAll('.sound');
const userInput = document.getElementById('user-input');
const promptText = document.getElementById('prompt-text');

const audioMap = {
  sound1: document.getElementById('heizung')
};

// ----------------------
// SOUND CLICK LOGIC (für ALLE 6)
// ----------------------
sounds.forEach(sound => {

  sound.addEventListener('click', () => {

    const audio = audioMap[sound.classList[1]];

    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    userInput.style.display = 'block';
    userInput.focus();

    promptText.style.opacity = '0'; // reset
  });
});

// ----------------------
// INPUT ENTER
// ----------------------
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    userInput.style.display = 'none';
    promptText.style.opacity = '1';
  }
});

// ----------------------
// EXPLORE / POMEGRANATE HINT
// ----------------------
const hint = document.createElement('div');
hint.textContent = 'Pomegranate';
hint.style.position = 'absolute';
hint.style.color = 'white';
hint.style.fontFamily = '"Courier New", monospace';
hint.style.fontSize = '15px';
hint.style.opacity = '0';
hint.style.transition = 'opacity 0.5s';
hint.style.pointerEvents = 'none';
hint.style.zIndex = '9999';
document.body.appendChild(hint);

document.addEventListener('click', (e) => {

  if (e.target.classList.contains('sound') || e.target === userInput) return;

  hint.style.left = e.pageX + 'px';
  hint.style.top = e.pageY + 'px';
  hint.style.transform = 'translate(-50%, -100%)';

  hint.style.opacity = '1';

  setTimeout(() => {
    hint.style.opacity = '0';
  }, 2000);
});