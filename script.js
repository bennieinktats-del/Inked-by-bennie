document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SUPABASE EDGE FUNCTION
  ========================= */

  const BOOKING_FUNCTION_URL =
    "https://medadmstfuxqjnemjjqs.supabase.co/functions/v1/get-booking-appointment-";


  /* =========================
     BOOKING REFERENCE
  ========================= */

  function generateBookingReference() {

    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let reference = "IB-";

    for (let i = 0; i < 6; i++) {

      reference += characters.charAt(
        Math.floor(Math.random() * characters.length)
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

        requestType.value =
          selected === "flash"
            ? "Flash Design"
            : "Custom Tattoo";

      }


      if (selected === "flash") {

        if (flashFields) {
          flashFields.style.display = "block";
        }

        if (customFields) {
          customFields.style.display = "none";
        }

      } else {

        if (flashFields) {
          flashFields.style.display = "none";
        }

        if (customFields) {
          customFields.style.display = "block";
        }

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


        const selectedFlashDesign =
          formData.get("design") || "";


        const booking = {

          "Client name":
            formData.get("name") || "",

          "Email":
            formData.get("email") || "",

          "Phone":
            formData.get("phone") || "",

          "Booking status":
            "Pending",

          "Deposit status":
            "Not paid",

          "tattoo_type":
            formData.get("tattooType") || "",

          "request_type":
            formData.get("requestType") || "",

          "preferred_date":
            formData.get("preferred_date") || "",

          "preferred_time":
            formData.get("preferred_time") || "",

          "Additional details":
            formData.get("additional_details") ||
            formData.get("notes") ||
            "",

          "Size":
            formData.get("size") || "",

          "Placement":
            formData.get("placement") || "",

          "flash_design":
            selectedFlashDesign,

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
                  "Content-Type": "application/json"
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


          /* =========================
             SIMPLE SUCCESS
          ========================= */

          alert(
            "Booking submitted successfully! ❤️"
          );


          bookingForm.reset();


          /* Restore Flash Design */

          if (requestType) {
            requestType.value =
              "Flash Design";
          }

          if (flashFields) {
            flashFields.style.display =
              "block";
          }

          if (customFields) {
            customFields.style.display =
              "none";
          }


          options.forEach(o =>
            o.classList.remove("active")
          );


          const flashOption =
            document.querySelector(
              '.option[data-type="flash"]'
            );


          if (flashOption) {
            flashOption.classList.add("active");
          }


          if (selectedFlashDesign) {
            selectedFlashDesign.value = "";
          }


          document
            .querySelectorAll(
              "#flashDesignGallery > div"
            )
            .forEach(function (item) {

              item.style.outline =
                "none";

            });


        } catch (error) {

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

          "payment_type":
            "Temporary Gift Card Payment",

          "payment_status":
            "Pending Manual Verification"

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
            "Your gift card payment is now pending manual verification."
          );


          giftCardForm.reset();


        } catch (error) {

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


  /* =========================
     FLASH DESIGN GALLERY
     SUPABASE
  ========================= */

  const flashDesignGallery =
    document.getElementById(
      "flashDesignGallery"
    );


  const selectedFlashDesign =
    document.getElementById(
      "selectedFlashDesign"
    );


  if (flashDesignGallery) {

    async function loadFlashDesigns() {

      try {

        const response =
          await fetch(
            "https://medadmstfuxqjnemjjqs.supabase.co/rest/v1/flash_designs?select=id,name,price,image_url&order=created_at.asc",
            {
              headers: {

                "apikey":
                  "sb_publishable_sPyYiyiKojy72MhKVCMvxQ_3I8gmUIO"

              }
            }
          );


        if (!response.ok) {

          const errorText =
            await response.text();

          console.error(
            "Supabase flash design error:",
            errorText
          );

          throw new Error(
            "Could not load flash designs."
          );

        }


        const designs =
          await response.json();


        if (!designs.length) {

          flashDesignGallery.innerHTML =
            "<p>No flash designs available yet.</p>";

          return;

        }


        flashDesignGallery.innerHTML =
          "";


        designs.forEach(
          function (design, index) {

            const designNumber =
              String(index + 1)
                .padStart(2, "0");


            const designLabel =
              "Design " +
              designNumber +
              " — " +
              design.name;


            const card =
              document.createElement("div");


            card.style.border =
              "1px solid #d4af37";

            card.style.borderRadius =
              "12px";

            card.style.padding =
              "10px";

            card.style.marginBottom =
              "15px";

            card.style.cursor =
              "pointer";


            card.innerHTML = `

              <img
                src="${design.image_url}"
                alt="${designLabel}"
                style="
                  width:100%;
                  border-radius:8px;
                  display:block;
                "
              >

              <h3>
                ${designLabel}
              </h3>

              <p>
                $${design.price}
              </p>

              <button type="button">
                Select this design
              </button>

            `;


            const button =
              card.querySelector("button");


            button.addEventListener(
              "click",
              function () {


                if (selectedFlashDesign) {

                  selectedFlashDesign.value =
                    designLabel;

                }


                document
                  .querySelectorAll(
                    "#flashDesignGallery > div"
                  )
                  .forEach(
                    function (item) {

                      item.style.outline =
                        "none";

                    }
                  );


                card.style.outline =
                  "3px solid #d4af37";

              }
            );


            flashDesignGallery.appendChild(
              card
            );

          }
        );


      } catch (error) {

        console.error(
          "Flash designs error:",
          error
        );

        flashDesignGallery.innerHTML =
          "<p>Unable to load flash designs.</p>";

      }

    }


    loadFlashDesigns();

  }

});
