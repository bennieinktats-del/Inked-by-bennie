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

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  try {
    const response = await fetch('https://formspree.io/f/xnpqdjpv', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      paymentSection.classList.remove('hidden');
      submitButton.disabled = false;
      submitButton.textContent = 'Booking Request Sent';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Booking Request';
  }
});
  
  


