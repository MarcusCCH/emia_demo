const catEl = document.querySelector('.cat');
const feedBtnEl = document.querySelector('.feed-btn');
const playBtnEl = document.querySelector('.play-btn');
const cleanBtnEl = document.querySelector('.clean-btn');

let hunger = 80;
let happiness = 80;
let cleanliness = 80;

// Get the clock element from the DOM
let clock1 = document.getElementById("clock1");
let clock2 = document.getElementById("clock2");

// Update the clock display every second
let interval = setInterval(function () {
    // Get the current date and time
    let now = new Date();

    // Format the time in 12-hour format
    let hours = now.getHours() % 12 || 12;
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = now.getHours() >= 12 ? "PM" : "AM";

    // Update the clock display
    clock1.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    clock2.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}, 1000);


function updateCat() {
    // Update the cat image based on its status
    // if (hunger > 75 && happiness > 75 && cleanliness > 75) {
    //     catEl.innerHTML = '<img class="cat-image" src="cat-happy.png" alt="Virtual Cat">';
    //     console.log("here");
    // } else if (hunger < 25 && happiness < 25 && cleanliness < 25) {
    //     catEl.innerHTML = '<img class="cat-image" src="cat-sad.png" alt="Virtual Cat">';
    // } else {
    //     catEl.innerHTML = '<img class="cat-image" src="cat.png" alt="Virtual Cat">';
    // }
    console.log(hunger, happiness, cleanliness);
}

function feedCat() {
    // Increase the cat's hunger
    console.log("feed");

    hunger += 10;
    if (hunger > 100) {
        hunger = 100;
    }

    // Decrease the cat's happiness and cleanliness
    happiness -= 5;
    if (happiness < 0) {
        happiness = 0;
    }
    cleanliness -= 5;
    if (cleanliness < 0) {
        cleanliness = 0;
    }

    updateCat();
}

function playWithCat() {
    console.log("play");

    // Increase the cat's happiness
    happiness += 10;
    if (happiness > 100) {
        happiness = 100;
    }

    // Decrease the cat's hunger and cleanliness
    hunger -= 5;
    if (hunger < 0) {
        hunger = 0;
    }
    cleanliness -= 5;
    if (cleanliness < 0) {
        cleanliness = 0;
    }

    updateCat();
}

function cleanCat() {
    console.log("clean");


    // Increase the cat's cleanliness
    cleanliness += 10;
    if (cleanliness > 100) {
        cleanliness = 100;
    }

    // Decrease the cat's hunger and happiness
    hunger -= 5;
    if (hunger < 0) {
        hunger = 0;
    }
    happiness -= 5;
    if (happiness < 0) {
        happiness = 0;
    }

    updateCat();
}

// Add event listeners to the buttons
feedBtnEl.addEventListener('click', feedCat);
playBtnEl.addEventListener('click', playWithCat);
cleanBtnEl.addEventListener('click', cleanCat);

// Update the cat image on load
updateCat();

