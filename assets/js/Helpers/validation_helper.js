export function isEmpty(fieldValue) {
    if(fieldValue === null ) {
        return true;
    }
    return !fieldValue.toString().trim().length;
}

export function isEmail(fieldValue) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(fieldValue);
}

export function isStrongPassword(fieldValue) {
    if(fieldValue.length >= 5) {
        const hasUpperCase = /[A-Z]/.test(fieldValue);
        const hasLowerCase = /[a-z]/.test(fieldValue);
        const hasNumbers = /[0-9]/.test(fieldValue);
        
        if((hasUpperCase+hasLowerCase+hasNumbers) === 3) {
            return true;
        }
        return false;
    }
    return false;
}

