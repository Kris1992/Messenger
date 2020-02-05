import React from 'react';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage'; 
import RegisterPage from './RegisterPage'; 


export default function HomepageContainer(props) {

    const { 
        isLoginPage,
        onLoginAction,
        loginServerValidationErrorMessage,
        isRegisterPage,
        onRegisterAction,
        onFieldValidation,
        registerServerValidationMessages,
        onLoginClick,
        onRegisterClick,
        successMessage
    } = props;

    if(isLoginPage) {
        return (
            <LoginPage
            onLoginAction={onLoginAction}
            loginServerValidationErrorMessage={loginServerValidationErrorMessage}
            />
        );
    } else if(isRegisterPage) {
        return (
            <RegisterPage
            onRegisterAction={onRegisterAction}
            onFieldValidation={onFieldValidation}
            registerServerValidationMessages={registerServerValidationMessages}
            successMessage={successMessage}
            />
        );
    } else {
        return (
        <React.Fragment>
            <h1 className="brand"><span className="fas fa-comments">Messenger</span></h1>
            <p className="lead red">Chat with Your friend's by new Messenger </p>
            <div className="row">
                <div className="col-md-6 my-2">
                    <a href="#" className="btn btn-block btn-white"  onClick={() =>  onLoginClick()}>Login</a>
                </div>
                <div className="col-md-6 my-2">
                    <a href="#" className="btn btn-block btn-black"  onClick={() =>  onRegisterClick()}>Register</a>
                </div>
            </div>
        </React.Fragment>   
    );
    }

    
}

HomepageContainer.propTypes = {
    isLoginPage: PropTypes.bool,
    onLoginAction: PropTypes.func.isRequired,
    loginServerValidationErrorMessage: PropTypes.string.isRequired,
    isRegisterPage: PropTypes.bool,
    onRegisterAction: PropTypes.func.isRequired,
    onFieldValidation: PropTypes.func.isRequired,
    registerServerValidationMessages: PropTypes.object.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
    successMessage: PropTypes.string.isRequired,
};














