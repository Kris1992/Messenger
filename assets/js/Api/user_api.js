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
            const errorData = JSON.parse(jqXHR.responseText);
            console.log('error');
            //reject(errorData);
        });
    });
}