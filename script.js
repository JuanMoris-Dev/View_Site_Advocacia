const form = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form));

  button.disabled = true;
  statusMessage.textContent = 'Enviando mensagem…';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'same-origin'
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Não foi possível enviar agora.');

    form.reset();
    statusMessage.textContent = result.message;
  } catch (error) {
    statusMessage.textContent = error.message || 'Não foi possível enviar agora. Tente novamente mais tarde.';
  } finally {
    button.disabled = false;
  }
});
