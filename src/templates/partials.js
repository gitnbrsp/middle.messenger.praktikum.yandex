import Handlebars from "handlebars";

//Пока применил только на отдельные страницы для теста, дальше планирую написать общий класс
Handlebars.registerPartial('warning', `
                      <div id="warning" class="text warning">{{text}}</div>
`);

Handlebars.registerPartial('link', `
            <a class="text-link" href="#" onclick="window.routing.openPage('{{page}}')">{{text}}</a>
`);

Handlebars.registerPartial('input', `
                  <input name="{{name}}" class="form__input" type="{{type}}" placeholder="{{placeholder}}">
`);

Handlebars.registerPartial('button', `
              {{#if disabled}}
                <button name="{{name}}" class="form__button" disabled>{{text}}</button>
              {{else}}
                <button name="{{name}}" class="form__button" onclick="window.routing.openPage('{{page}}')">{{text}}</button>
              {{/if}}
`);

Handlebars.registerPartial('userCard', `
    <li class="user-card">
        <svg width="400" height="100">
            <circle cx="40" cy="50" r="30" fill="{{randomColor}}" />
            <text x="100" y="50" font-size="30" fill="black">{{name}}</text>
            <text x="100" y="75" font-size="22" fill="gray">{{abbreviate text}}</text>
            <line stroke-width="4px" x1="0" y1="100" x2="400" y2="100" stroke="black" />
        </svg>
    </li>`);

Handlebars.registerPartial('accountCard', `
    <svg width="400" height="200">
        <a class="text-link" href="#">
            <text x="10" y="125" font-size="60" onclick="window.routing.openPage('login')"  class="material-symbols-outlined">logout</text>
        </a>
        <circle cx="100" cy="100" r="30" fill="whitesmoke"/>
        <text x="150" y="100" font-size="30" fill="black">{{accountName}}</text>
        <text x="150" y="125" font-size="20" fill="gray">{{abbreviate accountMail}}</text>
        <text x="350" y="125" font-size="100" onClick="window.routing.openPage('profile')"  class="material-symbols-outlined">manage_accounts</text>
    </svg>`);

//todo: replace headers
Handlebars.registerPartial('header', `
 ...
`);
