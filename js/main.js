
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
const addParticipant = () => {
    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    const rsvpList = document.getElementById('rsvpList');
    const li = document.createElement('li');
    li.textContent = `${name} – ${comment}`;
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

    if (!containsErrors) {
        addParticipant();

        for (let i = 0; i < rsvpInputs.length; i++) {
            rsvpInputs[i].value = "";
        }
    }
};

// Step 3: Add a click event listener to the submit RSVP button here
const rsvpForm = document.getElementById('rsvpForm');
rsvpForm.addEventListener('submit', validateForm);
