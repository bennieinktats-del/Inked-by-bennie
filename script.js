document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SUPABASE
  ========================= */

  const SUPABASE_URL =
    "https://medadmstfuxqjnemjjqs.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_sPyYiyiKojy72MhKVCMvxQ_3I8gmUIO";


  /* =========================
     BOOKING REFERENCE
  ========================= */

  function generateBookingReference() {

    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let reference = "IB-";

    for (let i = 0; i < 6; i++) {

      reference += characters.charAt(
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


  options.forEach(function (option) {

    option.addEventListener(
      "click",
      function () {

        options.forEach(function (item) {

          item.classList.remove("active");

        });


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

            flashFields.style.display =
              "block";

          }

          if (customFields) {

            customFields.style.display =
              "none";

          }

        } else {

          if (flashFields) {

            flashFields.style.display =
              "none";

          }

          if (customFields) {

            customFields.style.display =
              "block";

          }

        }

      }
    );

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


        const selectedDesign =
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
            selectedDesign,

          "booking_reference":
            bookingReference

        };


        console.log(
          "Booking being submitted:",
          booking
        );


        try {

          const response =
            await fetch(
              SUPABASE_URL +
              "/functions/v1/submit-gift-card",
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


          /* =========================
             SIMPLE BOOKING SUCCESS
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


          /* Restore Flash Button */

          options.forEach(function (option) {

            option.classList.remove("active");

          });


          const flashOption =
            document.querySelector(
              '.option[data-type="flash"]'
            );


          if (flashOption) {

            flashOption.classList.add("active");

          }


          /* Clear selected design */

          const selectedDesignInput =
            document.getElementById(
              "selectedFlashDesign"
            );


          if (selectedDesignInput) {

            selectedDesignInput.value =
              "";

          }


          /* Remove selected design outline */

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
     THIS STAYS AT THE BOTTOM
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


        console.log(
          "Payment being submitted:",
          payment
        );


        try {

          const response =
            await fetch(
              SUPABASE_URL +
              "/functions/v1/submit-gift-card",
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


  const selectedFlashDesignInput =
    document.getElementById(
      "selectedFlashDesign"
    );


  if (flashDesignGallery) {

    async function loadFlashDesigns() {

      try {

        const response =
          await fetch(
            SUPABASE_URL +
            "/rest/v1/flash_designs?select=name,image_url",
            {
              method: "GET",

              headers: {
                "apikey":
                  SUPABASE_PUBLISHABLE_KEY,

                "Accept":
                  "application/json"
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


        console.log(
          "Flash designs loaded:",
          designs
        );


        /* =========================
           NO DESIGNS
        ========================= */

        if (!Array.isArray(designs) ||
            designs.length === 0) {

          flashDesignGallery.innerHTML =
            "<p>No flash designs available yet.</p>";

          return;

        }


        /* Clear loading message */

        flashDesignGallery.innerHTML =
          "";


        /* =========================
           CREATE DESIGN CARDS
        ========================= */

        designs.forEach(
          function (design, index) {

            const designNumber =
              String(index + 1)
                .padStart(2, "0");


            const designLabel =
              "Design " +
              designNumber;


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


            /* =========================
               IMAGE
            ========================= */

            const image =
              document.createElement("img");


            image.src =
              design.image_url;


            image.alt =
              designLabel;


            image.style.width =
              "100%";


            image.style.borderRadius =
              "8px";


            image.style.display =
              "block";


            image.onerror =
              function () {

                console.error(
                  "Could not load image:",
                  design.image_url
                );

                image.style.display =
                  "none";

              };


            card.appendChild(image);


            /* =========================
               DESIGN TITLE
            ========================= */

            const title =
              document.createElement("h3");


            title.textContent =
              designLabel;


            card.appendChild(title);


            /* =========================
               DATABASE NAME
            ========================= */

            if (design.name) {

              const name =
                document.createElement("p");


              name.textContent =
                design.name;


              card.appendChild(name);

            }


            /* =========================
               SELECT BUTTON
            ========================= */

            const button =
              document.createElement(
                "button"
              );


            button.type =
              "button";


            button.textContent =
              "Select this design";


            button.addEventListener(
              "click",
              function () {

                /* Save selected design */

                if (selectedFlashDesignInput) {

                  selectedFlashDesignInput.value =
                    designLabel;

                }


                /* Remove previous selection */

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


                /* Highlight selected card */

                card.style.outline =
                  "3px solid #d4af37";


                console.log(
                  "Selected flash design:",
                  designLabel
                );

              }
            );


            card.appendChild(button);


            /* Add card to gallery */

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


    /* Load designs */

    loadFlashDesigns();

  }

});

               
