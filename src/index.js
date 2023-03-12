import * as css from './global.css';
import * as helpers from './templates/helpers';
import * as partials from './templates/partials';
import * as templates from './templates/templates';

function openPage(pageName) {
    //todo: сделать динамический импорт через import()
    let module = templates[pageName];
    document.body.innerHTML = module.template(module.data);
}

return window.routing = {
    openPage
}



