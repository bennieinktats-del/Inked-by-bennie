 document.addEventListener("DOMContentLoaded", function () {
    /* =========================
     PREFILL PAYMENT FORM
  ========================= */

  const paymentParams = new URLSearchParams(
    window.location.search
  );

  const paymentForm = document.getElementById("giftCardForm");

  if (paymentForm) {
    const name = paymentParams.get("name");
    const email = paymentParams.get("email");
    const reference = paymentParams.get("reference");
    const amount = paymentParams.get("amount");

    if (name) {
      paymentForm.querySelector('[name="name"]').value = name;
    }

    if (email) {
      paymentForm.querySelector('[name="email"]').value = email;
    }

    if (reference) {
      paymentForm.querySelector('[name="booking_reference"]').value =
        reference;
    }

    if (amount) {
      paymentForm.querySelector('[name="gift_card_amount"]').value =
        amount;
    }
  }

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


        try {

          const response =
            await fetch(
              SUPABASE_URL +
              "/functions/v1/submit_booking",
              {
                method: "POST",

               headers: {
  "Content-Type": "application/json",
  "apikey": SUPABASE_PUBLISHABLE_KEY,
  "Authorization": "Bearer " + SUPABASE_PUBLISHABLE_KEY
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
  "BOOKING ERROR:\n\n" +
  errorText
);

            return;
          }


          alert(
  "Booking submitted successfully! ❤️\n\n" +
  "You will receive an email within 5 minutes with further information and instructions on how to make your deposit.\n\n" +
  "Please check your Spam or Junk folder if you do not see the email in your inbox.\n\n" +
  "Please note: The final price of your tattoo may vary when your booking is approved. Pricing depends on the actual size, depth/detail, placement/position, and type of tattoo, including henna."
);


          bookingForm.reset();


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


          const selectedDesignInput =
            document.getElementById(
              "selectedFlashDesign"
            );


          if (selectedDesignInput) {
            selectedDesignInput.value = "";
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
     STAYS AT BOTTOM OF PAGE
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
              SUPABASE_URL +
              "/functions/v1/submit-gift-card",
              {
                method: "POST",

                 headers: {
  "Content-Type": "application/json",
  "apikey": SUPABASE_PUBLISHABLE_KEY
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
  ========================= */

  const flashDesignGallery =
    document.getElementById(
      "flashDesignGallery"
    );

  const selectedFlashDesignInput =
    document.getElementById(
      "selectedFlashDesign"
    );


  if (!flashDesignGallery) {

    console.error(
      "FLASH GALLERY ERROR: #flashDesignGallery was not found."
    );

    return;
  }


  /* =========================
     LOAD FLASH DESIGNS
  ========================= */

  async function loadFlashDesigns() {

    flashDesignGallery.innerHTML =
      "<p>Loading flash designs...</p>";


    try {

      console.log(
        "Starting flash design request..."
      );


      const url =
        SUPABASE_URL +
        "/rest/v1/flash_designs" +
        "?select=name,image_url,price";


      const response =
        await fetch(
          url,
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


      console.log(
        "Flash design HTTP status:",
        response.status
      );


      const responseText =
        await response.text();


      console.log(
        "Flash design response:",
        responseText
      );


      if (!response.ok) {

        flashDesignGallery.innerHTML =
          "<p>Unable to load flash designs.</p>";

        console.error(
          "SUPABASE FLASH DESIGN ERROR:",
          response.status,
          responseText
        );

        return;
      }


      let designs;


      try {

        designs =
          JSON.parse(responseText);

      } catch (parseError) {

        flashDesignGallery.innerHTML =
          "<p>Unable to load flash designs.</p>";

        console.error(
          "FLASH DESIGN JSON ERROR:",
        parseError
        );

        return;
      }


      if (!Array.isArray(designs)) {

        flashDesignGallery.innerHTML =
          "<p>Unable to load flash designs.</p>";

        console.error(
          "FLASH DESIGN DATA IS NOT AN ARRAY:",
          designs
        );

        return;
      }


      if (designs.length === 0) {

        flashDesignGallery.innerHTML =
          "<p>No flash designs available yet.</p>";

        return;
      }


      /* =========================
         DISPLAY DESIGNS
      ========================= */

      flashDesignGallery.innerHTML =
        "";


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
                "FLASH IMAGE FAILED:",
                design.image_url
              );

              image.alt =
                "Flash design image could not be loaded.";

            };


          card.appendChild(image);


          /* =========================
             TITLE
          ========================= */

          const title =
            document.createElement("h3");


          title.textContent =
            designLabel;


          card.appendChild(title);


          /* =========================
             DESIGN NUMBER
          ========================= */

          if (design.name) {

            const name =
              document.createElement("p");


            name.textContent =
              "Flash number: " +
              design.name;


            card.appendChild(name);

          }


          /* =========================
             PRICE
          ========================= */

          if (
            design.price !== null &&
            design.price !== undefined
          ) {

            const price =
              document.createElement("p");


            price.textContent =
              "$" +
              design.price;


            card.appendChild(price);

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

              if (selectedFlashDesignInput) {

                selectedFlashDesignInput.value =
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


              console.log(
                "Selected flash design:",
                designLabel
              );

            }
          );


          card.appendChild(button);


          flashDesignGallery.appendChild(
            card
          );

        }
      );


    } catch (error) {

      console.error(
        "FLASH DESIGN FETCH ERROR:",
        error
      );


      flashDesignGallery.innerHTML =
        "<p>Unable to load flash designs.</p>";

    }

  }


  /* =========================
     START GALLERY
  ========================= */

  loadFlashDesigns();

});
