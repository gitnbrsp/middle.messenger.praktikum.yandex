export type Indexed<T = any> = {
    [key in string]: T;
}

function setValue(object: Indexed, path: string, value: unknown): void {
    const p = path.split('.');
    let i = 0;

    for (i; i < p.length - 1; i++)
        if (object[p[i]]){
            object = object[p[i]] as Indexed;
        }
        else{
            object[p[i]] = {};
            object = object[p[i]] as Indexed;
        }

    object[p[i]] = value;
}

export function set(object: Indexed | number | string, path: string, value: unknown): unknown {
    if (typeof object !== 'object') {
        setValue({}, path, value);
        return object
    }

    setValue(object, path, value);
    return object;
}

//todo: key-value validate function - warning message
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
    oldPassword: {regexp:/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/g,
        warning: "пароль 8-40 символов, заглавные буквы и цифры"},
    newPassword: {regexp:/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/g,
        warning: "пароль 8-40 символов, заглавные буквы и цифры"},
    confirmPassword: {regexp:/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/g,
        warning: "пароль 8-40 символов, заглавные буквы и цифры"},
    phone: {regexp:/^[+1-9]{1}[0-9]{9,14}$/g,
        warning: "телефон от 10 до 15 символов, состоит из цифр"},
    // message: {regexp:/(.|\s)*\S(.|\s)*/g,
    //     warning: "сообщение не должно быть пустым"}
};

export function handleValidation(event:Event): Record<string, unknown> | false {

    const form: HTMLFormElement = event.target.form;

    if (form) {
        const formObj = Object.fromEntries(new FormData(form));
        return validateForm(form) ? formObj : false
    }
    else {
        return false;
    }
}

export function validateForm(obj: Record<string, HTMLElement>):boolean{

    let isValid = true;

    Object.entries(obj).forEach(([_, val])=>{

        const name = val.name;

        if (Object.keys(REGEXP).includes(name)) {
            REGEXP[name].regexp.lastIndex = 0;
            if (REGEXP[name].regexp.test(val.value)){
                val.classList.remove("warning");
                if (val.nextElementSibling) {
                    val.nextElementSibling.classList.remove('show')
                }
            }
            else {
                if (val.nextElementSibling) {
                    const warn = val.nextElementSibling;
                    warn.textContent = REGEXP[name].warning;
                    warn.classList.add('show');
                }
                val.classList.add("warning");
                isValid = false;
            }
        }
    })

    return isValid
}
