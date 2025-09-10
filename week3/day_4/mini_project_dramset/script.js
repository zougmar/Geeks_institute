// Function to play sound
function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const drum = document.querySelector(`.drum[data-key="${keyCode}"]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  drum.classList.add("playing");
  setTimeout(() => drum.classList.remove("playing"), 200);
}

// Keyboard events
window.addEventListener("keydown", (e) => {
  playSound(e.keyCode);
});

// Mouse click events
document.querySelectorAll(".drum").forEach(drum => {
  drum.addEventListener("click", function() {
    playSound(this.getAttribute("data-key"));
  });
});
