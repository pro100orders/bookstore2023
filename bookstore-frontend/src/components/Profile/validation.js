export const emailValidation = {
    required: "Пошта не може бути пустою",
    validate: (value) => {

        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!re.test(String(value).toLowerCase())) {
            return "Пошта не відповідає формату";
        }

        return true;
    }
}

export const passwordValidation = {
    validate: (value) => {
        if (value && (value.length > 1 && (value.length < 8 || value.length > 64))) {
            return "Пароль повинен мати від 8 до 64 символів";
        }

        return true;
    }
}