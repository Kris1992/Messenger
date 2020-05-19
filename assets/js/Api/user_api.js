import { getStatusError } from '../Api/error_api_helper';

/*
This function returns login and user_role from logged in user
*/
export function getUserBasicData(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: '/api/get_logged_user',
            method: 'GET',
            contentType: "application/json"
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