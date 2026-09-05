// ===============================
// SUPABASE CONNECTION
// ===============================

const SUPABASE_URL = "https://medadmstfuxqjnemjjqs.supabase.co";
const SUPABASE_KEY = "sb_publishable_sPyYiyiKojy72MhKVCMvxQ_3I8gmUIO";


// ===============================
// FORM ELEMENTS
// ===============================

const options = document.querySelectorAll('.option');
const paymentSection = document.getElementById('payment-section');
const requestType = document.getElementById('requestType');
const flashFields = document.getElementById('flashFields');
const customFields = document.getElementById('customFields');
const form = document.getElementById('bookingForm');


// ===============================
// FLASH / CUSTOM TOGGLE
// ===============================

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


// ===============================
// SUBMIT BOOKING TO SUPABASE
// ===============================

form.addEventListener('submit', async function (event) {

  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';


  const formData = new FormData(form);


  // Get the values from the form
  const clientName = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const request = formData.get('requestType');
  const design = formData.get('design');
  const idea = formData.get('idea');
  const placement = formData.get('placement');
  const size = formData.get('size');
  const notes = formData.get('notes');


  // Combine tattoo information
  let tattooDetails = "";

  if (request === "Flash Design") {
    tattooDetails = `Flash Design: ${design || "Not selected"}`;
  } else {
    tattooDetails = `Custom Tattoo: ${idea || "No description provided"}`;
  }


  // Add additional notes
  if (notes) {
    tattooDetails += ` | Notes: ${notes}`;
  }


  // Send booking to Supabase
  const booking = {
    "Client name": clientName,
    "Email": email,
    "Phone": phone,
    "Tattoo details": tattooDetails,
    "Booking status": "Pending",
    "Deposit status": "Not paid",
    "tattoo_type": request,
    "Additional details": notes || "",
    "Size": size,
    "Placement": placement
  };


  try {

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/Bookings`,
      {
        method: "POST",

        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },

        body: JSON.stringify(booking)
      }
    );


    if (!response.ok) {

      const errorText = await response.text();

      throw new Error(errorText);
    }


    // Successful booking
    alert("Booking request sent successfully! ❤️");

    form.reset();

    requestType.value = "Flash Design";

    flashFields.classList.remove('hidden');
    customFields.classList.add('hidden');

    options.forEach(o => o.classList.remove('active'));

    const flashOption = document.querySelector('.option[data-type="flash"]');

    if (flashOption) {
      flashOption.classList.add('active');
    }

    submitButton.disabled = false;
    submitButton.textContent = 'Submit Booking Request';

  } catch (error) {

    console.error("Supabase error:", error);

    alert("Sorry, your booking could not be submitted. Please try again.");

    submitButton.disabled = false;
    submitButton.textContent = 'Submit Booking Request';
  }

});
