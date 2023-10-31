const formContainer = document.querySelector('.container');
const successContainer = document.querySelector('.success-container');
const emailField = document.querySelector('#mail-field');
const submitBtn = document.querySelector('#submit-btn');
const dismissMsgBtn = document.querySelector('#dismissMsg-Btn');
const showUserEmail = document.querySelector('#showUserEmail');
const errorLegend = document.querySelector('#error-legend');


function main() {

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const email = emailField.value;

        if (!emailField.validity.valid) {
            errorLegend.style.visibility = 'visible';
            emailField.classList.add('error');
        }
        else {
            formContainer.style.display = "none";
            successContainer.style.display = "block";
            showUserEmail.innerHTML = email;
            emailField.classList.remove('error');
            errorLegend.style.visibility = 'hidden';
        }
    });

    dismissMsgBtn.addEventListener("click", (event) => {
        event.preventDefault();
        formContainer.style.display = "flex";
        successContainer.style.display = "none";
        emailField.value = '';
    });

}
main();