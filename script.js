const input = document.getElementById('confession-input');
const submitBtn = document.getElementById('submit-btn');
const container = document.getElementById('confession-container');

// Send confession
submitBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const confessionRef = database.ref('confessions').push();
  confessionRef.set({
    text,
    timestamp: Date.now()
  });

  input.value = '';
});

// Display confessions
database.ref('confessions').on('child_added', snapshot => {
  const data = snapshot.val();

  const bubble = document.createElement('div');
  bubble.classList.add('confession-bubble');
  bubble.textContent = data.text;

  // Random horizontal position
  bubble.style.left = Math.random() * 80 + '%';
  container.appendChild(bubble);

  // Auto-delete after 24h
  setTimeout(() => {
    database.ref('confessions/' + snapshot.key).remove();
    bubble.remove();
  }, 24 * 60 * 60 * 1000);
});
