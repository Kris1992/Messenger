function getStatusError(jqXHR) {
    if(jqXHR.status === 0) {
        return {
            "errorMessage":"Cannot connect. Verify Network."
        }
    } else if(jqXHR.status == 404) {
        return {
            "errorMessage":"Requested not found."
        }
    } else if(jqXHR.status == 500) {
        return {
            "errorMessage":"Internal Server Error"
        }
    } else if(jqXHR.status > 400) {
        return {
            "errorMessage":"Error. Contact with admin."
        }
    }

    return null;
}

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
            let statusError = [];
            statusError = getStatusError(jqXHR);
            if(statusError != null) {
                reject(statusError);
            } else {
                const errorData = JSON.parse(jqXHR.responseText);
                reject(errorData);
            }
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
            let statusError = [];
            statusError = getStatusError(jqXHR);
            if(statusError != null) {
                reject(statusError);
            } else {
                const errorData = JSON.parse(jqXHR.responseText);
                reject(errorData);
            }
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
            let statusError = [];
            statusError = getStatusError(jqXHR);
            if(statusError != null) {
                reject(statusError);
            } else {
                const errorData = JSON.parse(jqXHR.responseText);
                reject(errorData);
            }
        });
    });
}