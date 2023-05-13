const {JSDOM} = require('jsdom');
const sinon = require("sinon");

const {window} = new JSDOM('<div id="app"></div>', {url: 'http://localhost:3000/'});

//randomUUID is not implemented in JSDOM
window.crypto.randomUUID = ()=>{return Math.floor(Math.random() * 1000).toString()};

global.window = window;
global.document = window.document;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

window.history.back = window.history.forward = () => {
    window.onpopstate({currentTarget: window});
}

function doNothing() {
    return null;
}

require.extensions['.css'] = doNothing;
