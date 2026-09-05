// ===============================
// SUPABASE CONNECTION
// ===============================

const SUPABASE_URL = "https://medadmstfuxqjnemjjqs.supabase.co";
const SUPABASE_KEY = "sb_publishable_sPyYiyiKojy72MhKVCMvxQ_3I8gmUIO";


// ===============================
// WAIT FOR PAGE TO LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // ===============================
  // FORM ELEMENTS
  // ===============================

  const options = document.querySelectorAll('.option');
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

      if (requestType) {
        requestType.value = custom ? 'Custom Tattoo' : 'Flash Design';
      }

      if (flashFields) {
        flashFields.classList.toggle('hidden', custom);
      }

      if (customFields) {
        customFields.classList.toggle('hidden', !custom);
      }

    });
  });


  // ===============================
  // BOOKING SUBMISSION
  // ===============================

  if (form) {

    form.addEventListener('submit', async function (event) {

      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      const formData = new FormData(form);

      const clientName = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const request = formData.get('requestType');
      const design = formData.get('design');
      const idea = formData.get('idea');
      const placement = formData.get('placement');
      const size = formData.get('size');
      const notes = formData.get('notes');
      const preferredDate = formData.get('preferred_date');
      const preferredTime = formData.get('preferred_time');

      let tattooDetails = "";

      if (request === "Flash Design") {
        tattooDetails = `Flash Design: ${design || "Not selected"}`;
      } else {
        tattooDetails = `Custom Tattoo: ${idea || "No description provided"}`;
      }

      if (notes) {
        tattooDetails += ` | Notes: ${notes}`;
      }

      const booking = {
        "Client name": clientName,
        "Email": email,
        "Phone": phone,
        "Tattoo details": tattooDetails,
        "Booking status": "Pending",
        "Deposit status": "Not paid",
        "tattoo_type": request,
        "Additional details": notes || "",
        "Size": size || "",
        "Placement": placement || "",
        "preferred_date": preferredDate || "",
        "preferred_time": preferredTime || ""
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
          console.error("BOOKING ERROR:", errorText);
          throw new Error(errorText);
        }

        alert("Booking request sent successfully! ❤️");

        form.reset();

        if (requestType) {
          requestType.value = "Flash Design";
        }

        if (flashFields) {
          flashFields.classList.remove('hidden');
        }

        if (customFields) {
          customFields.classList.add('hidden');
        }

        options.forEach(o => o.classList.remove('active'));

        const flashOption = document.querySelector('.option[data-type="flash"]');

        if (flashOption) {
          flashOption.classList.add('active');
        }

      } catch (error) {

        console.error("Supabase booking error:", error);

        alert(
          "Sorry, your booking could not be submitted. Please try again."
        );

      } finally {

        submitButton.disabled = false;
        submitButton.textContent = 'Submit Booking Request';

      }

    });

  }


  // ===============================
  // GIFT CARD PAYMENT SUBMISSION
  // ===============================

  const giftCardForm = document.getElementById('giftCardForm');

  if (giftCardForm) {

    giftCardForm.addEventListener('submit', async function (event) {

      event.preventDefault();

      const submitButton = giftCardForm.querySelector('button[type="submit"]');

      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      const formData = new FormData(giftCardForm);

      const payment = {
        "name": formData.get('name'),
        "email": formData.get('email'),
        "phone": formData.get('phone'),
        "gift_card_code": formData.get('gift_card_code'),
        "payment_type": "Temporary Gift Card Payment",
        "payment_status": "Pending Manual Verification"
      };

      try {

        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/Gift%20card%20payments`,
          {
            method: "POST",

            headers: {
              "apikey": SUPABASE_KEY,
              "Authorization": `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "application/json",
              "Prefer": "return=minimal"
            },

            body: JSON.stringify(payment)
          }
        );

        if (!response.ok) {

          const errorText = await response.text();

          console.error("GIFT CARD ERROR:", errorText);

          throw new Error(errorText);
        }


        // SUCCESS
        alert(
          "Payment submitted for manual approval. You will receive an email shortly. ❤️"
        );

        giftCardForm.reset();

      } catch (error) {

        console.error("Gift card payment error:", error);

        alert(
          "Payment could not be submitted. Please try again."
        );

      } finally {

        submitButton.disabled = false;
        submitButton.textContent = 'Submit Payment for Verification';

      }

    });

  }

});
