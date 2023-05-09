export type Indexed<T = unknown> = {
    [key in string]: T;
}

export function abbreviate(text: string | undefined): string {
    if (text?.length) {
        return (text.length > 15) ? text.substring(0,13) + ' ...' : text;
    }
    else {
        return 'field_empty';
    }
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

export const REGEXPS: Record<string, {regexp: RegExp, warning: string}> = {
    first_name: {regexp:/^[A-ZА-Я]{1}[a-zа-я-]{0,30}$/g,
        warning: "имя - латиница или кириллица, первая буква - заглавная"},
    second_name: {regexp:/^[A-ZА-Я]{1}[a-zа-я-]{0,30}$/g,
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

export function handleValidation(event: Event): Record<string, unknown> | false {
    const form = (event.target as HTMLFormElement).form;

    if (form) {
        if (isFormValid(form)) {
            return Object.fromEntries(new FormData(form))
        } else {
            return false
        }
    }
    else {
        return false;
    }
}

function isFormValid(formData: Record<string, HTMLInputElement>):boolean{
    let isValid = true;

    Object.values(formData).forEach((input)=>{
        if (Object.keys(REGEXPS).includes(input.name)) {
            REGEXPS[input.name].regexp.lastIndex = 0;
            if (REGEXPS[input.name].regexp.test(input.value)){
                removeWarning(input);
            }
            else {
                showWarning(input);
                isValid = false;
            }
        }
    })
    return isValid
}

function showWarning(input: HTMLInputElement): void {
    input.classList.add("warning");
    if (input.nextElementSibling) {
        const warn = input.nextElementSibling;
        warn.textContent = REGEXPS[input.name].warning;
        warn.classList.add('show');
    }
}

function removeWarning(input: HTMLInputElement): void {
    input.classList.remove("warning");
    if (input.nextElementSibling) {
        input.nextElementSibling.classList.remove('show')
    }
}
