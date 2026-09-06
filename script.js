document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SUPABASE EDGE FUNCTION
  ========================= */

  const BOOKING_FUNCTION_URL =
    "https://medadmstfuxqjnemjjqs.supabase.co/functions/v1/get-booking-appointment-";


  /* =========================
     CREATE BOOKING REFERENCE
  ========================= */

  function generateBookingReference() {

    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let reference = "IB-";

    for (let i = 0; i < 6; i++) {

      reference +=
        characters.charAt(
          Math.floor(
            Math.random() * characters.length
          )
        );

    }

    return reference;
  }


  /* =========================
     FLASH / CUSTOM TOGGLE
  ========================= */

  const options =
    document.querySelectorAll(".option");

  const requestType =
    document.getElementById("requestType");

  const flashFields =
    document.getElementById("flashFields");

  const customFields =
    document.getElementById("customFields");


  options.forEach(option => {

    option.addEventListener("click", function () {

      options.forEach(o =>
        o.classList.remove("active")
      );

      this.classList.add("active");

      const selected =
        this.dataset.type;

      if (requestType) {
        requestType.value = selected;
      }

      if (selected === "Flash Design") {

        if (flashFields)
          flashFields.style.display = "block";

        if (customFields)
          customFields.style.display = "none";

      } else {

        if (flashFields)
          flashFields.style.display = "none";

        if (customFields)
          customFields.style.display = "block";
      }

    });

  });


  /* =========================
     BOOKING FORM
  ========================= */

  const bookingForm =
    document.getElementById("bookingForm");


  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        const formData =
          new FormData(bookingForm);


        const bookingReference =
          generateBookingReference();


        const booking = {

          "Client name":
            formData.get("name") || "",

          "Email":
            formData.get("email") || "",

          "Phone":
            formData.get("phone") || "",

          "Tattoo details":
            formData.get("tattoo_details") || "",

          "Booking status":
            "Pending",

          "Deposit status":
            "Not paid",

          "tattoo_type":
            formData.get("tattoo_type") || "",

          "preferred_date":
            formData.get("preferred_date") || "",

          "preferred_time":
            formData.get("preferred_time") || "",

          "Additional details":
            formData.get("additional_details") || "",

          "Size":
            formData.get("size") || "",

          "Placement":
            formData.get("placement") || "",

          "booking_reference":
            bookingReference

        };


        try {

          const response =
            await fetch(
  "https://medadmstfuxqjnemjjqs.supabase.co/functions/v1/submit-gift-card",
              {

                method: "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body:
                  JSON.stringify(booking)

              }
            );


          if (!response.ok) {

            const errorText =
              await response.text();

            console.error(
              "Booking error:",
              errorText
            );

            alert(
              "Sorry, your booking could not be submitted.\n\n" +
              "Please try again."
            );

            return;
          }


          alert(

            "Your booking request has been submitted successfully! ❤️\n\n" +

            "Your booking reference is: " +
            bookingReference +

            "\n\nPlease save this reference. " +

            "Wait for your booking to be approved before purchasing your gift card."

          );


          bookingForm.reset();

        }


        catch (error) {

          console.error(
            "Booking connection error:",
            error
          );

          alert(
            "Sorry, we couldn't connect to the booking system. " +
            "Please try again."
          );

        }

      }
    );

  }


  /* =========================
     GIFT CARD PAYMENT FORM
  ========================= */

  const giftCardForm =
    document.getElementById("giftCardForm");


  if (giftCardForm) {

    giftCardForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        const formData =
          new FormData(giftCardForm);


        const payment = {

          "name":
            formData.get("name") || "",

          "email":
            formData.get("email") || "",

          "phone":
            formData.get("phone") || "",

          "booking_reference":
            formData.get("booking_reference") || "",

          "gift_card_brand":
            formData.get("gift_card_brand") || "",

          "gift_card_amount":
            formData.get("gift_card_amount") || "",

          "gift_card_code":
            formData.get("gift_card_code") || "",

          "payment_type":
            "Temporary Gift Card Payment",

          "payment_status":
            "Pending Manual Verification"

        };


        try {

          const response =
            await fetch(
              `${BOOKING_FUNCTION_URL}/gift-card`,
              {

                method: "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body:
                  JSON.stringify(payment)

              }
            );


          if (!response.ok) {

            const errorText =
              await response.text();

            console.error(
              "Gift card payment error:",
              errorText
            );

            alert(
              "Sorry, your payment details could not be submitted.\n\n" +
              "Please try again."
            );

            return;
          }


          alert(

            "Payment submitted successfully! ❤️\n\n" +

            "Your gift card payment is now pending manual verification. " +

            "You will receive confirmation once your payment has been verified."

          );


          giftCardForm.reset();

        }


        catch (error) {

          console.error(
            "Gift card connection error:",
            error
          );

          alert(
            "Sorry, we couldn't connect to the payment system. " +
            "Please check your internet connection and try again."
          );

        }

      }
    );

  }

});
