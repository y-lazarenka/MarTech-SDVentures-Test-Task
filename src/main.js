const regiseterModal = document.getElementById('register-modal');
const closeRegisterModalBtn = document.getElementById(
  'close-register-modal-btn'
);
const signUpBtn = document.getElementById('sign-up');

signUpBtn.addEventListener('click', () => {
  regiseterModal.showModal();
  // ensure that body cannot be scrolled when dialog is open
  document.body.classList.add('modal-open');
});

closeRegisterModalBtn.addEventListener('click', () => {
  regiseterModal.close();
  document.body.classList.remove('modal-open');
});
