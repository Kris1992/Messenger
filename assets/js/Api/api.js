export function loginAction(userData) {
   return new Promise(function(resolve, reject){
        $.ajax({
            url: '/login',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(userData)
        }).then((url) => {
            resolve(url);
        }).catch((jqXHR) => {
            const errorData = JSON.parse(jqXHR.responseText);
            reject(errorData);
        });
    });
}

export function registerAction(userData) {
   return new Promise(function(resolve, reject){
        $.ajax({
            url: '/api/register',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(userData)
        }).then((data) => {
            resolve(data);
        }).catch((jqXHR) => {
            const errorData = JSON.parse(jqXHR.responseText);
            reject(errorData);
        });
    });
}

export function isUserUnique(fieldName, fieldValue) {
    const dataArray = {
        fieldName: fieldName,
        fieldValue: fieldValue
    }

    return new Promise(function(resolve, reject){
        $.ajax({
            url: '/api/is_user_unique',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(dataArray)
        }).then((response) => {
            resolve(response);
        }).catch((jqXHR) => {
            const errorData = JSON.parse(jqXHR.responseText);
            reject(errorData);
        });
    });
}