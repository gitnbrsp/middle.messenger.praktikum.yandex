import Handlebars from "handlebars";

const html =
    `<main class="container">
        <form id="login_form" class="form">
            <div id="warning" class="text warning">неверный пароль или пароли не совпадают</div>
            <input name="oldPassword" class="form__input" type="password" placeholder="Старый пароль">
            <input name="newPassword" class="form__input" type="password" placeholder="Новый пароль">
            <input name="confirmPassword" class="form__input" type="password" placeholder="Повторите пароль">
            <button name="signButton" class="form__button" disabled>Сохранить</button>
            <nav>
                <ul>
                    <li><a class="text-link" href="#" onclick="window.routing.openPage('profile')">назад</a></li>
                    <li>{{> link newContext text="на главную" id="" page="all_links"}}</li>
                </ul>
            </nav>
        </form>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: {}
};
