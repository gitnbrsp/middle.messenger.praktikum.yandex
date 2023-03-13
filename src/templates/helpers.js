import Handlebars from "handlebars";

Handlebars.registerHelper('abbreviate', (text)=> {
    text = Handlebars.escapeExpression(text);
    return new Handlebars.SafeString(
        (text.length > 15) ? text.substring(0,13) + ' ...' : text
    )
});

Handlebars.registerHelper('randomColor', ()=> {
    let colors = ['#111111', '#999999', '#777777', '#333333', '#5c6b5d', '#000500', '#173b2a'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return new Handlebars.SafeString(
        randomColor
    );
});

