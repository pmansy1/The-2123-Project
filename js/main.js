
const btn = document.querySelector('#themeColor');

function bgChange() {
    const currentColor = getComputedStyle(document.body).backgroundColor;

    if (currentColor === 'rgb(0, 65, 121)') {
        document.body.style.backgroundColor = 'rgb(112,112,112)';
    } else if (currentColor === 'rgb(112,112,112)') {
        document.body.style.backgroundColor = 'rgb(0, 65, 121)';
    } else {
        // default fallback (optional)
        document.body.style.backgroundColor = 'rgb(0, 65, 121)';
    }
}
btn.onclick = bgChange;
/***** Form Handling *****/
const addParticipant = (person) => {
    let rsvpList = document.getElementById('rsvpList');
    let li = document.createElement('li');
    li.textContent = `${person.name} – ${person.comment}`;
    rsvpList.appendChild(li);
};

/***** Form Validation *****/
const validateForm = (event) => {
    event.preventDefault(); // Prevent page reload

    let containsErrors = false;
    const rsvpInputs = document.querySelectorAll('.rsvp-input');


    for (let i = 0; i < rsvpInputs.length; i++) {
        const input = rsvpInputs[i];
        if (input.value.trim().length < 2) {
            containsErrors = true;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    let person = {
        name: rsvpInputs[0].value,
        emailL: rsvpInputs[1].value,
        comment: rsvpInputs[2].value,
    };

    if (!containsErrors) {
        addParticipant(person);
        toggleModal(person);

        for (let i = 0; i < rsvpInputs.length; i++)
            rsvpInputs[i].value = "";
    }
};

// Step 3: Add a click event listener to the submit RSVP button here
const rsvpForm = document.getElementById('rsvpForm');
rsvpForm.addEventListener('submit', validateForm);



// MODAL
const toggleModal = (person) => {
    let modal = document.getElementById('success-modal'); // TODO
    let modalContent = document.getElementById('modal-item'); // TODO
    modal.style.display = 'flex';
    modalContent.textContent = `Congratulations ${person.name}! You are officially signed up to attend the Project 2123 Exhibit. Can't wait to see you there!`;



    // Set modal timeout to 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 5000);

    let intervalId = setInterval(animateImage, 900);
    setTimeout(() => {
        clearInterval(intervalId);
    }, 5000);


}
// TODO: animation variables and animateImage()
let rotateFactor = 0;
let modalImage = document.getElementById('modal-img');

function animateImage() {
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else if (rotateFactor === -10) {
        rotateFactor = 0;
    }
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    setTimeout(animateImage, 1000);
}
