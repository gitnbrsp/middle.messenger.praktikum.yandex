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
                <input class="no-display" type="file">
            </label>
            
            <input name="first_name" class="form__input" type="text" placeholder="{{abbreviate first_name}}">
            <input name="second_name" class="form__input" type="text" placeholder="{{abbreviate second_name}}">
            <input name="login" class="form__input" type="text" placeholder="{{abbreviate login}}">
            <input name="email" class="form__input" type="text" placeholder="{{abbreviate email}}">
            <input name="phone" class="form__input" type="text" placeholder="{{abbreviate phone}}">
            <button name="signButton" class="form__button" disabled>Сохранить изменения</button>
            <a class="text-link" href="#" onclick="window.routing.openPage('password')">изменить пароль</a>
            <a class="text-link" href="#" onclick="window.routing.openPage('chat')">назад</a>
        </form>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: templateData,
    fn: {}
};