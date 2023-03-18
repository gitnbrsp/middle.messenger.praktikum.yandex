import Handlebars from "handlebars";
import css from "./styles/login.css";

// todo: basic authorization
const html =
    `<main class="container">
        <form id="login_form" class="form">
            {{> warning newContext text="неверный логин или пароль"}}
            {{> input newContext placeholder="Логин" name="login" type="text"}}
            {{> input newContext placeholder="Пароль" name="password" type="password"}}
            {{> button newContext text="Войти" name="signButton" page="chat"}}
            <nav>
                <ul>
                    <li>{{> link newContext text="Создать аккаунт" id="" page="register"}}</li>
                    <li>{{> link newContext text="на главную" id="" page="all_links"}}</li>
                </ul>
            </nav>
        </form>
            
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: {}
};
