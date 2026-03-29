// Overlay-Bild erstellen (unsichtbar am Anfang)
const overlayBg = document.createElement('img');
overlayBg.src = 'dtreppenhaus.png';
overlayBg.className = 'overlay-bg';
overlayBg.style.display = 'none';
document.querySelector('.bild-container').appendChild(overlayBg);

// Alle Soundpunkte erfassen
const allSounds = document.querySelectorAll('.sound');

allSounds.forEach((soundEl, index) => {
  const inputEl = document.getElementById(`user-input${index+1}`);
  const promptEl = document.getElementById(`prompt-text${index+1}`);
  const audioEl = document.getElementById(soundEl.dataset.audio);

  soundEl.addEventListener('click', () => {
    audioEl.currentTime = 0;
    audioEl.play();

    inputEl.style.display = 'block';
    inputEl.focus();

    overlayBg.style.display = 'block';
  });

  inputEl.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      inputEl.style.display = 'none';
      promptEl.style.opacity = '1';
      overlayBg.style.display = 'none';
    }
  });
});

// Explore-Hinweis bei Klick auf Seite
const exploreHint = document.createElement('div');
exploreHint.textContent = 'Explore';
exploreHint.style.position = 'absolute';
exploreHint.style.color = 'white';
exploreHint.style.fontFamily = 'Courier New, monospace';
exploreHint.style.fontSize = '15px';
exploreHint.style.opacity = '0';
exploreHint.style.transition = 'opacity 0.5s';
exploreHint.style.pointerEvents = 'none';
exploreHint.style.zIndex = '9999';
document.body.appendChild(exploreHint);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('sound') || e.target.classList.contains('user-input')) return;

  exploreHint.style.left = e.pageX + 'px';
  exploreHint.style.top = e.pageY + 'px';
  exploreHint.style.transform = 'translate(-50%, -100%)';
  exploreHint.style.opacity = '1';

  setTimeout(() => { exploreHint.style.opacity = '0'; }, 2000);
});// Link-Kreis erstellen
const linkCircle = document.createElement('div');
linkCircle.className = 'link-circle';
document.querySelector('.bild-container').appendChild(linkCircle);

// Klick auf Kreis → weiter zu index.html
linkCircle.addEventListener('click', () => {
  window.location.href = 'start.html';
});// Exit-Text erstellen
const exitText = document.createElement('div');
exitText.className = 'exit-text';
exitText.textContent = 'Exit';
document.querySelector('.bild-container').appendChild(exitText);const exitLink = document.querySelector('.link-circle');

exitLink.addEventListener('click', (event) => {
  // verhindert, dass der Hint oder Text angezeigt wird
  event.stopPropagation(); // stoppt die Bubble zu globalen Click-Handlern

  // Hier kannst du z.B. direkt weiterleiten oder andere Aktion ausführen
  // window.location.href = "zielseite.html"; // optional
});const container = document.querySelector('.bild-container');
container.appendChild(exploreHint);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('sound') || e.target.classList.contains('user-input')) return;

  // Container-Position + Scroll berücksichtigen
  const rect = container.getBoundingClientRect();
  const scrollLeft = container.scrollLeft;
  const scrollTop = container.scrollTop;

  const x = e.clientX - rect.left + scrollLeft;
  const y = e.clientY - rect.top + scrollTop;

  exploreHint.style.left = x + 'px';
  exploreHint.style.top = y + 'px';
  exploreHint.style.transform = 'translate(-50%, -100%)';
  exploreHint.style.opacity = '1';

  setTimeout(() => { exploreHint.style.opacity = '0'; }, 2000);
});