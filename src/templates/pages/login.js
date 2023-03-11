import Handlebars from "handlebars";
import css from "./styles/login.css";

function ValidateAccount (){
    let login = document.querySelector('login').innerText;
    let password = document.querySelector('password').innerText;

    if (login === password === 'test'){
        window.routing.openPage('chat')
    }
    else{
        document.querySelector('#warning').setAttribute('visible', 'true')
    }
}

const html =
    `<main class="container">
        <form id="login_form" class="form">
          <div id="warning" class="text warning">неверный логин или пароль</div>
          <input id="login" class="form__input" type="text" placeholder="Логин">
          <input id="password" class="form__input" type="password" placeholder="Пароль">
          <button id="signButton" class="form__button" onclick="window.routing.openPage('chat')">Войти</button>
          <a class="text-link" href="#" onclick="window.routing.openPage('register')">Создать аккаунт</a>  
        </form>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: {},
    fn: {
        ValidateAccount
    }
};