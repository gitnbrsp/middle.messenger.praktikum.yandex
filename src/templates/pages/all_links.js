import Handlebars from "handlebars";

const html =
    `<main class="container">
            <nav>
                <ul>
                    <li>{{> link newContext text="Вход" id="" page="login"}}</li>
                    <li>{{> link newContext text="Создать аккаунт" id="" page="register"}}</li>
                    <li>{{> link newContext text="Чат" id="" page="chat"}}</li>
                    <li>{{> link newContext text="Профиль" id="" page="profile"}}</li>
                    <li>{{> link newContext text="Смена пароля" id="" page="password"}}</li>

                    <li><a class="text-link" href="../../404.html" target="_parent">404</a></li>
                    <li><a class="text-link" href="../../500.html" target="_parent">500</a></li>
                </ul>
            </nav>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: {}
};
