
export function abbreviate(text:string): string {
    return (text.length > 15) ? text.substring(0,13) + ' ...' : text
}

//todo: key-value regexp-warning message
export const REGEXP:Record<string, RegExp> = {
    first_name: /^[A-ZА-Я]{1}[a-zа-я\-]{0,30}$/,
    second_name: /^[A-ZА-Я]{1}[a-zа-я\-]{0,30}$/,
    login: /^[a-zA-Z1-9\-_]{3,20}$/,
    email: /^\S+@\S+\.\S+$/,
    password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/,
    phone: /^[+1-9]{1}[1-9]{10,15}$/
};

export function handleValidation(event:Event):void{
    const form:HTMLFormElement = event.target!.parentNode;
    const formObj = Object.fromEntries(new FormData(form));
    console.log(validateForm(formObj));
}

export function validateForm(obj: {[p: string]: File | string}):Record<string, [boolean, string]>{
    const validateResults = {};

    Object.entries(obj).forEach(([key, val])=>{
        val = <string>val;

        if (REGEXP[key].test(val)){
            validateResults[key] = [true, val];
        }
        else{
            validateResults[key] = [false, val];
        }
    })

    return validateResults
}
