// get input form html
const emailInput = document.querySelector('[name="email"]');
const passwordInput = document.querySelector('[name="password"]');
const submitButton = document.querySelector('[name="submitBtn"]');

const dataUser = {};

const validEmail = (email) => {
  const atSymbol = email.indexOf('@');
  const dotSymbol = email.indexOf('.', atSymbol);

  if (atSymbol !== -1 && dotSymbol > atSymbol + 1) {
    return true;
  }

  return false;
};
const validPassword = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const domainEmailchecked = email.slice(email.indexOf('@') + 1);

  const allowDomainEmail = [
    'gmail.com',
    'proton.com',
    'proton.me',
    'yahoo.com',
   
  ];

  if (email === '' || password === '') {
    alert('silahkan lengkapi formnya');
    return;
  }

  if (!validEmail(email)) {
    alert('Email tidak valid. Mohon masukkan email yang sesuai.');
    emailInput.focus();
    return;
  }

  if (!allowDomainEmail.includes(domainEmailchecked)) {
    alert('Domain email tidak diperbolehkan');
    emailInput.focus();
    return;
  }
  if (!validPassword(password)) {
    alert('password kurang dari 6 character');
    password.focus();
    return;
  }

  dataUser.email = email;
  dataUser.password = password;
  alert('data berhasil masuk.');
  console.log(dataUser);
});
