const options = document.querySelectorAll('.option');
const paymentSection = document.getElementById('payment-section');
const requestType = document.getElementById('requestType');
const flashFields = document.getElementById('flashFields');
const customFields = document.getElementById('customFields');
const form = document.getElementById('bookingForm');

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(o => o.classList.remove('active'));
    option.classList.add('active');

    const custom = option.dataset.type === 'custom';

    requestType.value = custom ? 'Custom Tattoo' : 'Flash Design';
    flashFields.classList.toggle('hidden', custom);
    customFields.classList.toggle('hidden', !custom);
  });
});

form.addEventListener('submit', function () {
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
});
