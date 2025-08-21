const passwordInput = document.getElementById('senha');
const togglePasswordBtn = document.getElementById('toggle-password-btn');
const newPasswordInput = document.getElementById('nova-senha');
const toggleNewPasswordBtn = document.getElementById('toggle-newPassword-btn');

togglePasswordBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    console.log('click')
  } else {
    passwordInput.type = 'password';
    console.log('click')
  }
});

toggleNewPasswordBtn.addEventListener('click', () => {
  if (newPasswordInput.type === 'password') {
    newPasswordInput.type = 'text';
    console.log('click')
  } else {
    newPasswordInput.type = 'password';
    console.log('click')
  }
});