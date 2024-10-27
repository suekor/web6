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


document.getElementById("popup-button").addEventListener("click", function() {
  document.getElementById("popup-form").style.display = "block";
});


document.getElementById("close-button").addEventListener("click", function() {
  document.getElementById("popup-form").style.display = "none";
});


document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); 
  

  document.getElementById("error-message").textContent = '';
  

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;


  let errors = [];
  

  if (!name) {
    errors.push("Name is required.");
  }
  if (!email) {
    errors.push("Email is required.");
  } else {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }
  }
  
  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (errors.length > 0) {
    document.getElementById("error-message").textContent = errors.join(" ");
  } else {

    alert("Form submitted successfully!");
    document.getElementById("popup-form").style.display = "none"; 
  }
});
document.getElementById("reset-button").addEventListener("click", function() {
  document.querySelectorAll('#contact-form input, #contact-form select').forEach(input => {
    input.value = ''; 
  });
  document.getElementById("error-message").textContent = ''; 
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
      event.preventDefault(); // Prevent default scrolling
    } else if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length; // Move to the previous item
      updateFocus(currentIndex);
      event.preventDefault(); // Prevent default scrolling
    }
  });
});


// Функция для отображения приветствия в зависимости от времени суток
function displayGreeting() {
  const greetingElement = document.getElementById('greeting'); // Элемент для отображения приветствия
  const modal = document.getElementById('greeting-modal'); // Модальное окно
  const closeModalButton = document.getElementById('close-modal'); // Кнопка закрытия
  const currentHour = new Date().getHours(); // Получаем текущий час
  
  let greetingMessage; // Переменная для приветствия

  // Определяем приветствие в зависимости от времени суток
  switch (true) {
    case (currentHour >= 5 && currentHour < 12):
      greetingMessage = "Доброе утро!";
      break;
    case (currentHour >= 12 && currentHour < 18):
      greetingMessage = "Добрый день!";
      break;
    case (currentHour >= 18 && currentHour < 22):
      greetingMessage = "Добрый вечер!";
      break;
    default:
      greetingMessage = "Доброй ночи!";
  }

  // Устанавливаем текст приветствия
  greetingElement.textContent = greetingMessage;
  
  // Показываем модальное окно
  modal.style.display = 'block';

  // Закрытие модального окна по нажатию на кнопку
  closeModalButton.onclick = function() {
    modal.style.display = 'none';
  };

  // Закрытие модального окна по клику за его пределами
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

// Вызываем функцию при загрузке страницы
window.onload = displayGreeting;

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

// Функция для создания карточки сэндвича
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

// Функция для рендеринга сэндвичей
function renderSandwiches(sandwiches, renderFunction) {
  const menuContainer = document.getElementById("menu");
  const sandwichesRow = menuContainer.querySelector('.sandwich-row');
  sandwichesRow.innerHTML = ''; // Очищаем контейнер

  sandwiches.forEach(sandwich => {
    const sandwichCard = renderFunction(sandwich);
    sandwichesRow.innerHTML += sandwichCard;
  });
}

// Функция для фильтрации сэндвичей
function filterSandwiches(sandwiches, criteria) {
  return sandwiches.filter(sandwich => sandwich.title.toLowerCase().includes(criteria.toLowerCase()));
}

// Сохранение критерия фильтрации в localStorage
function saveFilterToLocalStorage(criteria) {
  localStorage.setItem('filterCriteria', criteria);
}

// Загрузка критерия фильтрации из localStorage
function loadFilterFromLocalStorage() {
  return localStorage.getItem('filterCriteria') || '';
}

// Обработчик события для фильтра
document.getElementById("filter-button").addEventListener("click", function() {
  const criteria = document.getElementById("filter-input").value;
  saveFilterToLocalStorage(criteria); // Сохранение критерия
  const filteredSandwiches = filterSandwiches(sandwiches, criteria);
  renderSandwiches(filteredSandwiches, createSandwichCard);
});

// Загрузка страницы
document.addEventListener("DOMContentLoaded", () => {
  const savedCriteria = loadFilterFromLocalStorage(); // Загружаем сохраненный фильтр
  document.getElementById("filter-input").value = savedCriteria; // Устанавливаем его в поле ввода
  const filteredSandwiches = filterSandwiches(sandwiches, savedCriteria); // Применяем фильтр
  renderSandwiches(filteredSandwiches, createSandwichCard); // Отображаем сэндвичи
});


// Проверяем, авторизован ли пользователь
function checkAuth() {
  const username = localStorage.getItem("username");
  if (username) {
      document.getElementById("display-username").textContent = username;
      document.getElementById("login-form").style.display = "none";
      document.getElementById("logout-form").style.display = "block";
  } else {
      document.getElementById("login-form").style.display = "block";
      document.getElementById("logout-form").style.display = "none";
  }
}

// Функция для логина
function login() {
  const username = document.getElementById("username").value;
  if (username) {
      localStorage.setItem("username", username);
      checkAuth();
  }
}

// Функция для логаута
function logout() {
  localStorage.removeItem("username");
  checkAuth();
}

// Проверяем статус при загрузке страницы
window.onload = checkAuth;

