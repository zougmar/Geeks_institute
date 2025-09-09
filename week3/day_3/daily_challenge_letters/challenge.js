document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('lettersOnly');

  input.addEventListener('keydown', (event) => {
    // Allow: backspace, delete, tab, arrow keys
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (allowedKeys.includes(event.key)) return;

    // Only allow letters a-z or A-Z
    const regex = /^[a-zA-Z]$/;
    if (!regex.test(event.key)) {
      event.preventDefault(); // Block the key if it's not a letter
    }
  });
});
