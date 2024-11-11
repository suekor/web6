document.getElementById("background-color-button").addEventListener("click", function() {
  document.body.style.backgroundColor = getRandomColor();
});


function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayCurrentTime() {
  var currentTime = new Date();

  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  var day = currentTime.getDate();  
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var month = monthNames[currentTime.getMonth()];  

  var fullDate = `${month} ${day}, ${hours}:${minutes}:${seconds}`;

  document.getElementById("current-time").innerHTML = fullDate;
}


setInterval(displayCurrentTime, 1000);


function toggleAccordion(event) {
  const content = event.target.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', toggleAccordion);

  const content = header.nextElementSibling;
  content.style.display = "none";
});



document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function() {
      const value = this.getAttribute('data-value');


      document.querySelectorAll('.star').forEach(star => {
          star.classList.remove('active');
      });

      document.querySelectorAll('.star').forEach(star => {
          if (star.getAttribute('data-value') <= value) {
              star.classList.add('active');
          }
      });


      const sound = document.getElementById('notification-sound');
      sound.currentTime = 0; 
      sound.play(); 
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('theme-switch');
  
  if (!button) {
    console.error('Button with id "theme-switch" not found!');
    return;
  }


  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'night') {
    document.body.classList.add('night-theme');
    button.textContent = 'Switch to Day Theme';
  } else {
    document.body.classList.remove('night-theme');
    button.textContent = 'Switch to Night Theme';
  }
  

  button.addEventListener('click', () => {
    document.body.classList.toggle('night-theme');
    
    if (document.body.classList.contains('night-theme')) {
      localStorage.setItem('theme', 'night');
      button.textContent = 'Switch to Day Theme';
    } else {
      localStorage.setItem('theme', 'day');
      button.textContent = 'Switch to Night Theme';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  let currentIndex = 0;


  function updateFocus(index) {
    navLinks.forEach((link, i) => {
      link.classList.remove('active'); 
      if (i === index) {
        link.classList.add('active'); 
        link.focus(); 
      }
    });
  }


  updateFocus(currentIndex);


  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % navLinks.length; 
      updateFocus(currentIndex);
      event.preventDefault(); 
    } else if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length; 
      updateFocus(currentIndex);
      event.preventDefault(); 
    }
  });
});




const sandwiches = [
  {
    title: "Classic tuna with avocado",
    description: "A timeless favorite with premium tuna, cheddar cheese, and fresh avocado.",
    imgSrc: "https://img.iamcook.ru/2023/upl/recipes/cat/u-674ab21b9fd2a4b46bb719b44692fa74.jpg"
  },
  {
    title: "Turkey with greens",
    description: "Juicy turkey breast, lettuce, and crisp vegetables in whole grain bread.",
    imgSrc: "https://images.gastronom.ru/UkY4hJATUJpFTsm3f1yoFzzSl6GPl5_DTDg4dPqXp_A/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzY3Mjc3NTUzLTUxYjUtNDQzNS1iNDM3LTllNDY0MDAxZTVmMy5qcGc.webp"
  },
  {
    title: "Grilled Chicken",
    description: "Grilled chicken, romaine lettuce, and Caesar dressing in a soft tortilla wrap.",
    imgSrc: "https://static.1000.menu/img/content-v2/1d/ac/17587/klab-sendvich-s-kuricei_1622956953_19_max.jpg"
  }
];


function createSandwichCard(sandwich) {
  return `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card">
        <img class="card-img-top" src="${sandwich.imgSrc}" alt="${sandwich.title}" />
        <div class="card-body">
          <h5 class="card-title">${sandwich.title}</h5>
          <p class="card-text">${sandwich.description}</p>
        </div>
      </div>
    </div>
  `;
}


function renderSandwiches(sandwiches, renderFunction) {
  const menuContainer = document.getElementById("menu");
  const sandwichesRow = menuContainer.querySelector('.sandwich-row');
  sandwichesRow.innerHTML = ''; 

  sandwiches.forEach(sandwich => {
    const sandwichCard = renderFunction(sandwich);
    sandwichesRow.innerHTML += sandwichCard;
  });
}


function filterSandwiches(sandwiches, criteria) {
  return sandwiches.filter(sandwich => sandwich.title.toLowerCase().includes(criteria.toLowerCase()));
}


function saveFilterToLocalStorage(criteria) {
  localStorage.setItem('filterCriteria', criteria);
}


function loadFilterFromLocalStorage() {
  return localStorage.getItem('filterCriteria') || '';
}


document.getElementById("filter-button").addEventListener("click", function() {
  const criteria = document.getElementById("filter-input").value;
  saveFilterToLocalStorage(criteria); 
  const filteredSandwiches = filterSandwiches(sandwiches, criteria);
  renderSandwiches(filteredSandwiches, createSandwichCard);
});


document.addEventListener("DOMContentLoaded", () => {
  const savedCriteria = loadFilterFromLocalStorage(); 
  document.getElementById("filter-input").value = savedCriteria; 
  const filteredSandwiches = filterSandwiches(sandwiches, savedCriteria); 
  renderSandwiches(filteredSandwiches, createSandwichCard); 
});



 // Модальные окна
const profileBtn = document.getElementById('profile-btn');
const modal = document.getElementById('modal');
const profileModal = document.getElementById('profile-modal');
const closeBtn = document.getElementById('close-btn');
const closeProfileBtn = document.getElementById('close-profile-btn');
const form = document.getElementById('form');
const profileInfo = document.getElementById('profile-info');
const logoutBtn = document.getElementById('logout-btn'); // Кнопка для выхода из аккаунта
const switchBtn = document.getElementById('switch-btn'); // Кнопка переключения между регистрацией и авторизацией
const passwordError = document.getElementById('password-error'); // Сообщение о несовпадении паролей

let isLoggedIn = false;
let userData = JSON.parse(localStorage.getItem('userData')) || {}; // Данные пользователя из localStorage

// Проверяем, если данные о пользователе есть в localStorage, то помечаем, что он зарегистрирован
if (userData.email && userData.password) {
    isLoggedIn = true;
}

// Обработчик нажатия на кнопку "Профиль"
profileBtn.addEventListener('click', () => {
    if (!userData.email) {
        // Если не зарегистрирован, показываем окно регистрации
        modal.style.display = 'block';
        document.getElementById('modal-title').textContent = 'Registration';
        document.getElementById('confirm-password').style.display = 'block'; // Показываем поле подтверждения пароля
    } else if (!isLoggedIn) {
        // Если зарегистрирован, но не авторизован, показываем окно авторизации
        modal.style.display = 'block';
        document.getElementById('modal-title').textContent = 'Authorization';
        document.getElementById('confirm-password').style.display = 'none'; // Скрываем поле подтверждения пароля
    } else {
        // Если и зарегистрирован, и авторизован, показываем профиль
        profileModal.style.display = 'block';
        profileInfo.innerHTML = `Name: ${userData.username}<br>Email: ${userData.email}`;
    }
});

// Закрытие модальных окон
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeProfileBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

// Функция для проверки правильного формата email с помощью регулярного выражения
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Обработка формы регистрации/авторизации
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const isRegistration = document.getElementById('modal-title').textContent === 'Registration';

    // Проверка формата email
    if (!isValidEmail(email)) {
        alert('Invalid email format!');
        return;
    }

    // Дополнительная проверка паролей при регистрации
    if (isRegistration) {
        if (password !== confirmPassword) {
            passwordError.style.display = 'block';
            return;
        } else {
            passwordError.style.display = 'none';
        }

        // Регистрация пользователя
        userData = { username, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('You have registered successfully!');
    } else {
        // Авторизация пользователя
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData.username === username && storedUserData && storedUserData.email === email && storedUserData.password === password) {
            isLoggedIn = true;
            alert('You have been successfully logged in!');
        } else {
            alert('Incorrect username or email or password!');
        }
    }

    modal.style.display = 'none';
});

// Обработчик для кнопки "Выйти"
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userData');
    isLoggedIn = false;
    alert('You have successfully logged out of your account!');
    profileModal.style.display = 'none';
    location.reload();
});

// Функция для переключения между регистрацией и авторизацией
switchBtn.addEventListener('click', () => {
    const modalTitle = document.getElementById('modal-title').textContent;
    if (modalTitle === 'Registration') {
        // Переключение на авторизацию
        document.getElementById('modal-title').textContent = 'Authorization';
        switchBtn.textContent = 'Proceed to registration';
        document.getElementById('confirm-password').style.display = 'none'; // Скрываем поле подтверждения пароля
    } else {
        // Переключение на регистрацию
        document.getElementById('modal-title').textContent = 'Registration';
        switchBtn.textContent = 'Proceed to authorization';
        document.getElementById('confirm-password').style.display = 'block'; // Показываем поле подтверждения пароля
    }

    // Очищаем поля для нового ввода
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
    passwordError.style.display = 'none'; // Скрываем сообщение о несовпадении паролей
});
