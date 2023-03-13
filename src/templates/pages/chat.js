import Handlebars from "handlebars";
import css from "./styles/chat.css";

//todo: заменить на fetch /getUsers
const templateData = {
    accountData: {
        accountName: 'ivan',
        accountMail: 'ivanivanov@yandex.ru',
    },
    users: [
        {
            "name": "Micah Bates",
            "phone": "1-442-142-2735",
            "email": "lacus.quisque@hotmail.org",
            "country": "Sweden",
            "numberrange": 2,
            "alphanumeric": "YNC35VXN5RL",
            "list": 19,
            "text": "cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna."
        },
        {
            "name": "Wyatt Blair",
            "phone": "(378) 554-2985",
            "email": "est@google.net",
            "country": "Philippines",
            "numberrange": 8,
            "alphanumeric": "IBC85MQT4RW",
            "list": 17,
            "text": "non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue"
        },
        {
            "name": "Lamar Collier",
            "phone": "1-373-753-9852",
            "email": "et.malesuada@aol.net",
            "country": "Ukraine",
            "numberrange": 9,
            "alphanumeric": "MOQ32TTE5EV",
            "list": 1,
            "text": "neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum"
        },
        {
            "name": "Dante Ramos",
            "phone": "1-204-853-4943",
            "email": "amet.luctus@aol.org",
            "country": "United States",
            "numberrange": 9,
            "alphanumeric": "LJU93EGD8QA",
            "list": 7,
            "text": "ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse"
        },
        {
            "name": "Gavin Howell",
            "phone": "(544) 882-2661",
            "email": "imperdiet.erat.nonummy@yahoo.couk",
            "country": "Brazil",
            "numberrange": 4,
            "alphanumeric": "HDB82XWG1ML",
            "list": 3,
            "text": "vel, vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut,"
        },
        {
            "name": "Holmes Russell",
            "phone": "(585) 456-7628",
            "email": "natoque@aol.couk",
            "country": "Germany",
            "numberrange": 5,
            "alphanumeric": "JUC22QKX3FQ",
            "list": 13,
            "text": "nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel,"
        },
        {
            "name": "Ainsley Austin",
            "phone": "1-361-826-6656",
            "email": "vel.mauris.integer@yahoo.ca",
            "country": "New Zealand",
            "numberrange": 3,
            "alphanumeric": "KCD66NCD4IV",
            "list": 3,
            "text": "ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus"
        },
        {
            "name": "Dorothy Flores",
            "phone": "(943) 240-5467",
            "email": "quam.quis@aol.edu",
            "country": "Indonesia",
            "numberrange": 1,
            "alphanumeric": "CSN76VBI1DY",
            "list": 5,
            "text": "malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer"
        },
        {
            "name": "Arsenio Kane",
            "phone": "1-565-345-1354",
            "email": "scelerisque.mollis@yahoo.com",
            "country": "Peru",
            "numberrange": 7,
            "alphanumeric": "HIF34VKL7OY",
            "list": 19,
            "text": "sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit"
        },
        {
            "name": "Roanna Walker",
            "phone": "(704) 638-8339",
            "email": "at.pede@icloud.com",
            "country": "Ireland",
            "numberrange": 3,
            "alphanumeric": "VTV80YHJ1BG",
            "list": 5,
            "text": "enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse"
        },
        {
            "name": "Yoko Robbins",
            "phone": "1-528-850-1576",
            "email": "diam.at@google.couk",
            "country": "Vietnam",
            "numberrange": 10,
            "alphanumeric": "JTI18SPG2VY",
            "list": 5,
            "text": "velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse"
        },
        {
            "name": "Ahmed Pugh",
            "phone": "1-150-933-3448",
            "email": "a@google.com",
            "country": "New Zealand",
            "numberrange": 1,
            "alphanumeric": "KMI35VCE6KK",
            "list": 7,
            "text": "tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh."
        }
    ]
};

const html =
`    <main>
        <div id="column1">
            <section id="users_lsit">
                    <div>
                        {{> accountCard accountData}}
                        <input id="search"  class="form__search" placeholder="🔍 поиск ..." type="text">
                    </div>
                    <ul>
                        {{#users}}
                            {{> userCard this}}
                        {{/users}}
                    </ul>
            </section>
        </div>
        <div id="column2">
            <section id="user_info" class="form"></section>
            <section id="messages">
                <div class="form"><h2>Выберите чат</h2></div>
                {{> link newContext text="на главную" id="" page="all_links"}}
            </section>
            <form id="message_form" class="form">
                <label class="material-symbols-outlined">attach_file
                <input id="attached_file" type="file" class="no-display"></label>
                <textarea id="message_text" class="form__input" autofocus autocomplete="on"></textarea>
                <button id="send_message" class="material-symbols-outlined" disabled>mail</button>
            </form>
        </div>
    </main>`;


export const template = {
    template: Handlebars.compile(html),
    data: templateData,
};
