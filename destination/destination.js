
// import { Timestamp} from "firebase/firestore/lite";

// document.addEventListener("DOMContentLoaded", () => {
//     const bookButtons = document.querySelectorAll(".book-now");

//     bookButtons.forEach((button) => {
//         button.addEventListener("click", (event) => {
//             const card = event.target.closest(".card");
//             const placeName = card.dataset.place;
//             const placeDescription = card.dataset.description;

//             openBookingPage(placeName, placeDescription);
//         });
//     });
// });

// function openBookingPage(placeName, placeDescription) {
//     const bookingPage = document.createElement("div");
//     bookingPage.classList.add("booking-page");
//     bookingPage.innerHTML = `
//         <h2>Book Your Stay at ${placeName}</h2>
//         <p>${placeDescription}</p>
//         <form class="booking-form">
//             <label for="visitors">Number of Visitors:</label>
//             <input type="number" id="visitors" name="visitors" min="1" required> 
//             <label for="days">Number of Stay Days:</label>
//             <input type="number" id="days" name="days" min="1" required>
//             <label for="meals">Full Board Meals:</label>
//             <select id="meals" name="meals" required>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//             </select>
//             <label for="additional">Additional Requests:</label>
//             <textarea id="additional" name="additional"></textarea>
//             <button type="submit" class="intaSendPayButton">Confirm Booking</button>
//         </form>
//         <button class="btn back-btn">Back</button>
//     `;

//     document.body.innerHTML = "";
//     document.body.appendChild(bookingPage);

//     document.querySelector(".back-btn").addEventListener("click", () => {
//         location.reload(); // Reload the page to go back to the main list
//     });

//     document
//         .querySelector(".booking-form")
//         .addEventListener("submit", handleBookingFormSubmit);
// }

// function handleBookingFormSubmit(event) {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);

//     const bookingDetails = {
//         visitors: formData.get("visitors"),
//         days: formData.get("days"),
//         meals: formData.get("meals"),
//         additional: formData.get("additional"),
       
//     };

//     // Proceed to IntaSend Payment
//     triggerIntaSendPayment(bookingDetails);
// }

// function triggerIntaSendPayment(bookingDetails) {
//     const paymentButton = document.querySelector(".intaSendPayButton");

//     if (!paymentButton) {
//         console.error("IntaSend payment button not found");
//         return;
//     }

//     // Initialize IntaSend
//     const intasend = new window.IntaSend({
//         publicAPIKey: "ISPubKey_test_ee5f4860-80fb-4670-a8ef-3258658af886",
//         live: false, // set to true when going live
//     });

//     // Attach event listeners
//     intasend.on("COMPLETE", (results) => {
//         console.log("Payment successful", results);
//         saveBookingToFirebaseStore(bookingDetails);
//         // Handle successful payment (e.g., save booking details to your database)
//     });
//     intasend.on("FAILED", (results) => {
//         console.log("Payment failed", results);
//         // Handle payment failure
//     });
//     intasend.on("IN-PROGRESS", (results) => {
//         console.log("Payment in progress", results);
//     });

//     // Update the button attributes
//     paymentButton.dataset.amount = calculateBookingAmount(bookingDetails); // Replace with actual amount based on bookingDetails
//     paymentButton.dataset.currency = "KES";

//     // Simulate button click
//     paymentButton.click();
// }
// function calculateBookingAmount(bookingDetails) {
//     const price_per_night = 1000;
//     const mealPrice = bookingDetails.meals === "yes" ? 500 : 0;
//     return (price_per_night + mealPrice) * bookingDetails.visitors * bookingDetails.days;
// }
// function saveBookingToFirebase(bookingDetails) {
//     const user = firebase.auth().currentUser;  // Get the currently logged-in user
//     if (user) {

//         const userId = user.uid; 
//         const userEmail = user.email;
        
        
//         constdbRef = ref(database, "bookings/" + userId);
//         setInterval(dbRef, {
//             userEmail,
//             userId,
//             ...bookingDetails,
//             time: Timestamp.now(),
//         })
//         .then(() => {
//             console.log("Booking saved to Firebase successfully");
//             // optionally,show a success message to the user
//         })
//         .catch((error) => {
//             console.error("Error saving booking to Firebase:", error);
//             // optionally show an error message to the user
//         });
        
        
        
        
//     } else {
//         console.log("No user signed in")
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
    const bookButtons = document.querySelectorAll(".book-now");

    bookButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            const placeName = card.dataset.place;
            const placeDescription = card.dataset.description;

            openBookingPage(placeName, placeDescription);
        });
    });
});

function openBookingPage(placeName, placeDescription) {
    const bookingPage = document.createElement("div");
    bookingPage.classList.add("booking-page");
    bookingPage.innerHTML = `
        <h2>Book Your Stay at ${placeName}</h2>
        <p>${placeDescription}</p>
        <form class="booking-form">
            <label for="visitors">Number of Visitors:</label>
            <input type="number" id="visitors" name="visitors" min="1" required>
            <label for="days">Number of Stay Days:</label>
            <input type="number" id="days" name="days" min="1" required>
            <label for="meals">Full Board Meals:</label>
            <select id="meals" name="meals" required>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="additional">Additional Requests:</label>
            <textarea id="additional" name="additional"></textarea>
            <button type="submit" class="intaSendPayButton">Confirm Booking</button>
        </form>
        <button class="btn back-btn">Back</button>
    `;

    document.body.innerHTML = "";
    document.body.appendChild(bookingPage);

    document.querySelector(".back-btn").addEventListener("click", () => {
        location.reload(); // Reload the page to go back to the main list
    });

    document
        .querySelector(".booking-form")
        .addEventListener("submit", (event) => handleBookingFormSubmit(event, placeName, placeDescription));
}

function handleBookingFormSubmit(event, placeName, placeDescription) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const bookingDetails = {
        placeName,
        placeDescription,
        visitors: formData.get("visitors"),
        days: formData.get("days"),
        meals: formData.get("meals"),
        additional: formData.get("additional"),
    };

    // Proceed to IntaSend Payment
    triggerIntaSendPayment(bookingDetails);
}

function triggerIntaSendPayment(bookingDetails) {
    const paymentButton = document.querySelector(".intaSendPayButton");

    if (!paymentButton) {
        console.error("IntaSend payment button not found");
        return;
    }

    // Initialize IntaSend
    const intasend = new window.IntaSend({
        publicAPIKey: "ISPubKey_test_ee5f4860-80fb-4670-a8ef-3258658af886",
        live: false, // set to true when going live
    });

    // Attach event listeners
    intasend.on("COMPLETE", (results) => {
        console.log("Payment successful", results);
        saveBookingToFirebase(bookingDetails);
        // Handle successful payment (e.g., save booking details to your database)
    });
    intasend.on("FAILED", (results) => {
        console.log("Payment failed", results);
        // Handle payment failure
    });
    intasend.on("IN-PROGRESS", (results) => {
        console.log("Payment in progress", results);
    });

    // Update the button attributes
    paymentButton.dataset.amount = calculateBookingAmount(bookingDetails); // Replace with actual amount based on bookingDetails
    paymentButton.dataset.currency = "KES";

    // Simulate button click
    paymentButton.click();
}

function calculateBookingAmount(bookingDetails) {
    const price_per_night = 1000;
    const mealPrice = bookingDetails.meals === "yes" ? 500 : 0;
    return (price_per_night + mealPrice) * bookingDetails.visitors * bookingDetails.days;
}

function saveBookingToFirebase(bookingDetails) {
    const user = firebase.auth().currentUser;  // Get the currently logged-in user
    if (user) {
        const userId = user.uid; 
        const userEmail = user.email;

        const dbRef = ref(database, "bookings/" + userId);
        set(dbRef, {
            userEmail,
            userId,
            ...bookingDetails,
            time: Timestamp.now(),
        })
        .then(() => {
            console.log("Booking saved to Firebase successfully");
            // optionally, show a success message to the user
        })
        .catch((error) => {
            console.error("Error saving booking to Firebase:", error);
            // optionally show an error message to the user
        });
    } else {
        console.log("No user signed in");
    }
}




