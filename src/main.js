const regiseterModal = document.getElementById('register-modal');
const closeRegisterModalBtn = document.getElementById(
  'close-register-modal-btn'
);
const signUpBtn = document.getElementById('sign-up');
const registerForm = document.getElementById('register-form');

const registerFormContainer = document.getElementById(
  'register-form-container'
);
const thankYouContainer = document.getElementById('thank-you');

// form elements
const email = document.getElementById('email-input-container');
const emailInput = email.querySelector('input');
const password = document.getElementById('password-input-container');
const passwordInput = password.querySelector('input');
const emailErrMsg = email.querySelector('.error-message');
const passwordErrMsg = password.querySelector('.error-message');

signUpBtn.addEventListener('click', () => {
  regiseterModal.showModal();
  // ensure that body cannot be scrolled when dialog is open
  document.body.classList.add('modal-open');
});

closeRegisterModalBtn.addEventListener('click', () => {
  regiseterModal.close();
  registerFormContainer.classList.add('show');
  thankYouContainer.classList.remove('show');
  document.body.classList.remove('modal-open');

  emailInput.value = '';
  passwordInput.value = '';
});

registerForm.addEventListener('submit', submitForm);

async function submitForm(event) {
  event.preventDefault();

  let isValid = true;

  // reset errors
  emailErrMsg.textContent = '';
  passwordErrMsg.textContent = '';
  email.classList.remove('error');
  password.classList.remove('error');

  // email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value) {
    emailErrMsg.textContent = 'Email required';
    email.classList.add('error');
    isValid = false;
  } else if (!emailPattern.test(emailInput.value)) {
    emailErrMsg.textContent = 'Please enter a valid e-mail';
    email.classList.add('error');
    isValid = false;
  }

  // password validation
  if (!passwordInput.value) {
    passwordErrMsg.textContent = 'Password required';
    password.classList.add('error');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const payload = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch('/api/identity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Response from server:', data);

    registerFormContainer.classList.remove('show');
    thankYouContainer.classList.add('show');
  } catch (error) {
    console.error('Error submitting JSON:', error);
  }
}
