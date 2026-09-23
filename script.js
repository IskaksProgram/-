// =========================
// ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
// =========================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo(0, 0);
}


// =========================
// РЕГИСТРАЦИЯ
// =========================

document
    .getElementById("registerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const user = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("registerEmail").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("registerPassword").value,
            birthDate: document.getElementById("birthDate").value,
            gender: document.getElementById("gender").value,
            specialty: document.getElementById("specialty").value,
            course: document.getElementById("course").value,
            comment: document.getElementById("comment").value
        };

        let users =
            JSON.parse(localStorage.getItem("studentUsers")) || [];

        // Проверяем Email
        const exists = users.some(
            item => item.email === user.email
        );

        if (exists) {
            alert("Этот Email уже зарегистрирован.");
            return;
        }

        // Сохраняем пользователя
        users.push(user);

        localStorage.setItem(
            "studentUsers",
            JSON.stringify(users)
        );

        alert("Регистрация успешно завершена!");

        // Очищаем форму
        document.getElementById("registerForm").reset();

        // Переходим на страницу входа
        showPage("loginPage");
    });


// =========================
// ВХОД
// =========================

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const users =
            JSON.parse(localStorage.getItem("studentUsers")) || [];

        const user = users.find(item =>
            item.email === email &&
            item.password === password
        );

        if (!user) {
            alert("Неверный Email или пароль.");
            return;
        }

        // Запоминаем вошедшего пользователя
        localStorage.setItem(
            "currentStudent",
            JSON.stringify(user)
        );

        alert(
            "Добро пожаловать, " +
            user.firstName + "!"
        );

        document.getElementById("loginForm").reset();

        /*
          Здесь позже можно сделать переход
          на страницу студента:
          showPage("studentHomePage");
        */
    });
