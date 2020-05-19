import React, { Component } from "react";
import HomepageContainer from './HomepageContainer';
import PropTypes from 'prop-types';
import { loginAction, isUserUnique, registerAction} from '../Api/security_api';
import { isEmpty, isEmail, isStrongPassword } from '../Helpers/validation_helper';


export default class HomepageApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoginPage: false,
            loginServerValidationErrorMessage: '',
            isRegisterPage: false,
            registerServerValidationMessages: {
                email: '',
                login: '',
                plainPassword: '',
                agreeTerms: '',
                recaptcha: '',
                statusError: '',
            },
            successMessage: '',

        };
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);

        this.handleLoginAction = this.handleLoginAction.bind(this);
        this.handleRegisterAction = this.handleRegisterAction.bind(this);
        this.handleFieldValidation = this.handleFieldValidation.bind(this);
    }

    //Event Handlers:

    handleLoginButtonClick() {
        this.setState({
            isRegisterPage: false,
            isLoginPage: true
        });
    }

    handleRegisterButtonClick() {
        this.setState({
            isRegisterPage: true,
            isLoginPage:false
        });
    }

    handleLoginAction(email, plainPassword) {
        this.clearServerValidationErrors();
        const userData = {
            email: email,
            plainPassword: plainPassword
        };

        loginAction(userData).then(result => {
            this.redirectToRoute(result.url);
        }).catch(error => {
            const errorMessage = error.errorMessage;
            this.setState({
                loginServerValidationErrorMessage: errorMessage
            });
        });
    }

    handleFieldValidation(fieldName, fieldValue) {
        //prevalidation first
        const isPreValid = this.isPreValid(fieldName, fieldValue);


        //If prevalidation fail dont try check db
        if(isPreValid && fieldName != 'plainPassword') {
            isUserUnique(fieldName, fieldValue).then(result => {
                if(result['is_unique']) {
                    this.updateRegisterValidationMessages(fieldName, 'ok');
                } else {
                    this.updateRegisterValidationMessages(fieldName, 'Validation Error');
                }
            }).catch(error => {
                const errorMessage = error.errorMessage;
                this.updateRegisterValidationMessages(fieldName, errorMessage);
            });
        }
        
    }

    handleRegisterAction(userData) {
        this.clearServerValidationErrors('register');
        registerAction(userData).then(result => {
            this.setSuccessMessage(result['message']);
        }).catch(errors => {
            if(errors.errorMessage) {
                this.updateRegisterValidationMessages('statusError', errors.errorMessage);
            } else {
                this.bindErrorsToForms(errors);
            }
            
        });
    }

    //Helpers methods
    isPreValid(fieldName, fieldValue) {
        var isPreValid = true;

        if(isEmpty(fieldValue)) { 
            this.updateRegisterValidationMessages(fieldName, 'Please fill out this field.');
            isPreValid = false;
        }

        if(fieldName === 'email') {
            if(!isEmail(fieldValue)) {
                this.updateRegisterValidationMessages(fieldName, 'This is probably not proper e-mail.');
                isPreValid = false;   
            }
        }
        if(fieldName === 'plainPassword') {
            if(!isStrongPassword(fieldValue)) {
                this.updateRegisterValidationMessages(fieldName, 'This password is not strong enough');
                isPreValid = false;   
            } else {
                this.updateRegisterValidationMessages(fieldName, 'ok');
            }
        } 

        return isPreValid;
    }

    updateRegisterValidationMessages(stateField, newValue) {
        var validationMessages = this.state.registerServerValidationMessages;
        validationMessages[`${stateField}`] = newValue;
        this.setState({registerServerValidationMessages: validationMessages});
    }

    redirectToRoute(url) {
        window.location = url;
    }

    clearServerValidationErrors($formType = 'login') {
        if($formType === 'login') {
            this.setState({
                loginServerValidationErrorMessage: ''
            });
        } else {
        const newState = Object.fromEntries(Object.entries(this.state.registerServerValidationMessages).map(([key, value]) => [key, '']));
            this.setState({
                registerServerValidationMessages: newState
            });
        }

    }

    bindErrorsToForms(errors) {
        errors.map((error) => {
            this.updateRegisterValidationMessages(error.fieldName, error.message);
        });
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });
    }


    render() {
        return (
            <HomepageContainer
                {...this.props}
                {...this.state}
                onLoginClick={this.handleLoginButtonClick}
                onLoginAction={this.handleLoginAction}
                onRegisterClick={this.handleRegisterButtonClick}
                onFieldValidation={this.handleFieldValidation}
                onRegisterAction={this.handleRegisterAction}
            />
            );  
    }
}

HomepageApp.propTypes = {
    googlePublic: PropTypes.string.isRequired, 
}