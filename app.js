function Customer(fullName, password, dob,email, phone, imageUrl) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.email = email
  this.phone = phone;
  this.imageUrl = imageUrl;
}

function run() {
  const cardsSection = document.getElementById('customer-cards');
  cardsSection.textContent = '';

  const storedOrders = localStorage.getItem('customerOrders');
  const customerOrders = storedOrders ? JSON.parse(storedOrders) : [];

  customerOrders.forEach((customer) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = customer.imageUrl || 'assets/default-avatar.png';
    img.alt = `${customer.fullName}'s image`;

    const name = document.createElement('p');
    name.textContent = `Full Name: ${customer.fullName}`;

    const password = document.createElement('p');
    password.textContent = `Password: ${'*'.repeat(customer.password.length)}`;

    const dob = document.createElement('p');
    dob.textContent = `Date of Birth: ${customer.dob}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${customer.email}`;

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${customer.phone}`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(password);
    card.appendChild(dob);
    card.appendChild(email);
    card.appendChild(phone);

    cardsSection.appendChild(card);
  });
}

document.getElementById('order-form').addEventListener('submit', function (sub) {
  sub.preventDefault();

  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  let isValid = true; 

  const fullName = document.getElementById('fullName').value;
const fullNameRegex = /\s/g; 
if (fullNameRegex.test(fullName)) {
  isValid = false;
  document.getElementById('usernameError').textContent = 'Username must not contain spaces.';
}
  const storedOrders = localStorage.getItem('customerOrders');
  const customerOrders = storedOrders ? JSON.parse(storedOrders) : [];
  
  const nameExists = customerOrders.some(customer => customer.fullName === fullName);
  if (nameExists) {
    alert('This username is already taken. Please choose a different one.');
    return;
  }


  const password = document.getElementById('password').value;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{9,}$/;
  if (!passwordRegex.test(password)) {
    isValid = false;
    document.getElementById('passwordError').textContent = 'Password must be at least 9 characters long, contain a number, an uppercase letter, and a special character.';
  }

  const dob = document.getElementById('dob').value;
  if (!dob) {
    isValid = false;
    document.getElementById('birthdayError').textContent = 'Please enter a valid date in YYYY-MM-DD format.';
  }

  const email = document.getElementById('email').value;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    isValid = false;
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
  }

  const phone = document.getElementById('phone').value;
  const phoneRegex = /^07\d{8}$/;
  if (!phoneRegex.test(phone)) {
    isValid = false;
    document.getElementById('phoneError').textContent = 'Phone number must be 10 digits and start with 07.';
  }

  if (!isValid) return;

  const imageInput = document.getElementById('image');
  const imageUrl = imageInput.files.length ? URL.createObjectURL(imageInput.files[0]) : 'assets/default-avatar.png';

  const newCustomer = new Customer(fullName, password, dob, email, phone, imageUrl);


  customerOrders.push(newCustomer);
  localStorage.setItem('customerOrders', JSON.stringify(customerOrders));

  document.getElementById('order-form').reset();
  run();
});
function clearName() {
  localStorage.clear();
  document.getElementById('customer-cards').textContent = '';
}

