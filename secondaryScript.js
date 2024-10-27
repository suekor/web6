document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0; 
    const steps = document.querySelectorAll(".step"); 
    const nextBtn = document.getElementById("nextBtn"); 
    const prevBtn = document.getElementById("prevBtn"); 
    const submitBtn = document.getElementById("submitBtn"); 
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? "block" : "none"; 
        });
        prevBtn.style.display = stepIndex === 0 ? "none" : "inline-block"; 
        nextBtn.style.display = stepIndex === steps.length - 1 ? "none" : "inline-block"; 
        submitBtn.style.display = stepIndex === steps.length - 1 ? "inline-block" : "none"; 
    }
    nextBtn.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep); 
        }
    });
    prevBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep); 
        }
    });
    document.getElementById("multiStepForm").addEventListener("submit", function (event) {
        event.preventDefault(); 
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
        };
        alert(JSON.stringify(formData, null, 2)); 
    });
    showStep(currentStep);
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