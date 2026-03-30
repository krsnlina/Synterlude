// ===========================
// SETUP
// ===========================
const hint = document.getElementById("hint");
const sounds = document.querySelectorAll(".sound");
const container = document.querySelector(".bild-container");

const totalSounds = sounds.length;
const clickedSounds = new Set();
let canGoIn = false;

// ===========================
// CONFIG (HIER PASST DU BILDER AN)
// ===========================
const soundConfig = {
  audio1: { img: "gesicht 1.jpg", top: 530, left: 250, width: 70 },
  audio2: { img: "gesicht 3.jpg", top: 515, left: 475, width: 80 },
  audio3: { img: "gesicht 4.jpg", top: 515, left: 580, width: 75 },
  audio4: { img: "gesicht 2.jpg", top: 490, left: 360, width: 75 },
  audio5: { img: "gesicht 5.jpg", top: 500, left: 770, width: 62 },
  audio6: { img: "gesicht 6.jpg", top: 500, left: 870, width: 65 },
  audio7: { img: "gesicht 7.jpg", top: 500, left: 960, width: 52 },
  audio8: { img: "gesicht8.jpg", top: 440, left: 1230, width: 65 }
};

// ===========================
// BILDER ERSTELLEN
// ===========================
const imageMap = {};

Object.keys(soundConfig).forEach((audioId) => {
  const config = soundConfig[audioId];

  const img = document.createElement("img");
  img.src = config.img;

  img.style.display = "none";
  img.style.position = "absolute";
  img.style.top = config.top + "px";
  img.style.left = config.left + "px";
  img.style.width = (config.width || 68) + "px";
  img.style.height = "auto";

  // 🔥 PIXEL FIX
  img.style.imageRendering = "pixelated";

  img.style.zIndex = "2";
  img.style.transition = "opacity 0.5s ease";

  container.appendChild(img);
  imageMap[audioId] = img;
});

// ===========================
// SOUND KLICKS
// ===========================
sounds.forEach((soundDiv) => {
  soundDiv.addEventListener("click", () => {
    const audioId = soundDiv.getAttribute("data-audio");
    const audio = document.getElementById(audioId);
    const img = imageMap[audioId];

    if (!audio) return;

    // Bild anzeigen
    if (img) {
      img.style.display = "block";
      img.style.opacity = "1";
    }

    // Audio starten
    audio.currentTime = 0;
    audio.play();

    clickedSounds.add(audioId);

    // Wenn Audio endet → Bild weg
    audio.onended = () => {
      if (img) {
        img.style.display = "none";
        img.style.opacity = "0";
      }
    };

    // ===========================
    // ALLE SOUNDS GEKLICKT?
    // ===========================
    if (clickedSounds.size === totalSounds) {
      canGoIn = true;

      const link = document.querySelector(".link-bereich");

      // 🔹 Glow einmalig aktivieren
      link.classList.add("glow");

      // 🔹 Hinweis "Go in" anzeigen
      const rect = link.getBoundingClientRect();
      hint.textContent = "Go in";
      hint.style.left = rect.left + rect.width / 2 + "px";
      hint.style.top = rect.top - 40 + "px";
      hint.style.transform = "translate(-50%, -50%)";
      hint.style.opacity = "1";

      setTimeout(() => {
        hint.style.opacity = "0";
      }, 5000);
    }
  });
});

// ===========================
// GLOBAL CLICK HANDLING
// ===========================
document.addEventListener("click", (event) => {
  const target = event.target;

  // ---------------------------
  // LINK BEREICH
  // ---------------------------
  if (target.classList.contains("link-bereich")) {
    if (!canGoIn) {
      event.preventDefault();

      hint.textContent = "All heads";

      const rect = target.getBoundingClientRect();
      hint.style.left = rect.left + rect.width / 2 + "px";
      hint.style.top = rect.top - 40 + "px";
      hint.style.transform = "translate(-50%, -50%)";
      hint.style.opacity = "1";

      setTimeout(() => {
        hint.style.opacity = "0";
      }, 3000);
    }
    return;
  }

  // ---------------------------
  // NICHT AUF SOUND GEKLICKT
  // ---------------------------
  if (!target.classList.contains("sound")) {
    const x = event.pageX;
    const y = event.pageY;

    hint.textContent = "dot";

    hint.style.left = x + "px";
    hint.style.top = y + "px";
    hint.style.transform = "translate(-50%, -100%)";
    hint.style.opacity = "1";

    setTimeout(() => {
      hint.style.opacity = "0";
    }, 3000);
  }
});