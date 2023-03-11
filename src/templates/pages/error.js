import Handlebars from "handlebars";

const templateData = {
    statusCode: 500,
    errorMsg: 'ошибка обработки запроса'
}

const html =
    `<main class="container">
        <section id="error" class="form">
            <h2>{{statusCode}}</h2>
            <h2>{{errorMsg}}</h2>
            {{> chatLink}}
        </section>
    </main>`;

export const template = {
    template: Handlebars.compile(html),
    data: templateData,
};