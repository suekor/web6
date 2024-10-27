document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0; // Текущий шаг
    const steps = document.querySelectorAll(".step"); // Все шаги формы
    const nextBtn = document.getElementById("nextBtn"); // Кнопка "Next"
    const prevBtn = document.getElementById("prevBtn"); // Кнопка "Back"
    const submitBtn = document.getElementById("submitBtn"); // Кнопка "Submit"
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? "block" : "none"; // Показать текущий шаг
        });
        prevBtn.style.display = stepIndex === 0 ? "none" : "inline-block"; // Скрыть кнопку "Back" на первом шаге
        nextBtn.style.display = stepIndex === steps.length - 1 ? "none" : "inline-block"; // Скрыть кнопку "Next" на последнем шаге
        submitBtn.style.display = stepIndex === steps.length - 1 ? "inline-block" : "none"; // Показать кнопку "Submit" на последнем шаге
    }
    nextBtn.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep); // Показать следующий шаг
        }
    });
    prevBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep); // Показать предыдущий шаг
        }
    });
    document.getElementById("multiStepForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем отправку формы
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
        };
        alert(JSON.stringify(formData, null, 2)); // Показываем данные формы в alert
    });
    showStep(currentStep);
});
