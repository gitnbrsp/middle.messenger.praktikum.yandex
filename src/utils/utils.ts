export function abbreviate(text:string): string {
    return (text.length > 15) ? text.substring(0,13) + ' ...' : text
}

//todo: key-value regexp-warning message
export const REGEXP:Record<string, Record<RegExp, string>> = {
    first_name: {regexp:/^[A-ZА-Я]{1}[a-zа-я\-]{0,30}$/g,
        warning: "имя - латиница или кириллица, первая буква - заглавная"},
    second_name: {regexp:/^[A-ZА-Я]{1}[a-zа-я\-]{0,30}$/g,
        warning: "фамилия - латиница или кириллица, первая буква - заглавная"},
    login: {regexp:/^[a-zA-Z1-9\-_]{3,20}$/g,
        warning: "логин от 3 до 20 символов, латиница, без спецсимволов"},
    display_name: {regexp:/(.|\s)*\S(.|\s)*/g,
        warning: "отображаемое имя не должно быть пустым"},
    email: {regexp:/^\S+@\S+\.\S+$/,
        warning: "email - латиница, обязательно должна быть @"},
    password: {regexp:/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/g,
        warning: "пароль 8-40 символов, заглавные буквы и цифры"},
    newPassword: {regexp:/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/g,
        warning: "пароль 8-40 символов, заглавные буквы и цифры"},
    confirmPassword: {regexp:/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/g,
        warning: "пароль 8-40 символов, заглавные буквы и цифры"},
    phone: {regexp:/^[+1-9]{1}[0-9]{9,14}$/g,
        warning: "телефон от 10 до 15 символов, состоит из цифр"},
    message: {regexp:/(.|\s)*\S(.|\s)*/g,
        warning: "сообщение не должно быть пустым"}
};

export function handleValidation(event:Event):void{
    const form:HTMLFormElement = event.target.parentNode;
    const formObj = Object.fromEntries(new FormData(form));
    validateForm(form);
    console.log(formObj);
}

export function validateForm(obj: Record<string, HTMLElement>):void{

    document.querySelectorAll('.warning-message').forEach(e => e.remove());

    Object.entries(obj).forEach(([_, val])=>{
        const name = val.name;
        if (Object.keys(REGEXP).includes(name)) {
            REGEXP[name].regexp.lastIndex = 0;
            if (REGEXP[name].regexp.test(val.value)){
                val.classList.remove("warning");
            }
            else {
                const warning = document.createElement("span");
                warning.classList.add('warning-message');
                warning.innerHTML = REGEXP[name].warning;
                val.after(warning);
                val.classList.add("warning");
            }
        }
    })
}
