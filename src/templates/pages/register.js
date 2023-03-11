import Handlebars from "handlebars";
import css from "./styles/register.css";

const html =
    `<main class="container">
        <form id="register_form" class="form">
          <div id="warning" class="text warning">неверный логин или пароль</div>
          <input id="first_name" class="form__input" type="text" placeholder="имя">
          <input id="second_name" class="form__input" type="text" placeholder="фамилия">
          <input id="login" class="form__input" type="text" placeholder="логин">
          <input id="email" class="form__input" type="text" placeholder="почта">
          <input id="phone" class="form__input" type="text" placeholder="телефон">
          <input id="password" class="form__input" type="password" placeholder="пароль">
          <input id="password_confirm" class="form__input" type="password" placeholder="подтвердите пароль">
          <button id="signButton" class="form__button" disabled>Создать аккаунт</button>
          <a class="text-link" href="#" onclick="window.routing.openPage('login')">Назад</a>
        </form>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: {},
    fn: {}
};