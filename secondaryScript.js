// Show the popup form when the "Contact Us" button is clicked
document.getElementById("popup-button").addEventListener("click", function() {
  document.getElementById("popup-form").style.display = "block";
});

// Hide the popup form when the "Close" button is clicked
document.getElementById("close-button").addEventListener("click", function() {
  document.getElementById("popup-form").style.display = "none";
});

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Clear previous error messages
  document.getElementById("error-message").textContent = '';

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();


  let errors = []; // Array to hold error messages

  // Validate inputs
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

  // Display errors or submit the form
  if (errors.length > 0) {
      document.getElementById("error-message").textContent = errors.join(" ");
  } else {
      alert("Form submitted successfully!");
      document.getElementById("popup-form").style.display = "none"; // Hide the form after submission
      // Here you can also add code to actually submit the form data to the server if needed
  }
});

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", function() {
  // Clear all input fields and the error message
  document.querySelectorAll('#contact-form input, #contact-form select').forEach(input => {
      input.value = ''; // Reset the value of each input
  });
  document.getElementById("error-message").textContent = ''; // Clear any error messages
});
function displayGreeting() {
    const greetingElement = document.getElementById('greeting');
    const modal = document.getElementById('greeting-modal'); 
    const closeModalButton = document.getElementById('close-modal'); 
    const currentHour = new Date().getHours(); 
    
    let greetingMessage; 
  

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

    greetingElement.textContent = greetingMessage;
    

    modal.style.display = 'block';
  

    closeModalButton.onclick = function() {
      modal.style.display = 'none';
    };
  

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  window.onload = displayGreeting;

  document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchButton = document.getElementById('theme-switch');
  
    // Проверка текущей темы в localStorage и установка начальной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
      document.body.classList.add('night-theme');
      themeSwitchButton.textContent = 'Switch to Day Theme';
    } else {
      document.body.classList.remove('night-theme');
      themeSwitchButton.textContent = 'Switch to Night Theme';
    }
  
    // Обработчик для переключения темы
    themeSwitchButton.addEventListener('click', () => {
      document.body.classList.toggle('night-theme');
      if (document.body.classList.contains('night-theme')) {
        localStorage.setItem('theme', 'night');
        themeSwitchButton.textContent = 'Switch to Day Theme';
      } else {
        localStorage.setItem('theme', 'day');
        themeSwitchButton.textContent = 'Switch to Night Theme';
      }
    });
  });
  document.getElementById('getUserBtn').addEventListener('click', function() {
    // Запрашиваем случайного пользователя через API
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            // Извлекаем данные пользователя
            const user = data.results[0];
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            // Заполняем карточку пользователя
            userCard.innerHTML = `
                <img src="${user.picture.large}" alt="User Image">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>Gender: ${user.gender}</p>
                <p>Age: ${user.dob.age}</p>
                <p>Location: ${user.location.city}, ${user.location.country}</p>
                <p>Email: ${user.email}</p>
            `;
            
            // Добавляем карточку на страницу
            document.getElementById('user-container').innerHTML = ''; // Очищаем предыдущие результаты
            document.getElementById('user-container').appendChild(userCard);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Error! Try again later.');
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

