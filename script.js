const options = document.querySelectorAll('.option');
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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you! Your booking request has been prepared. Connect this form to your preferred booking/email service before launch.');
});
