import * as css from './global.css';
import * as helpers from './templates/helpers';
import * as partials from './templates/partials';
import * as templates from './templates/templates';

function openPage(pageName) {
    let module = templates[pageName];
    document.body.innerHTML = module.template(module.data);
}

try {
    return window.routing = {
        openPage
    }
}
catch (e) {
    console.error(e);
    openPage('error');
}



