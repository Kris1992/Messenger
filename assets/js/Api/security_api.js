import { getStatusError } from '../Api/error_api_helper';

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