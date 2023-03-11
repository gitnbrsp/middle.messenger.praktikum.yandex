import Handlebars from "handlebars";
import css from "./styles/profile.css";

const templateData = {
    login: 'ivanivanov',
    first_name: 'ivan',
    second_name: 'ivanov',
    email: 'ivanivanov@yandex.ru',
    phone: '+7 (918) 483-8423',
}

const html =
    `<main class="container">
        <form id="profile_form" class="form">
            <div id="warning" class="text warning">невозможно сохранить изменения</div>
            
            <label>
                <span class="material-symbols-outlined">photo_camera</span>
                <input style="display: none" type="file">
            </label>
            
            <input id="first_name" class="form__input" type="text" placeholder="{{abbreviate first_name}}">
            <input id="second_name" class="form__input" type="text" placeholder="{{abbreviate second_name}}">
            <input id="login" class="form__input" type="text" placeholder="{{abbreviate login}}">
            <input id="email" class="form__input" type="text" placeholder="{{abbreviate email}}">
            <input id="phone" class="form__input" type="text" placeholder="{{abbreviate phone}}">
            <button id="signButton" class="form__button" disabled>Сохранить изменения</button>
            <a class="text-link" href="#" onclick="window.routing.openPage('password')">изменить пароль</a>
            <a class="text-link" href="#" onclick="window.routing.openPage('chat')">назад</a>
        </form>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: templateData,
    fn: {}
};