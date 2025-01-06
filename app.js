let customerOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];

function Customer(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
}

function run() {
  const cardsSection = document.getElementById('customer-cards');
  cardsSection.innerHTML = ''; // Clear existing cards

  customerOrders.forEach((customer) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = customer.imageUrl || 'assets/default-avatar.png'; // Use default image if none provided
    img.alt = `${customer.fullName}'s image`;

    const name = document.createElement('p');
    name.textContent = `Full Name: ${customer.fullName}`;

    const dob = document.createElement('p');
    dob.textContent = `Date of Birth: ${customer.dob}`;

    const gender = document.createElement('p');
    gender.textContent = `Gender: ${customer.gender}`;

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${customer.phone}`;

    const orderType = document.createElement('p');
    orderType.textContent = `Order Type: ${customer.orderType.join(', ')}`;

    const orderOption = document.createElement('p');
    orderOption.textContent = `Order Option: ${customer.orderOption}`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(dob);
    card.appendChild(gender);
    card.appendChild(phone);
    card.appendChild(orderType);
    card.appendChild(orderOption);

    cardsSection.appendChild(card);
  });
}

document.getElementById('order-form').addEventListener('submit', function (sub) {
  sub.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phone = document.getElementById('phone').value;

  const orderType = Array.from(document.querySelectorAll('input[name="orderType"]:checked')).map(
    (checkbox) => checkbox.value
  );

  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  const imageInput = document.getElementById('image');
  const imageUrl = URL.createObjectURL(imageInput.files[0]);

  const newCustomer = new Customer(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl);

  customerOrders.push(newCustomer);

  localStorage.setItem('customerOrders', JSON.stringify(customerOrders));

  document.getElementById('order-form').reset();

  run();
});

run();
function clearName() {
    localStorage.clear();
    document.getElementById('customer-cards').textContent = '';}
